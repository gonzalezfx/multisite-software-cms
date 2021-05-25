import api from '../utils/api';
import {
  FETCH_TESTIMONIALS,
  FETCH_TESTIMONIAL,
  CREATE_TESTIMONIAL,
  EDIT_TESTIMONIAL,
  DELETE_TESTIMONIAL,
} from './types';

export const fetchTestimonials = params => async dispatch => {
  const response = await api.get('/testimonials', {
    params,
  });

  dispatch({ type: FETCH_TESTIMONIALS, payload: response.data.data });
};

export const fetchTestimonial = id => async dispatch => {
  const response = await api.get(`/testimonials/${id}`);

  dispatch({ type: FETCH_TESTIMONIAL, payload: response.data.data });
};

export const createTestimonial = formData => async dispatch => {
  const response = await api.post('/testimonials', formData);

  dispatch({ type: CREATE_TESTIMONIAL, payload: response.data.data });
};

export const editTestimonial = (id, formValues) => async dispatch => {
  const response = await api.patch(`/testimonials/${id}`, formValues);

  dispatch({ type: EDIT_TESTIMONIAL, payload: response.data.data });
};

export const deleteTestimonial = id => async dispatch => {
  await api.delete(`/testimonials/${id}`);

  dispatch({ type: DELETE_TESTIMONIAL, payload: id });
};
