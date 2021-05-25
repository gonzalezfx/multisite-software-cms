import _ from 'lodash';

import {
  FETCH_SLIDES,
  FETCH_SLIDE,
  CREATE_SLIDE,
  EDIT_SLIDE,
  DELETE_SLIDE,
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_SLIDES:
      return { ..._.mapKeys(action.payload, 'id') };
    case FETCH_SLIDE:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_SLIDE:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_SLIDE:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_SLIDE:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
