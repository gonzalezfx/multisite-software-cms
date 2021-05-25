import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Skeleton } from 'antd';
import _ from 'lodash';

import history from '../../utils/history';
import { fetchPage, editPage } from '../../actions/pageActions';
import PageForm from './PageForm';
import PageLayout from '../layout/PageLayout';

const PageEdit = ({ configs, fetchPage, editPage, page, match }) => {
  const { currentSite } = configs;
  useEffect(() => {
    fetchPage(match.params.id);
  }, []);

  const onFinish = values => {
    editPage(match.params.id, values)
      .then(() => {
        history.push(`/${currentSite.slug}/pages/${match.params.id}`);
      })
      .catch(() => {});
  };

  return (
    <PageLayout>
      {!page ? (
        <Skeleton active />
      ) : (
        <PageForm
          title="Editar página"
          initialValues={_.pick(
            page,
            'title',
            'introduction',
            'content',
            'image_url'
          )}
          finishAction={onFinish}
          page={page}
          currentSite={currentSite}
        ></PageForm>
      )}
    </PageLayout>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { page: state.pages[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchPage, editPage })(PageEdit);
