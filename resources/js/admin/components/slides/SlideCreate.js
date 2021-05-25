import { message } from 'antd';
import React from 'react';
import { connect } from 'react-redux';

import { createSlide } from '../../actions/slideActions';
import history from '../../utils/history';
import PageLayout from '../layout/PageLayout';
import SlideForm from './SlideForm';

const SlideCreate = ({ configs, createSlide }) => {
  const { currentSite } = configs;

  const onFinish = values => {
    createSlide({ ...values, site_id: currentSite.id })
      .then(() => {
        history.push(`/${currentSite.slug}/slides`);
      })
      .catch(() => {
        message.error('Lo sentimos, ocurrió un error al guardar.');
      });
  };

  return (
    <PageLayout>
      <SlideForm
        title="Nuevo banner"
        finishAction={onFinish}
        currentSite={currentSite}
      ></SlideForm>
    </PageLayout>
  );
};

export default connect(null, { createSlide })(SlideCreate);
