import api from '../utils/api';
import {
  FETCH_POSTS,
  FETCH_POST,
  CREATE_POST,
  EDIT_POST,
  DELETE_POST,
} from './types';

export const fetchPosts = params => async dispatch => {
  const response = await api.get('/posts', {
    params,
  });

  dispatch({ type: FETCH_POSTS, payload: response.data.data });
};

export const fetchPost = id => async dispatch => {
  const response = await api.get(`/posts/${id}`);

  dispatch({ type: FETCH_POST, payload: response.data.data });
};

export const createPost = formData => async dispatch => {
  const response = await api.post('/posts', formData);

  dispatch({ type: CREATE_POST, payload: response.data.data });
};

export const editPost = (id, formValues) => async dispatch => {
  const response = await api.patch(`/posts/${id}`, formValues);

  dispatch({ type: EDIT_POST, payload: response.data.data });
};

export const deletePost = id => async dispatch => {
  await api.delete(`/posts/${id}`);

  dispatch({ type: DELETE_POST, payload: id });
};
