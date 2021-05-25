import api from '../utils/api';
import { SET_CURRENT_SITE } from './types';

export const setCurrentSite = slug => async dispatch => {
  let payload = null;

  if (slug) {
    try {
      const response = await api.get(`/sites/bySlug/${slug}`);
      payload = response.data.data ?? null;
    } catch (error) {}
  }

  dispatch({ type: SET_CURRENT_SITE, payload: payload });
};
