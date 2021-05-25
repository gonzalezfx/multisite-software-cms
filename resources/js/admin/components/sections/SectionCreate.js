import { message } from 'antd';
import React from 'react';
import { connect } from 'react-redux';

import { createSection } from '../../actions/sectionActions';
import history from '../../utils/history';
import PageLayout from '../layout/PageLayout';
import SectionForm from './SectionForm';

const SectionCreate = ({ configs, createSection }) => {
  const { currentSite } = configs;

  const onFinish = values => {
    createSection({ ...values, site_id: currentSite.id })
      .then(() => {
        history.push(`/${currentSite.slug}/sections`);
      })
      .catch(() => {
        message.error('Lo sentimos, ocurrió un error al guardar.');
      });
  };

  return (
    <PageLayout>
      <SectionForm
        title="Nueva sección"
        finishAction={onFinish}
        currentSite={currentSite}
      ></SectionForm>
    </PageLayout>
  );
};

export default connect(null, { createSection })(SectionCreate);
