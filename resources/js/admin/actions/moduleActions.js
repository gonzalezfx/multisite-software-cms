import api from '../utils/api';
import {
  FETCH_MODULES,
  FETCH_MODULE,
  CREATE_MODULE,
  EDIT_MODULE,
  DELETE_MODULE,
} from './types';

export const fetchModules = params => async dispatch => {
  const response = await api.get('/modules', {
    params,
  });

  dispatch({ type: FETCH_MODULES, payload: response.data.data });
};

export const fetchModule = id => async dispatch => {
  const response = await api.get(`/modules/${id}`);

  dispatch({ type: FETCH_MODULE, payload: response.data.data });
};

export const createModule = formData => async dispatch => {
  const response = await api.post('/modules', formData);

  dispatch({ type: CREATE_MODULE, payload: response.data.data });
};

export const editModule = (id, formValues) => async dispatch => {
  const response = await api.patch(`/modules/${id}`, formValues);

  dispatch({ type: EDIT_MODULE, payload: response.data.data });
};

export const deleteModule = id => async dispatch => {
  await api.delete(`/modules/${id}`);

  dispatch({ type: DELETE_MODULE, payload: id });
};
