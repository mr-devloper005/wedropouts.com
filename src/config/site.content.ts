import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Professional PDF and profile hub',
  },
  footer: {
    tagline: 'Trusted documents and identities',
  },
  hero: {
    badge: 'Purpose-built workspace',
    title: ['A professional home for', 'PDF libraries and profile credibility.'],
    description: 'Wedropouts helps teams publish trusted PDF resources and maintain clear public profiles in one organized platform.',
    primaryCta: {
      label: 'Open PDF Library',
      href: '/pdf',
    },
    secondaryCta: {
      label: 'Browse Profiles',
      href: '/profile',
    },
    searchPlaceholder: 'Search PDFs, profiles, and related sections',
    focusLabel: 'Primary focus',
    featureCardBadge: 'curated publishing flow',
    featureCardTitle: 'Documents and identity pages work together for trusted discovery.',
    featureCardDescription:
      'The interface is tuned for document-first navigation while preserving every task route and system behavior.',
  },
  home: {
    metadata: {
      title: 'Professional PDF library and profiles',
      description: 'A classic, professional platform for publishing PDFs and profile pages with dependable discovery.',
      openGraphTitle: 'Professional PDF library and profiles',
      openGraphDescription:
        'Discover trusted PDFs, expert profiles, and accessible task routes across a professional publishing interface.',
      keywords: ['pdf platform', 'profile platform', 'document discovery', 'professional publishing'],
    },
    introBadge: 'Platform purpose',
    introTitle: 'Built to publish structured PDFs and strengthen profile trust.',
    introParagraphs: [
      'This site is designed around two core surfaces: a searchable PDF library and profile pages that establish ownership, credibility, and context.',
      'Documents remain easy to scan and open, while profiles provide the people, organizations, and intent behind each publication.',
      'All other task routes remain active and URL-accessible, but discovery is intentionally centered on PDF and profile workflows.',
    ],
    sideBadge: 'What stands out',
    sidePoints: [
      'PDF-first homepage architecture with professional document framing.',
      'Profile-first trust signals beside document surfaces.',
      'Classic typography and warm paper palette for editorial clarity.',
      'Lightweight motion and performance-focused components.',
    ],
    primaryLink: {
      label: 'Browse PDFs',
      href: '/pdf',
    },
    secondaryLink: {
      label: 'Explore profiles',
      href: '/profile',
    },
  },
  cta: {
    badge: 'Get started',
    title: 'Publish trusted PDF resources with clear profile ownership.',
    description: 'Keep your document library discoverable and your profile identity consistent across every section.',
    primaryCta: {
      label: 'Create an account',
      href: '/register',
    },
    secondaryCta: {
      label: 'Contact support',
      href: '/contact',
    },
  },
  taskSectionHeading: 'Latest {label}',
  taskSectionDescriptionSuffix: 'Browse the newest posts in this section.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles and stories',
    description: 'Long-form insights connected to PDFs, profiles, and supporting resources.',
  },
  listing: {
    title: 'Listings and discoverable pages',
    description: 'Structured listings that remain accessible alongside the primary PDF and profile focus.',
  },
  classified: {
    title: 'Classifieds and announcements',
    description: 'Timely announcements available as part of the broader multi-task platform.',
  },
  image: {
    title: 'Images and visual posts',
    description: 'Visual media surfaces that complement profile and document workflows.',
  },
  profile: {
    title: 'Profiles and public pages',
    description: 'Professional profile surfaces for creators, experts, and organizations.',
  },
  sbm: {
    title: 'Curated links and saved resources',
    description: 'Curated references and bookmark collections within the same publishing system.',
  },
  pdf: {
    title: 'PDFs and downloadable resources',
    description: 'A structured PDF library for trusted downloads, guides, and reports.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: {
    title: 'Listings, services, and structured pages',
    paragraphs: [
      'Explore listings, services, brands, and discoverable pages across categories. Each entry is organized to make browsing clearer and help visitors quickly understand what a post offers.',
      'Listings connect naturally with articles, images, resources, and other content types so supporting information stays easy to reach from the same platform.',
      'Browse by category to compare posts in context, discover related content, and move between formats without losing your place.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'Explore classifieds', href: '/classifieds' },
      { label: 'View profiles', href: '/profile' },
    ],
  },
  article: {
    title: 'Articles, stories, and long-form reading',
    paragraphs: [
      'This section is built for stories, explainers, guides, and long-form reading across topics and interests.',
      'Articles connect with listings, images, resources, and other content types so deeper reading can lead naturally into related discovery.',
      'Use this section to browse thoughtful posts, revisit useful writing, and move into supporting content when you want more context.',
    ],
    links: [
      { label: 'Explore listings', href: '/listings' },
      { label: 'Open images', href: '/images' },
      { label: 'Browse resources', href: '/pdf' },
    ],
  },
  classified: {
    title: 'Classifieds, offers, and timely updates',
    paragraphs: [
      'Classified posts help surface offers, notices, deals, and time-sensitive opportunities in a faster-scanning format.',
      'They work well alongside articles, listings, and profiles, making it easier to connect short-term posts with more structured content.',
      'Browse by category to find announcements quickly, then continue into related sections when you need more detail.',
    ],
    links: [
      { label: 'Business listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'View profiles', href: '/profile' },
    ],
  },
  image: {
    title: 'Image-led posts and visual stories',
    paragraphs: [
      'Images take the lead in this section through galleries, visual posts, and story-led content where imagery carries the experience.',
      'These posts connect with articles, listings, and other sections so visuals can act as entry points into deeper content.',
      'Browse the latest visual updates, then continue into related stories or supporting pages for more context.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'Explore listings', href: '/listings' },
      { label: 'Open classifieds', href: '/classifieds' },
    ],
  },
  profile: {
    title: 'Profiles, identities, and public pages',
    paragraphs: [
      'Profiles capture the identity behind a business, creator, brand, or project and help visitors understand who is behind the content they are exploring.',
      'These pages work as trust anchors across the site and connect naturally with stories, listings, documents, and other post types.',
      'Browse profiles to understand people and brands more clearly, then continue into related content from the same source.',
    ],
    links: [
      { label: 'Open listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'Browse images', href: '/images' },
    ],
  },
  sbm: {
    title: 'Curated links and bookmarked resources',
    paragraphs: [
      'This section collects useful links, references, tools, and saved resources in a text-first browsing format.',
      'Bookmarks stay connected to the rest of the platform, making it easier to move from a saved link into related stories, listings, or resources.',
      'Use this section to organize helpful sources and discover connected content without leaving the broader site experience.',
    ],
    links: [
      { label: 'Browse articles', href: '/articles' },
      { label: 'Explore listings', href: '/listings' },
      { label: 'Open PDFs', href: '/pdf' },
    ],
  },
  pdf: {
    title: 'PDFs, documents, and downloadable files',
    paragraphs: [
      'The PDF library hosts reports, guides, downloadable files, and longer-form document resources that support reading and discovery.',
      'These resources work alongside stories, listings, and profiles, helping document-style content stay connected to the rest of the platform.',
      'Browse by category to find relevant files quickly, then continue into related sections when you want more context.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'See listings', href: '/listings' },
      { label: 'Explore profiles', href: '/profile' },
    ],
  },
  social: {
    title: 'Short updates and community signals',
    paragraphs: [
      'Short updates add quick signals that keep activity flowing across the platform.',
      'They work well with stories, listings, and resources by helping visitors move from brief updates into deeper content.',
      'Use these posts as lightweight entry points into the broader site experience.',
    ],
    links: [
      { label: 'Open listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'View PDFs', href: '/pdf' },
    ],
  },
  comment: {
    title: 'Comments and contextual responses',
    paragraphs: [
      'Comments surface responses connected directly to articles and help keep discussion close to the writing it belongs to.',
      'This layer adds perspective and reaction without needing a separate standalone content format.',
      'Use comments as supporting context beneath stories, then continue exploring related content from the same topic area.',
    ],
    links: [
      { label: 'Explore articles', href: '/articles' },
      { label: 'View listings', href: '/listings' },
      { label: 'See classifieds', href: '/classifieds' },
    ],
  },
  org: {
    title: 'Organizations, teams, and structured entities',
    paragraphs: [
      'Organization pages provide structured identity surfaces for teams, brands, communities, and agencies.',
      'Used with listings, stories, profiles, and resources, they help create stronger structure across the platform.',
      'Connect organization pages with related content to build a clearer and more unified site presence.',
    ],
    links: [
      { label: 'Business listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'PDF library', href: '/pdf' },
    ],
  },
}
