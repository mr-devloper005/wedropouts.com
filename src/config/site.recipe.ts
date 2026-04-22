import type { SiteRecipe } from '@/design/factory/recipe-types'

export const SITE_RECIPE: SiteRecipe = {
  productFamily: 'editorial',
  themePack: 'medium-journal',
  homepageTemplate: 'article-home',
  navbarTemplate: 'editorial-bar',
  footerTemplate: 'editorial-footer',
  motionPack: 'editorial-soft',
  primaryTask: 'article',
  enabledTasks: ['article', 'profile'],
  taskTemplates: {
    article: 'article-journal',
    image: 'image-portfolio',
    listing: 'listing-showcase',
    classified: 'classified-bulletin',
    pdf: 'article-journal',
    profile: 'profile-business',
    sbm: 'sbm-library',
  },
  manualOverrides: {
    navbar: false,
    footer: false,
    homePage: false,
    taskListPage: false,
    taskDetailPage: false,
    taskCard: false,
    contactPage: false,
    loginPage: false,
    registerPage: false,
  },
}


