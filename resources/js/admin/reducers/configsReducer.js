import _ from 'lodash';

import { SET_CURRENT_SITE } from '../actions/types';

export default (
  state = {
    currentSite: null,
  },
  action
) => {
  switch (action.type) {
    case SET_CURRENT_SITE:
      return { ...state, currentSite: action.payload };
    default:
      return state;
  }
};
