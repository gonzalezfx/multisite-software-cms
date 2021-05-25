import { message } from 'antd';
import React from 'react';
import { connect } from 'react-redux';

import { createPost } from '../../actions/postActions';
import history from '../../utils/history';
import PageLayout from '../layout/PageLayout';
import PostForm from './PostForm';

const PostCreate = ({ configs, createPost }) => {
  const { currentSite } = configs;

  const onFinish = values => {
    createPost({ ...values, site_id: currentSite.id })
      .then(() => {
        history.push(`/${currentSite.slug}/posts`);
      })
      .catch(() => {
        message.error('Lo sentimos, ocurrió un error al guardar.');
      });
  };

  return (
    <PageLayout>
      <PostForm
        title="Nueva entrada"
        finishAction={onFinish}
        currentSite={currentSite}
      ></PostForm>
    </PageLayout>
  );
};

export default connect(null, { createPost })(PostCreate);
