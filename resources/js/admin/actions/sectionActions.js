import api from '../utils/api';
import history from '../utils/history';
import {
  FETCH_SECTIONS,
  FETCH_SECTION,
  CREATE_SECTION,
  EDIT_SECTION,
  DELETE_SECTION,
} from './types';

export const fetchSections = params => async dispatch => {
  const response = await api.get('/sections', {
    params,
  });

  dispatch({ type: FETCH_SECTIONS, payload: response.data.data });
};

export const fetchSection = id => async dispatch => {
  const response = await api.get(`/sections/${id}`);

  dispatch({ type: FETCH_SECTION, payload: response.data.data });
};

export const createSection = formData => async dispatch => {
  const response = await api.post('/sections', formData);

  dispatch({ type: CREATE_SECTION, payload: response.data.data });
};

export const editSection = (id, formValues) => async dispatch => {
  const response = await api.patch(`/sections/${id}`, formValues);

  dispatch({ type: EDIT_SECTION, payload: response.data.data });
};

export const deleteSection = id => async dispatch => {
  await api.delete(`/sections/${id}`);

  dispatch({ type: DELETE_SECTION, payload: id });
};
