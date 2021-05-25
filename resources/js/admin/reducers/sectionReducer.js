import _ from 'lodash';

import {
  FETCH_SECTIONS,
  FETCH_SECTION,
  CREATE_SECTION,
  EDIT_SECTION,
  DELETE_SECTION,
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_SECTIONS:
      return { ..._.mapKeys(action.payload, 'id') };
    case FETCH_SECTION:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_SECTION:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_SECTION:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_SECTION:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
