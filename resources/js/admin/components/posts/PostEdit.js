import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { message, Skeleton } from 'antd';
import _ from 'lodash';

import { fetchPost, editPost } from '../../actions/postActions';
import PostForm from './PostForm';
import PageLayout from '../layout/PageLayout';
import history from '../../utils/history';

const PostEdit = ({ configs, match, fetchPost, editPost, post }) => {
  const { currentSite } = configs;

  useEffect(() => {
    fetchPost(match.params.id);
  }, []);

  const onFinish = values => {
    editPost(match.params.id, values)
      .then(() => {
        history.push(`/${currentSite.slug}/posts/${match.params.id}`);
      })
      .catch(() => {
        message.error('Lo sentimos, ocurrió un error al guardar.');
      });
  };

  return (
    <PageLayout>
      {!post ? (
        <Skeleton active />
      ) : (
        <PostForm
          title="Editar entrada"
          initialValues={_.pick(
            post,
            'title',
            'author',
            'introduction',
            'content',
            'image_url'
          )}
          finishAction={onFinish}
          post={post}
          currentSite={currentSite}
        ></PostForm>
      )}
    </PageLayout>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { post: state.posts[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchPost, editPost })(PostEdit);
