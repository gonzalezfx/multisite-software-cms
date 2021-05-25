import { message } from 'antd';
import React from 'react';
import { connect } from 'react-redux';

import { createTestimonial } from '../../actions/testimonialActions';
import history from '../../utils/history';
import PageLayout from '../layout/PageLayout';
import TestimonialForm from './TestimonialForm';

const TestimonialCreate = ({ configs, createTestimonial }) => {
  const { currentSite } = configs;

  const onFinish = values => {
    createTestimonial({ ...values, site_id: currentSite.id })
      .then(() => {
        history.push(`/${currentSite.slug}/testimonials`);
      })
      .catch(error => {
        message.error('Lo sentimos, ocurrió un error al guardar.');
      });
  };

  return (
    <PageLayout>
      <TestimonialForm
        title="Nuevo testimonio"
        finishAction={onFinish}
        currentSite={currentSite}
      ></TestimonialForm>
    </PageLayout>
  );
};

export default connect(null, { createTestimonial })(TestimonialCreate);
