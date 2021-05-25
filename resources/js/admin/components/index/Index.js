import {
  EditOutlined,
  SettingOutlined,
  PlusCircleOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import { Card, Button, Col, Row } from 'antd';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { trackPromise } from 'react-promise-tracker';

import { fetchSites } from '../../actions/siteActions';
import PROMISE_AREAS from '../../utils/promiseAreas';
import SuspenseLoader from '../generic/SuspenseLoader';
import history from '../../utils/history';
import PageLayout from '../layout/PageLayout';
import { parentProjectURL } from '../../utils/baseData';

function ActionButtons() {
  return (
    <Button
      type="primary"
      onClick={() => history.push('/sites/create')}
      style={{ float: 'right' }}
    >
      <PlusCircleOutlined />
      Nuevo sitio
    </Button>
  );
}

const Index = ({ sites, fetchSites }) => {
  useEffect(() => {
    trackPromise(fetchSites(), PROMISE_AREAS.SITE.INDEX);
  }, []);

  const itemsPerColumn = 4;

  return (
    <PageLayout>
      <div className="row">
        <div className="col-lg-6 col-md-6">
          <h2>Sitios</h2>
        </div>
        <div className="col-lg-6 col-md-6">
          <ActionButtons />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <SuspenseLoader area={PROMISE_AREAS.SITE.INDEX}>
            {Array.from(Array(Math.ceil(sites.length / itemsPerColumn))).map(
              (number, index) => (
                <Row key={index}>
                  {sites
                    .slice(
                      0 + index * itemsPerColumn,
                      itemsPerColumn - 1 + index * itemsPerColumn
                    )
                    .map(site => (
                      <Col span={Math.ceil(24 / itemsPerColumn)} key={site.id}>
                        <Card
                          key={site.id}
                          className="m-2"
                          cover={
                            <img
                              alt={`${site.name} logo`}
                              src={site.full_logo_url}
                              className="p-4"
                              style={{
                                margin: '0 auto',
                                maxWidth: '60%',
                                maxHeight: 80,
                              }}
                            />
                          }
                          actions={[
                            <SettingOutlined
                              onClick={e => history.push(`/${site.slug}`)}
                              key="setting"
                            />,
                            <GlobalOutlined
                              onClick={e => {
                                window.open(`${parentProjectURL}/${site.slug}`);
                              }}
                              key="public-url"
                            />,
                          ]}
                        >
                          <Card.Meta
                            title={site.name}
                            className="text-center"
                          />
                        </Card>
                      </Col>
                    ))}
                </Row>
              )
            )}
          </SuspenseLoader>
        </div>
      </div>
    </PageLayout>
  );
};

const mapStateToProps = state => {
  return {
    sites: Object.values(state.sites),
  };
};

export default connect(mapStateToProps, { fetchSites })(Index);
