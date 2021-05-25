import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { message, Skeleton } from 'antd';
import _ from 'lodash';

import {
  fetchTestimonial,
  editTestimonial,
} from '../../actions/testimonialActions';
import TestimonialForm from './TestimonialForm';
import PageLayout from '../layout/PageLayout';
import history from '../../utils/history';

const TestimonialEdit = ({
  configs,
  match,
  fetchTestimonial,
  editTestimonial,
  testimonial,
}) => {
  const { currentSite } = configs;

  useEffect(() => {
    fetchTestimonial(match.params.id);
  }, []);

  const onFinish = values => {
    editTestimonial(match.params.id, values)
      .then(() => {
        history.push(`/${currentSite.slug}/testimonials/${match.params.id}`);
      })
      .catch(() => {
        message.error('Lo sentimos, ocurrió un error al guardar.');
      });
  };

  return (
    <PageLayout>
      {!testimonial ? (
        <Skeleton active />
      ) : (
        <TestimonialForm
          title="Editar testimonio"
          initialValues={_.pick(
            testimonial,
            'company_name',
            'description',
            'logo_url'
          )}
          finishAction={onFinish}
          testimonial={testimonial}
          currentSite={currentSite}
        ></TestimonialForm>
      )}
    </PageLayout>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { testimonial: state.testimonials[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchTestimonial, editTestimonial })(
  TestimonialEdit
);
