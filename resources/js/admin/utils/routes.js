import Index from '../components/index/Index';
import NotFound from '../components/index/NotFound';

import SiteAdmin from '../components/sites/SiteAdmin';
import SiteShow from '../components/sites/SiteShow';
import SiteCreate from '../components/sites/SiteCreate';
import SiteEdit from '../components/sites/SiteEdit';

import SlideList from '../components/slides/SlideList';
import SlideShow from '../components/slides/SlideShow';
import SlideCreate from '../components/slides/SlideCreate';
import SlideEdit from '../components/slides/SlideEdit';

import PageList from '../components/pages/PageList';
import PageShow from '../components/pages/PageShow';
import PageEdit from '../components/pages/PageEdit';

import SectionList from '../components/sections/SectionList';
import SectionShow from '../components/sections/SectionShow';
import SectionCreate from '../components/sections/SectionCreate';
import SectionEdit from '../components/sections/SectionEdit';

import ModuleList from '../components/modules/ModuleList';
import ModuleShow from '../components/modules/ModuleShow';
import ModuleCreate from '../components/modules/ModuleCreate';
import ModuleEdit from '../components/modules/ModuleEdit';

import PostList from '../components/posts/PostList';
import PostShow from '../components/posts/PostShow';
import PostCreate from '../components/posts/PostCreate';
import PostEdit from '../components/posts/PostEdit';

import TestimonialList from '../components/testimonials/TestimonialList';
import TestimonialShow from '../components/testimonials/TestimonialShow';
import TestimonialCreate from '../components/testimonials/TestimonialCreate';
import TestimonialEdit from '../components/testimonials/TestimonialEdit';

import UserList from '../components/users/UserList';
import UserShow from '../components/users/UserShow';
import UserCreate from '../components/users/UserCreate';
import UserEdit from '../components/users/UserEdit';

export const ROUTE_KEYS = {
  ROOT: '/',
  NOT_FOUND: '',

  SITES: '/sites',
  SITE_ADMIN: '/:currentSite',
  SITE_SHOW: '/:currentSite/details',
  SITE_CREATE: '/sites/create',
  SITE_EDIT: '/:currentSite/edit',

  SLIDES: '/:currentSite/slides',
  SLIDE_SHOW: '/:currentSite/slides/:id(\\d+)',
  SLIDE_CREATE: '/:currentSite/slides/create',
  SLIDE_EDIT: '/:currentSite/slides/edit/:id(\\d+)',

  PAGES: '/:currentSite/pages',
  PAGE_SHOW: '/:currentSite/pages/:id(\\d+)',
  PAGE_EDIT: '/:currentSite/pages/edit/:id(\\d+)',

  SECTIONS: '/:currentSite/sections',
  SECTION_SHOW: '/:currentSite/sections/:id(\\d+)',
  SECTION_CREATE: '/:currentSite/sections/create',
  SECTION_EDIT: '/:currentSite/sections/edit/:id(\\d+)',

  MODULES: '/:currentSite/modules',
  MODULE_SHOW: '/:currentSite/modules/:id(\\d+)',
  MODULE_CREATE: '/:currentSite/modules/create',
  MODULE_EDIT: '/:currentSite/modules/edit/:id(\\d+)',

  POSTS: '/:currentSite/posts',
  POST_SHOW: '/:currentSite/posts/:id(\\d+)',
  POST_CREATE: '/:currentSite/posts/create',
  POST_EDIT: '/:currentSite/posts/edit/:id(\\d+)',

  TESTIMONIALS: '/:currentSite/testimonials',
  TESTIMONIAL_SHOW: '/:currentSite/testimonials/:id(\\d+)',
  TESTIMONIAL_CREATE: '/:currentSite/testimonials/create',
  TESTIMONIAL_EDIT: '/:currentSite/testimonials/edit/:id(\\d+)',

  USERS: '/users',
  USER_SHOW: '/users/:id(\\d+)',
  USER_CREATE: '/users/create',
  USER_EDIT: '/users/edit/:id(\\d+)',
};

