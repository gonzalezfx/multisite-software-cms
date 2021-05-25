import { message } from 'antd';
import React from 'react';
import { connect } from 'react-redux';

import { createSite } from '../../actions/siteActions';
import history from '../../utils/history';
import PageLayout from '../layout/PageLayout';
import SlideForm from './SiteForm';

class SlideCreate extends React.Component {
  onFinish = values => {
    this.props
      .createSite(values)
      .then(() => {
        history.push('/');
      })
      .catch(error => {
        message.error('Lo sentimos ocurrió un error al guardar');
      });
  };

  render() {
    return (
      <PageLayout>
        <SlideForm
          title="Nuevo sitio"
          finishAction={this.onFinish}
          initialValues={{
            show_in_home: false,
          }}
        ></SlideForm>
      </PageLayout>
    );
  }
}

export default connect(null, { createSite })(SlideCreate);
