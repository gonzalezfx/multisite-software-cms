import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { message, Skeleton } from 'antd';
import _ from 'lodash';

import { fetchSection, editSection } from '../../actions/sectionActions';
import SectionForm from './SectionForm';
import PageLayout from '../layout/PageLayout';
import history from '../../utils/history';

const SectionEdit = ({
  configs,
  match,
  fetchSection,
  editSection,
  section,
}) => {
  const { currentSite } = configs;

  useEffect(() => {
    fetchSection(match.params.id);
  }, []);

  const onFinish = values => {
    editSection(match.params.id, values)
      .then(() => {
        history.push(`/${currentSite.slug}/sections/${match.params.id}`);
      })
      .catch(() => {
        message.error('Lo sentimos, ocurrió un error al guardar.');
      });
  };

  return (
    <PageLayout>
      {!section ? (
        <Skeleton active />
      ) : (
        <SectionForm
          title="Editar sección"
          initialValues={_.pick(
            section,
            'title',
            'content',
            'alignment_type',
            'background_type',
            'listable_bonus',
            'image_url',
            'button_label',
            'button_url'
          )}
          finishAction={onFinish}
          section={section}
          currentSite={currentSite}
        ></SectionForm>
      )}
    </PageLayout>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { section: state.sections[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchSection, editSection })(
  SectionEdit
);
