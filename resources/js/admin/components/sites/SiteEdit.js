import React from 'react';
import { connect } from 'react-redux';
import { message, Skeleton } from 'antd';
import _ from 'lodash';

import { editSite } from '../../actions/siteActions';
import SiteForm from './SiteForm';
import PageLayout from '../layout/PageLayout';
import { withSite } from '../hocs/withSite';
import history from '../../utils/history';

const SlideEdit = ({ match, configs, editSite }) => {
  const { currentSite } = configs;

  const onFinish = values => {
    editSite(currentSite.id, values)
      .then(() => {
        history.push(`/${values.slug}/details`);
      })
      .catch(() => {
        message.error('Lo sentimos, ocurrió un error al guardar.');
      });
  };

  return (
    <PageLayout>
      <SiteForm
        title="Editar sitio"
        initialValues={_.pick(
          currentSite,
          'name',
          'slug',
          'show_in_home',
          'image_url',
          'contact_email',
          'chat_facebook',
          'chat_whatsapp',
          'facebook_url',
          'linkedin_url',
          'youtube_url',
          'call_to_action_title',
          'call_to_action_text',
          'call_to_action_button_label',
          'call_to_action_button_url',
          'software_url',
          'software_guides_url'
        )}
        finishAction={onFinish}
        site={currentSite}
      ></SiteForm>
    </PageLayout>
  );
};

export default withSite(connect(null, { editSite })(SlideEdit));
