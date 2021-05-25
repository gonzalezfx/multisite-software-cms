import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { message, Skeleton } from 'antd';
import _ from 'lodash';

import { fetchModule, editModule } from '../../actions/moduleActions';
import ModuleForm from './ModuleForm';
import PageLayout from '../layout/PageLayout';
import history from '../../utils/history';

const ModuleEdit = ({ configs, match, fetchModule, editModule, module }) => {
  const { currentSite } = configs;

  useEffect(() => {
    fetchModule(match.params.id);
  }, []);

  const onFinish = values => {
    editModule(match.params.id, values)
      .then(() => {
        history.push(`/${currentSite.slug}/modules/${match.params.id}`);
      })
      .catch(() => {
        message.error('Lo sentimos, ocurrió un error al guardar.');
      });
  };

  return (
    <PageLayout>
      {!module ? (
        <Skeleton active />
      ) : (
        <ModuleForm
          title="Editar módulo"
          initialValues={_.pick(
            module,
            'name',
            'content',
            'icon_url',
            'image_url',
            'listable_bonus'
          )}
          finishAction={onFinish}
          module={module}
          currentSite={currentSite}
        ></ModuleForm>
      )}
    </PageLayout>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { module: state.modules[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchModule, editModule })(
  ModuleEdit
);
