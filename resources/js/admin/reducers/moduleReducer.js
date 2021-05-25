import _ from 'lodash';

import {
  FETCH_MODULES,
  FETCH_MODULE,
  CREATE_MODULE,
  EDIT_MODULE,
  DELETE_MODULE,
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_MODULES:
      return { ..._.mapKeys(action.payload, 'id') };
    case FETCH_MODULE:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_MODULE:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_MODULE:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_MODULE:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
