import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { InfoCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Table, Button, Avatar } from 'antd';
import { trackPromise } from 'react-promise-tracker';

import history from '../../utils/history';
import { fetchModules } from '../../actions/moduleActions';
import AREAS from '../../utils/promiseAreas';
import SuspenseLoader from '../generic/SuspenseLoader';
import { withSite } from '../hocs/withSite';
import PageLayout from '../layout/PageLayout';

const ModuleList = ({ configs, modules, fetchModules }) => {
  const { currentSite } = configs;
  const columns = [
    {
      title: '',
      dataIndex: 'icon_url',
      key: 'icon_url',
      render: (value, record, index) => {
        return (
          <NavLink to={`/${currentSite.slug}/modules/${record.id}`}>
            <Avatar size={64} src={record.full_icon_url}></Avatar>
          </NavLink>
        );
      },
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '',
      dataIndex: 'show',
      key: 'show',
      render: (value, record, index) => {
        return (
          <Button
            onClick={() =>
              history.push(`/${currentSite.slug}/modules/${record.id}`)
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
    trackPromise(
      fetchModules({
        site_id: currentSite.id,
      }),
      AREAS.MODULE.LIST_TABLE
    );
  }, []);

  return (
    <PageLayout>
      <div className="row">
        <div className="col-lg-6 col-md-6">
          <h2>Módulos</h2>
        </div>
        <div className="col-lg-6 col-md-6">
          <Button
            type="primary"
            onClick={() => history.push(`/${currentSite.slug}/modules/create`)}
            style={{ float: 'right' }}
          >
            <PlusCircleOutlined />
            Nuevo módulo
          </Button>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <SuspenseLoader area={AREAS.MODULE.LIST_TABLE}>
            <Table dataSource={modules} columns={columns} rowKey="id" />
          </SuspenseLoader>
        </div>
      </div>
    </PageLayout>
  );
};

const mapStateToProps = state => {
  return {
    modules: Object.values(state.modules),
  };
};

export default withSite(
  connect(mapStateToProps, { fetchModules })(ModuleList),
  true
);
