import Link from "next/link";
import { notFound } from "next/navigation";

import { Footer } from "@/components/shared/footer";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { ContentImage } from "@/components/shared/content-image";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { PdfActions } from "@/components/shared/pdf-actions";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { buildPostMetadata, buildTaskMetadata } from "@/lib/seo";
import { buildPostUrl, fetchTaskPostBySlug, fetchTaskPosts } from "@/lib/task-data";
import { SITE_CONFIG } from "@/lib/site-config";

export const revalidate = 3;

export async function generateStaticParams() {
  const posts = await fetchTaskPosts("pdf", 50);
  if (!posts.length) {
    return [{ slug: "placeholder" }];
  }
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  try {
    const post = await fetchTaskPostBySlug("pdf", resolvedParams.slug);
    return post ? await buildPostMetadata("pdf", post) : await buildTaskMetadata("pdf");
  } catch (error) {
    console.warn("PDF metadata lookup failed", error);
    return await buildTaskMetadata("pdf");
  }
}

export default async function PdfDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  let post = null;
  try {
    post = await fetchTaskPostBySlug("pdf", resolvedParams.slug);
  } catch (error) {
    console.warn("PDF detail lookup failed", error);
  }
  if (!post) {
    notFound();
  }

  const content = post.content && typeof post.content === "object" ? post.content : {};
  const contentAny = content as Record<string, unknown>;
  const description =
    (typeof contentAny.description === "string" && contentAny.description.trim()) ||
    post.summary ||
    "Detailed PDF description will appear here.";
  const pdfUrl =
    (typeof contentAny.pdfUrl === "string" && contentAny.pdfUrl) ||
    (typeof contentAny.fileUrl === "string" && contentAny.fileUrl);
  const previewImage =
    (Array.isArray(post.media) && typeof post.media[0]?.url === "string" && post.media[0]?.url) ||
    (typeof contentAny.image === "string" && contentAny.image) ||
    (typeof contentAny.logo === "string" && contentAny.logo) ||
    "/covers/pdf-cover.svg";
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, "");
  const category =
    typeof contentAny.category === "string" ? contentAny.category : "";
  const related = (await fetchTaskPosts("pdf", 6))
    .filter((item) => item.slug !== post.slug)
    .filter((item) => {
      if (!category) return true;
      const itemContent = item.content && typeof item.content === "object" ? item.content : {};
      const itemCategory =
        typeof (itemContent as Record<string, unknown>).category === "string"
          ? (itemContent as Record<string, unknown>).category
          : "";
      return itemCategory === category;
    })
    .slice(0, 3);
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
        name: "PDF Library",
        item: `${baseUrl}/pdf`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${baseUrl}/pdf/${post.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffdf1_0%,#fff4dd_100%)]">
      <NavbarShell />
      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <SchemaJsonLd data={breadcrumbData} />
        <Link
          href="/pdf"
          className="text-sm text-[#7a4a1f] hover:text-[#562f00]"
        >
          ← Back to PDF Library
        </Link>
        <h1 className="text-2xl font-semibold text-[#562f00]">{post.title}</h1>
        {/* PDF Viewer */}
        {pdfUrl ? (
          <div className="overflow-hidden rounded-2xl border border-[#562f00]/15 bg-[#fffdf1]">
            <div className="p-4">
              <h2 className="mb-4 text-lg font-semibold text-[#562f00]">Document Viewer</h2>
              <div className="relative h-[600px] w-full overflow-hidden rounded-lg border border-[#562f00]/10 bg-white">
                <iframe
                  src={`${pdfUrl}#toolbar=0&statusbar=0&navpanes=0&scrollbar=0`}
                  title={post.title}
                  className="h-full w-full border-0"
                  loading="lazy"
                />
              </div>
              <div className="mt-4">
                <PdfActions
                  pdfUrl={pdfUrl}
                  currentUrl={`${baseUrl}/pdf/${post.slug}`}
                  title={post.title}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-[#562f00]/15 bg-[#fffdf1]">
            <div className="p-8 text-center">
              <p className="text-[#8d5828]">PDF document not available for viewing.</p>
            </div>
          </div>
        )}
        <div className="rounded-2xl border border-[#562f00]/15 bg-[#fff9ec] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8d5828]">Description</p>
          <p className="mt-3 text-base leading-8 text-[#7a4a1f]">{description}</p>
        </div>
        {related.length ? (
          <section className="pt-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#562f00]">More like this</h2>
              <Link
                href="/pdf"
                className="text-sm text-[#7a4a1f] hover:text-[#562f00]"
              >
                View all
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard
                  key={item.id}
                  post={item}
                  href={buildPostUrl("pdf", item.slug)}
                />
              ))}
            </div>
            <nav className="mt-6 rounded-2xl border border-[#562f00]/15 bg-[#fff9ec] p-4">
              <p className="text-sm font-semibold text-[#562f00]">Related links</p>
              <ul className="mt-2 space-y-2 text-sm">
                {related.map((item) => (
                  <li key={`related-${item.id}`}>
                    <Link
                      href={buildPostUrl("pdf", item.slug)}
                      className="text-primary underline-offset-4 hover:underline"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/pdf" className="text-primary underline-offset-4 hover:underline">
                    Browse all PDFs
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
