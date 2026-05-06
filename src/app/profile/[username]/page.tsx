import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/shared/footer";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { ContentImage } from "@/components/shared/content-image";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { ProfileDetailClient } from "@/components/shared/profile-detail-client";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { buildPostUrl, getPostImages } from "@/lib/task-data";
import { buildPostMetadata, buildTaskMetadata } from "@/lib/seo";
import { fetchTaskPostBySlug, fetchTaskPosts } from "@/lib/task-data";
import { SITE_CONFIG } from "@/lib/site-config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Globe, Eye, FileText } from "lucide-react";

export const revalidate = 3;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const sanitizeRichHtml = (html: string) =>
  html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, "")
    .replace(/<object[^>]*>[\s\S]*?<\/object>/gi, "")
    .replace(/\son[a-z]+\s*=\s*(['"]).*?\1/gi, "")
    .replace(/\shref\s*=\s*(['"])javascript:.*?\1/gi, ' href="#"');

const formatRichHtml = (raw?: string | null, fallback = "Profile details will appear here once available.") => {
  const source = typeof raw === "string" ? raw.trim() : "";
  if (!source) return `<p>${escapeHtml(fallback)}</p>`;
  if (/<[a-z][\s\S]*>/i.test(source)) return sanitizeRichHtml(source);
  return source
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${escapeHtml(paragraph.replace(/\n/g, " ").trim())}</p>`)
    .join("");
};

export async function generateStaticParams() {
  const posts = await fetchTaskPosts("profile", 50);
  if (!posts.length) {
    return [{ username: "placeholder" }];
  }
  return posts.map((post) => ({ username: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  try {
    const post = await fetchTaskPostBySlug("profile", resolvedParams.username);
    return post ? await buildPostMetadata("profile", post) : await buildTaskMetadata("profile");
  } catch (error) {
    console.warn("Profile metadata lookup failed", error);
    return await buildTaskMetadata("profile");
  }
}

export default async function ProfileDetailPage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  const post = await fetchTaskPostBySlug("profile", resolvedParams.username);
  if (!post) {
    notFound();
  }
  const content = (post.content || {}) as Record<string, any>;
  const logoUrl = typeof content.logo === "string" ? content.logo : undefined;
  const brandName =
    (content.brandName as string | undefined) ||
    (content.companyName as string | undefined) ||
    (content.name as string | undefined) ||
    post.title;
  const website = content.website as string | undefined;
  const domain = website ? website.replace(/^https?:\/\//, "").replace(/\/.*$/, "") : undefined;
  const description =
    (content.description as string | undefined) ||
    post.summary ||
    "Profile details will appear here once available.";
  const descriptionHtml = formatRichHtml(description);
  const images = getPostImages(post);
  const birthday =
    (content.birthday as string | undefined) ||
    (content.dateOfBirth as string | undefined);
  const suggestedArticles = await fetchTaskPosts("article", 6);
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, "");
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Profiles",
        item: `${baseUrl}/profile`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: brandName,
        item: `${baseUrl}/profile/${post.slug}`,
      },
    ],
  };

  const joinedDate = post.createdAt || post.publishedAt;
  const formattedJoined = joinedDate
    ? new Date(joinedDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "January 1, 2025";

  // Generate consistent follower count between 2-10 based on profile ID
  const getFollowerCount = (id: string) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = ((hash << 5) - hash) + id.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash % 9) + 2; // 2-10 range
  };
  const followerCount = getFollowerCount(post.id);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fff8e8_0%,#fffdf1_100%)]">
      <NavbarShell />
      <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <SchemaJsonLd data={breadcrumbData} />

        {/* Profile Header */}
        <section className="overflow-hidden rounded-3xl border border-[#562f00]/16 bg-white shadow-[0_20px_48px_rgba(86,47,0,0.1)]">
          {/* Top area: avatar + name */}
          <div className="px-6 pt-8 pb-6 md:px-12 md:pt-12 md:pb-8">
            <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
              <div className="relative z-10 -mb-10 h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-[#fff2dc] shadow-lg sm:-mb-14 sm:h-32 sm:w-32">
                {logoUrl ? (
                  <ContentImage
                    src={logoUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="144px"
                    intrinsicWidth={144}
                    intrinsicHeight={144}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-3xl font-semibold text-[#8d5828]">
                    {post.title.slice(0, 1).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="mt-10 text-center sm:mt-0 sm:mb-2 sm:text-left">
                <h1 className="text-2xl font-bold text-[#562f00] md:text-3xl">
                  {brandName}
                </h1>
                <Badge
                  variant="secondary"
                  className="mt-2 bg-[#562f00]/10 text-[#562f00] hover:bg-[#562f00]/20"
                >
                  Member
                </Badge>
              </div>
            </div>
          </div>

          {/* Dark stats bar */}
          <div className="bg-[#0f0f1a] px-6 py-4 md:px-12">
          </div>
        </section>

        {/* Two-column body */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Left sidebar */}
          <aside className="space-y-6">
            {/* Followers */}
            <Card className="border-[#562f00]/10 bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-[#562f00]">
                  <Users className="h-4 w-4 text-blue-400" />
                  <span className="text-sm font-medium">{followerCount} Followers</span>
                </div>
                <p className="mt-4 text-center text-xs text-[#8d5828]/70">
                  {followerCount} follower{followerCount !== 1 ? 's' : ''}
                </p>
              </CardContent>
            </Card>

            {/* About */}
            <Card className="border-[#562f00]/10 bg-white shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm font-medium text-[#562f00]">
                  <Users className="h-4 w-4" />
                  About {brandName}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                {website && (
                  <div className="flex items-center gap-2 text-xs text-[#8d5828]">
                    <Globe className="h-3.5 w-3.5 shrink-0" />
                    <a
                      href={website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="truncate hover:underline"
                    >
                      {domain || website}
                    </a>
                  </div>
                )}
                {birthday && (
                  <div className="flex items-center gap-2 text-xs text-[#8d5828]">
                    <Calendar className="h-3.5 w-3.5 shrink-0" />
                    <span>Birthday {birthday}</span>
                  </div>
                )}
                {!website && !birthday && (
                  <p className="text-xs text-[#8d5828]/70">
                    No additional information available.
                  </p>
                )}
              </CardContent>
            </Card>
          </aside>

          {/* Main content with tabs */}
          <ProfileDetailClient
            brandName={brandName}
            descriptionHtml={descriptionHtml}
            images={images}
            website={website}
            domain={domain}
            birthday={birthday}
          />
        </div>

        {/* Suggested Articles */}
        {suggestedArticles.length ? (
          <section className="mt-12">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#562f00]">
                Suggested articles
              </h2>
              <Link
                href="/articles"
                className="text-sm font-medium text-[#562f00] hover:underline"
              >
                View all
              </Link>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {suggestedArticles.slice(0, 3).map((article) => (
                <TaskPostCard
                  key={article.id}
                  post={article}
                  href={buildPostUrl("article", article.slug)}
                  compact
                />
              ))}
            </div>
            <nav className="mt-6 rounded-2xl border border-[#562f00]/15 bg-[#fff9ec] p-4">
              <p className="text-sm font-semibold text-[#562f00]">
                Related links
              </p>
              <ul className="mt-2 space-y-2 text-sm">
                {suggestedArticles.slice(0, 3).map((article) => (
                  <li key={`related-${article.id}`}>
                    <Link
                      href={buildPostUrl("article", article.slug)}
                      className="text-primary underline-offset-4 hover:underline"
                    >
                      {article.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/profile"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    Browse all profiles
                  </Link>
                </li>
              </ul>
            </nav>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
