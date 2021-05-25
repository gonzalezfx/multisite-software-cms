import _ from 'lodash';

import {
  FETCH_TESTIMONIALS,
  FETCH_TESTIMONIAL,
  CREATE_TESTIMONIAL,
  EDIT_TESTIMONIAL,
  DELETE_TESTIMONIAL,
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_TESTIMONIALS:
      return { ..._.mapKeys(action.payload, 'id') };
    case FETCH_TESTIMONIAL:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_TESTIMONIAL:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_TESTIMONIAL:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_TESTIMONIAL:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
