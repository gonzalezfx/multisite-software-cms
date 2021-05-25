import api from '../utils/api';
import history from '../utils/history';
import {
  FETCH_USERS,
  FETCH_USER,
  CREATE_USER,
  EDIT_USER,
  DELETE_USER,
} from './types';

export const fetchUsers = () => async dispatch => {
  const response = await api.get('/users');

  dispatch({ type: FETCH_USERS, payload: response.data.data });
};

export const fetchUser = id => async dispatch => {
  const response = await api.get(`/users/${id}`);

  dispatch({ type: FETCH_USER, payload: response.data.data });
};

export const createUser = formData => async dispatch => {
  const response = await api.post('/users', formData);

  dispatch({ type: CREATE_USER, payload: response.data.data });
};

export const editUser = (id, formValues) => async dispatch => {
  const response = await api.patch(`/users/${id}`, formValues);

  dispatch({ type: EDIT_USER, payload: response.data.data });
};

export const deleteUser = id => async dispatch => {
  await api.delete(`/users/${id}`);

  dispatch({ type: DELETE_USER, payload: id });
};
