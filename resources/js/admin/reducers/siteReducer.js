import _ from 'lodash';

import {
  FETCH_SITES,
  FETCH_SITE,
  CREATE_SITE,
  EDIT_SITE,
  DELETE_SITE,
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_SITES:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case FETCH_SITE:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_SITE:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_SITE:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_SITE:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
