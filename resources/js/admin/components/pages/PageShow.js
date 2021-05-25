import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Popconfirm, Skeleton, Descriptions } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import parse from 'html-react-parser';

import { fetchPage } from '../../actions/pageActions';
import history from '../../utils/history';
import PageLayout from '../layout/PageLayout';

const PageShow = ({ configs, match, fetchPage, page }) => {
  const { currentSite } = configs;

  useEffect(() => {
    fetchPage(match.params.id);
  }, []);

  return (
    <PageLayout>
      {!page ? (
        <Skeleton paragraph={{ rows: 6 }} active />
      ) : (
        <>
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <h2>{page.title}</h2>
            </div>
            <div className="col-lg-6 col-md-6">
              <Button
                onClick={() =>
                  history.push(`/${currentSite.slug}/pages/edit/${page.id}`)
                }
                style={{ marginRight: '10px' }}
                className="float-right"
              >
                <EditOutlined />
                Editar
              </Button>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <Descriptions
                layout="vertical"
                column={2}
                bordered
                style={{ backgroundColor: 'white' }}
              >
                <Descriptions.Item label="Introducción" span={2}>
                  {page.introduction && parse(page.introduction)}
                </Descriptions.Item>
                <Descriptions.Item label="Contenido" span={2}>
                  {page.content && parse(page.content)}
                </Descriptions.Item>
              </Descriptions>
            </div>
          </div>
        </>
      )}
    </PageLayout>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { page: state.pages[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchPage })(PageShow);
