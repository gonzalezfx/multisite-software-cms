import { message } from 'antd';
import React from 'react';
import { connect } from 'react-redux';

import { createModule } from '../../actions/moduleActions';
import history from '../../utils/history';
import PageLayout from '../layout/PageLayout';
import ModuleForm from './ModuleForm';

const ModuleCreate = ({ configs, createModule }) => {
  const { currentSite } = configs;

  const onFinish = values => {
    createModule({ ...values, site_id: currentSite.id })
      .then(() => {
        history.push(`/${currentSite.slug}/modules`);
      })
      .catch(() => {
        message.error('Lo sentimos, ocurrió un error al guardar.');
      });
  };

  return (
    <PageLayout>
      <ModuleForm
        title="Nuevo módulo"
        finishAction={onFinish}
        currentSite={currentSite}
      ></ModuleForm>
    </PageLayout>
  );
};

export default connect(null, { createModule })(ModuleCreate);
