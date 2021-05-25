import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Table, Button, Avatar } from 'antd';
import { trackPromise } from 'react-promise-tracker';

import history from '../../utils/history';
import { fetchPages } from '../../actions/pageActions';
import AREAS from '../../utils/promiseAreas';
import SuspenseLoader from '../generic/SuspenseLoader';
import PageLayout from '../layout/PageLayout';

const PageList = ({ configs, fetchPages, pages }) => {
  const { currentSite } = configs;
  const columns = [
    {
      title: 'Página',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '',
      dataIndex: 'show',
      key: 'show',
      render: (value, record, index) => {
        return (
          <Button
            onClick={() =>
              history.push(`/${currentSite.slug}/pages/${record.id}`)
            }
            className="float-right"
          >
            <InfoCircleOutlined />
            Detalles
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    trackPromise(fetchPages(), AREAS.PAGE.LIST_TABLE);
  }, []);

  return (
    <PageLayout>
      <div className="row">
        <div className="col-lg-6 col-md-6">
          <h2>Páginas</h2>
        </div>
        <div className="col-lg-6 col-md-6"></div>
      </div>
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <SuspenseLoader area={AREAS.PAGE.LIST_TABLE}>
            <Table dataSource={pages} columns={columns} rowKey="id" />
          </SuspenseLoader>
        </div>
      </div>
    </PageLayout>
  );
};

const mapStateToProps = state => {
  return {
    pages: Object.values(state.pages),
  };
};

export default connect(mapStateToProps, { fetchPages })(PageList);
