import api from '../utils/api';
import history from '../utils/history';
import { FETCH_PAGES, FETCH_PAGE, EDIT_PAGE } from './types';

export const fetchPages = () => async dispatch => {
  const response = await api.get('/pages');

  dispatch({ type: FETCH_PAGES, payload: response.data.data });
};

export const fetchPage = id => async dispatch => {
  const response = await api.get(`/pages/${id}`);

  dispatch({ type: FETCH_PAGE, payload: response.data.data });
};

export const editPage = (id, formValues) => async dispatch => {
  const response = await api.patch(`/pages/${id}`, formValues);

  dispatch({ type: EDIT_PAGE, payload: response.data.data });
};
