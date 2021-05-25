import axios from 'axios';
import { Modal } from 'antd';

import { apiURL, parentProjectURL } from '../utils/baseData';

const customAxios = axios.create({
  baseURL: apiURL,
});

function modalError(config) {
  const defaults = {
    title: '',
    content: '',
    onOk() {},
  };

  Modal.error({ ...defaults, ...config });
}

customAxios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    const statusCode = error.response ? error.response.status : null;

    if (statusCode === 401) {
      modalError({
        title: 'La sesión ha expirado',
        message: 'Es necesario autenticarse nuevamente',
        onOk: () => {
          location.reload();
        },
      });

      console.log('Please login to access this resource');
    }

    return Promise.reject(error);
  }
);

customAxios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Refresh CSRF Token
setInterval(refreshToken, 1000 * 60 * 5); // 1 hour

function refreshToken() {
  axios
    .get(parentProjectURL + '/refresh-csrf')
    .then(function(response) {
      document.querySelector('meta[name="csrf-token"]').content = response.data;
    })
    .catch(function(error) {});
}

export default customAxios;
