import { combineReducers } from 'redux';

import siteReducer from './siteReducer';
import slideReducer from './slideReducer';
import pageReducer from './pageReducer';
import sectionReducer from './sectionReducer';
import moduleReducer from './moduleReducer';
import postReducer from './postReducer';
import testimonialReducer from './testimonialReducer';
import userReducer from './userReducer';
import configsReducer from './configsReducer';

export default combineReducers({
  sites: siteReducer,
  slides: slideReducer,
  pages: pageReducer,
  sections: sectionReducer,
  modules: moduleReducer,
  posts: postReducer,
  testimonials: testimonialReducer,
  users: userReducer,
  configs: configsReducer,
});