export const ROUTES = {
  ROOT: {
    component: Index,
    exact: true,
    key: ROUTE_KEYS.ROOT,
    path: ROUTE_KEYS.ROOT,
  },

  // SITES ROUTES
  SITE_ADMIN: {
    component: SiteAdmin,
    exact: true,
    key: ROUTE_KEYS.SITE_ADMIN,
    path: ROUTE_KEYS.SITE_ADMIN,
  },
  SITE_CREATE: {
    component: SiteCreate,
    exact: true,
    key: ROUTE_KEYS.SITE_CREATE,
    path: ROUTE_KEYS.SITE_CREATE,
  },
  SITE_SHOW: {
    component: SiteShow,
    exact: true,
    key: ROUTE_KEYS.SITE_SHOW,
    path: ROUTE_KEYS.SITE_SHOW,
  },
  SITE_EDIT: {
    component: SiteEdit,
    exact: true,
    key: ROUTE_KEYS.SITE_EDIT,
    path: ROUTE_KEYS.SITE_EDIT,
  },

  // SLIDES ROUTES
  SLIDES: {
    component: SlideList,
    exact: true,
    key: ROUTE_KEYS.SLIDES,
    path: ROUTE_KEYS.SLIDES,
  },
  SLIDE_CREATE: {
    component: SlideCreate,
    exact: true,
    key: ROUTE_KEYS.SLIDE_CREATE,
    path: ROUTE_KEYS.SLIDE_CREATE,
  },
  SLIDE_SHOW: {
    component: SlideShow,
    exact: true,
    key: ROUTE_KEYS.SLIDE_SHOW,
    path: ROUTE_KEYS.SLIDE_SHOW,
  },
  SLIDE_EDIT: {
    component: SlideEdit,
    exact: true,
    key: ROUTE_KEYS.SLIDE_EDIT,
    path: ROUTE_KEYS.SLIDE_EDIT,
  },

  // PAGES ROUTES
  PAGES: {
    component: PageList,
    exact: true,
    key: ROUTE_KEYS.PAGES,
    path: ROUTE_KEYS.PAGES,
  },
  PAGE_SHOW: {
    component: PageShow,
    exact: true,
    key: ROUTE_KEYS.PAGE_SHOW,
    path: ROUTE_KEYS.PAGE_SHOW,
  },
  PAGE_EDIT: {
    component: PageEdit,
    exact: true,
    key: ROUTE_KEYS.PAGE_EDIT,
    path: ROUTE_KEYS.PAGE_EDIT,
  },

  // SECTIONS ROUTES
  SECTIONS: {
    component: SectionList,
    exact: true,
    key: ROUTE_KEYS.SECTIONS,
    path: ROUTE_KEYS.SECTIONS,
  },
  SECTION_CREATE: {
    component: SectionCreate,
    exact: true,
    key: ROUTE_KEYS.SECTION_CREATE,
    path: ROUTE_KEYS.SECTION_CREATE,
  },
  SECTION_SHOW: {
    component: SectionShow,
    exact: true,
    key: ROUTE_KEYS.SECTION_SHOW,
    path: ROUTE_KEYS.SECTION_SHOW,
  },
  SECTION_EDIT: {
    component: SectionEdit,
    exact: true,
    key: ROUTE_KEYS.SECTION_EDIT,
    path: ROUTE_KEYS.SECTION_EDIT,
  },

  // MODULES ROUTES
  MODULES: {
    component: ModuleList,
    exact: true,
    key: ROUTE_KEYS.MODULES,
    path: ROUTE_KEYS.MODULES,
  },
  MODULE_CREATE: {
    component: ModuleCreate,
    exact: true,
    key: ROUTE_KEYS.MODULE_CREATE,
    path: ROUTE_KEYS.MODULE_CREATE,
  },
  MODULE_SHOW: {
    component: ModuleShow,
    exact: true,
    key: ROUTE_KEYS.MODULE_SHOW,
    path: ROUTE_KEYS.MODULE_SHOW,
  },
  MODULE_EDIT: {
    component: ModuleEdit,
    exact: true,
    key: ROUTE_KEYS.MODULE_EDIT,
    path: ROUTE_KEYS.MODULE_EDIT,
  },

  // POSTS ROUTES
  POSTS: {
    component: PostList,
    exact: true,
    key: ROUTE_KEYS.POSTS,
    path: ROUTE_KEYS.POSTS,
  },
  POST_CREATE: {
    component: PostCreate,
    exact: true,
    key: ROUTE_KEYS.POST_CREATE,
    path: ROUTE_KEYS.POST_CREATE,
  },
  POST_SHOW: {
    component: PostShow,
    exact: true,
    key: ROUTE_KEYS.POST_SHOW,
    path: ROUTE_KEYS.POST_SHOW,
  },
  POST_EDIT: {
    component: PostEdit,
    exact: true,
    key: ROUTE_KEYS.POST_EDIT,
    path: ROUTE_KEYS.POST_EDIT,
  },

  // TESTIMONIALS ROUTES
  TESTIMONIALS: {
    component: TestimonialList,
    exact: true,
    key: ROUTE_KEYS.TESTIMONIALS,
    path: ROUTE_KEYS.TESTIMONIALS,
  },
  TESTIMONIAL_CREATE: {
    component: TestimonialCreate,
    exact: true,
    key: ROUTE_KEYS.TESTIMONIAL_CREATE,
    path: ROUTE_KEYS.TESTIMONIAL_CREATE,
  },
  TESTIMONIAL_SHOW: {
    component: TestimonialShow,
    exact: true,
    key: ROUTE_KEYS.TESTIMONIAL_SHOW,
    path: ROUTE_KEYS.TESTIMONIAL_SHOW,
  },
  TESTIMONIAL_EDIT: {
    component: TestimonialEdit,
    exact: true,
    key: ROUTE_KEYS.TESTIMONIAL_EDIT,
    path: ROUTE_KEYS.TESTIMONIAL_EDIT,
  },

  // USERS ROUTES
  USERS: {
    component: UserList,
    exact: true,
    key: ROUTE_KEYS.USERS,
    path: ROUTE_KEYS.USERS,
  },
  USER_CREATE: {
    component: UserCreate,
    exact: true,
    key: ROUTE_KEYS.USER_CREATE,
    path: ROUTE_KEYS.USER_CREATE,
  },
  USER_SHOW: {
    component: UserShow,
    exact: true,
    key: ROUTE_KEYS.USER_SHOW,
    path: ROUTE_KEYS.USER_SHOW,
  },
  USER_EDIT: {
    component: UserEdit,
    exact: true,
    key: ROUTE_KEYS.USER_EDIT,
    path: ROUTE_KEYS.USER_EDIT,
  },

  NOT_FOUND: {
    component: NotFound,
    exact: true,
    key: ROUTE_KEYS.NOT_FOUND,
    path: ROUTE_KEYS.NOT_FOUND,
  },
};
