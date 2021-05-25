import api from '../utils/api';
import history from '../utils/history';
import {
  FETCH_SLIDES,
  FETCH_SLIDE,
  CREATE_SLIDE,
  EDIT_SLIDE,
  DELETE_SLIDE,
} from './types';

export const fetchSlides = params => async dispatch => {
  const response = await api.get('/slides', {
    params,
  });

  dispatch({ type: FETCH_SLIDES, payload: response.data.data });
};

export const fetchSlide = id => async dispatch => {
  const response = await api.get(`/slides/${id}`);

  dispatch({ type: FETCH_SLIDE, payload: response.data.data });
};

export const createSlide = formData => async dispatch => {
  const response = await api.post('/slides', formData);

  dispatch({ type: CREATE_SLIDE, payload: response.data.data });
};

export const editSlide = (id, formValues) => async dispatch => {
  const response = await api.patch(`/slides/${id}`, formValues);

  dispatch({ type: EDIT_SLIDE, payload: response.data.data });
};

export const deleteSlide = id => async dispatch => {
  await api.delete(`/slides/${id}`);

  dispatch({ type: DELETE_SLIDE, payload: id });
};
