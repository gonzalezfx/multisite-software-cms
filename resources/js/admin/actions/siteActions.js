import api from '../utils/api';
import history from '../utils/history';
import {
  FETCH_SITES,
  FETCH_SITE,
  CREATE_SITE,
  EDIT_SITE,
  DELETE_SITE,
} from './types';

export const fetchSites = () => async dispatch => {
  const response = await api.get('/sites');

  dispatch({ type: FETCH_SITES, payload: response.data.data });
};

export const fetchSite = id => async dispatch => {
  const response = await api.get(`/sites/${id}`);

  dispatch({ type: FETCH_SITE, payload: response.data.data });
};

export const createSite = formData => async dispatch => {
  const response = await api.post('/sites', formData);

  dispatch({ type: CREATE_SITE, payload: response.data.data });
};

export const editSite = (id, formValues) => async dispatch => {
  const response = await api.patch(`/sites/${id}`, formValues);

  dispatch({ type: EDIT_SITE, payload: response.data.data });
};

export const deleteSite = id => async dispatch => {
  await api.delete(`/sites/${id}`);

  dispatch({ type: DELETE_SITE, payload: id });
};
