import _ from 'lodash';

import { FETCH_PAGES, FETCH_PAGE, EDIT_PAGE } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_PAGES:
      return { ..._.mapKeys(action.payload, 'id') };
    case FETCH_PAGE:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_PAGE:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};
