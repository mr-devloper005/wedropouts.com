import type { TaskKey } from "./site-config";
import type { SitePost } from "./site-connector";

const DUMMY_PDF_URL = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

const fallbackPosts: Partial<Record<TaskKey, SitePost[]>> = {
  pdf: [
    {
      id: "fallback-pdf-1",
      title: "Company Profile Dossier 2026",
      slug: "placeholder-company-profile-pdf-2026",
      summary: "Full company dossier with overview, services, proofs, and contact-ready highlights.",
      content: {
        type: "pdf",
        category: "Business",
        description:
          "Includes executive summary, service categories, credentials, case snapshots, and outreach channels.",
        fileUrl: DUMMY_PDF_URL,
        pdfUrl: DUMMY_PDF_URL,
      },
      media: [{ url: "https://picsum.photos/id/20/960/1280", type: "IMAGE" }],
      tags: ["pdf", "profile-kit"],
      authorName: "Wedropouts Editorial Desk",
      publishedAt: new Date().toISOString(),
    },
    {
      id: "fallback-pdf-2",
      title: "Service Portfolio Brochure",
      slug: "placeholder-service-portfolio-brochure-2026",
      summary: "Portfolio brochure with service lines, pricing bands, implementation steps, and SLAs.",
      content: {
        type: "pdf",
        category: "Technology",
        description:
          "Covers solution packages, client fit matrix, onboarding timeline, and escalation policy.",
        fileUrl: DUMMY_PDF_URL,
        pdfUrl: DUMMY_PDF_URL,
      },
      media: [{ url: "https://picsum.photos/id/24/960/1280", type: "IMAGE" }],
      tags: ["pdf", "brochure"],
      authorName: "Wedropouts Editorial Desk",
      publishedAt: new Date().toISOString(),
    },
    {
      id: "fallback-pdf-3",
      title: "Capability Statement",
      slug: "placeholder-capability-statement",
      summary: "Capability statement for partners with certifications, delivery scope, and contract-readiness.",
      content: {
        type: "pdf",
        category: "Service",
        description:
          "Contains compliance checklist, competency index, and prior engagement highlights.",
        fileUrl: DUMMY_PDF_URL,
        pdfUrl: DUMMY_PDF_URL,
      },
      media: [{ url: "https://picsum.photos/id/28/960/1280", type: "IMAGE" }],
      tags: ["pdf", "statement"],
      authorName: "Wedropouts Editorial Desk",
      publishedAt: new Date().toISOString(),
    },
    {
      id: "fallback-pdf-4",
      title: "Partner Onboarding Pack",
      slug: "placeholder-partner-onboarding-pack",
      summary: "Structured onboarding package for vendors with setup, governance, and reporting format.",
      content: {
        type: "pdf",
        category: "Education",
        description:
          "Includes account setup checklist, communication cadence, approval gates, and launch milestones.",
        fileUrl: DUMMY_PDF_URL,
        pdfUrl: DUMMY_PDF_URL,
      },
      media: [{ url: "https://picsum.photos/id/30/960/1280", type: "IMAGE" }],
      tags: ["pdf", "onboarding"],
      authorName: "Wedropouts Editorial Desk",
      publishedAt: new Date().toISOString(),
    },
  ],
  profile: [
    {
      id: "fallback-profile-1",
      title: "Editorial Operations Team",
      slug: "placeholder-editorial-operations-team",
      summary: "Core publishing team responsible for document quality, release control, and metadata standards.",
      content: {
        type: "profile",
        category: "Business",
        name: "Editorial Operations Team",
        brandName: "Editorial Operations Team",
        description:
          "The Editorial Operations Team manages publishing workflows, document QA, profile governance, and final release approvals across the platform.",
        website: "https://example.com/editorial-operations",
        logo: "https://i.pravatar.cc/512?img=12",
      },
      media: [{ url: "https://i.pravatar.cc/960?img=12", type: "IMAGE" }],
      tags: ["profile", "team"],
      authorName: "Wedropouts Editorial Desk",
      publishedAt: new Date().toISOString(),
    },
    {
      id: "fallback-profile-2",
      title: "Document Publishing Desk",
      slug: "placeholder-document-publishing-desk",
      summary: "Publishing desk profile focused on document packaging, cross-format consistency, and releases.",
      content: {
        type: "profile",
        category: "Technology",
        name: "Document Publishing Desk",
        brandName: "Document Publishing Desk",
        description:
          "This desk prepares cover design systems, metadata quality checks, accessibility review, and release readiness for PDF content.",
        website: "https://example.com/document-publishing",
        logo: "https://i.pravatar.cc/512?img=32",
      },
      media: [{ url: "https://i.pravatar.cc/960?img=32", type: "IMAGE" }],
      tags: ["profile", "department"],
      authorName: "Wedropouts Editorial Desk",
      publishedAt: new Date().toISOString(),
    },
    {
      id: "fallback-profile-3",
      title: "Knowledge Resource Group",
      slug: "placeholder-knowledge-resource-group",
      summary: "Knowledge team profile focused on long-term curation and structured reference maintenance.",
      content: {
        type: "profile",
        category: "Education",
        name: "Knowledge Resource Group",
        brandName: "Knowledge Resource Group",
        description:
          "Knowledge Resource Group curates evergreen references, updates document libraries, and maintains cross-section consistency for users and teams.",
        website: "https://example.com/knowledge-resources",
        logo: "https://i.pravatar.cc/512?img=47",
      },
      media: [{ url: "https://i.pravatar.cc/960?img=47", type: "IMAGE" }],
      tags: ["profile", "organization"],
      authorName: "Wedropouts Editorial Desk",
      publishedAt: new Date().toISOString(),
    },
  ],
};

export function getFallbackPostsForTask(task: TaskKey, limit = 8): SitePost[] {
  return (fallbackPosts[task] || []).slice(0, limit);
}

export function getFallbackPostBySlug(task: TaskKey, slug: string): SitePost | null {
  const taskPosts = fallbackPosts[task] || [];
  return taskPosts.find((post) => post.slug === slug) || null;
}

