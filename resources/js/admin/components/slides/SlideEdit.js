import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { message, Skeleton } from 'antd';
import _ from 'lodash';

import { fetchSlide, editSlide } from '../../actions/slideActions';
import SlideForm from './SlideForm';
import PageLayout from '../layout/PageLayout';
import history from '../../utils/history';

const SlideEdit = ({ configs, match, fetchSlide, editSlide, slide }) => {
  const { currentSite } = configs;

  useEffect(() => {
    fetchSlide(match.params.id);
  }, []);

  const onFinish = values => {
    editSlide(match.params.id, values)
      .then(() => {
        history.push(`/${currentSite.slug}/slides/${match.params.id}`);
      })
      .catch(() => {
        message.error('Lo sentimos, ocurrió un error al guardar.');
      });
  };

  return (
    <PageLayout>
      {!slide ? (
        <Skeleton active />
      ) : (
        <SlideForm
          title="Editar banner"
          initialValues={_.pick(
            slide,
            'first_line',
            'second_line',
            'third_line',
            'image_url',
            'button_icon_url',
            'button_label',
            'button_url'
          )}
          finishAction={onFinish}
          slide={slide}
          currentSite={currentSite}
        ></SlideForm>
      )}
    </PageLayout>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { slide: state.slides[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchSlide, editSlide })(SlideEdit);
