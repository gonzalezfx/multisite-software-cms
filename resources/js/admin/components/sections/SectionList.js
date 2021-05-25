import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { InfoCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Table, Button, Avatar } from 'antd';
import { trackPromise } from 'react-promise-tracker';

import history from '../../utils/history';
import { fetchSections } from '../../actions/sectionActions';
import AREAS from '../../utils/promiseAreas';
import SuspenseLoader from '../generic/SuspenseLoader';
import { withSite } from '../hocs/withSite';
import PageLayout from '../layout/PageLayout';
import { StaticTypesLabels } from '../../utils/baseData';

const SectionList = ({ configs, sections, fetchSections }) => {
  const { currentSite } = configs;
  const columns = [
    {
      title: '',
      dataIndex: 'image_url',
      key: 'image_url',
      render: (value, record, index) => {
        return (
          <NavLink to={`/${currentSite.slug}/sections/${record.id}`}>
            <Avatar size={64} src={record.full_image_url}></Avatar>
          </NavLink>
        );
      },
    },
    {
      title: 'Título',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Alineación',
      dataIndex: 'alignment_type',
      key: 'alignment_type',
      render: (value, record, index) =>
        StaticTypesLabels.SECTION.ALIGNMENT_TYPE[value],
    },
    {
      title: '',
      dataIndex: 'show',
      key: 'show',
      render: (value, record, index) => {
        return (
          <Button
            onClick={() =>
              history.push(`/${currentSite.slug}/sections/${record.id}`)
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
      fetchSections({
        site_id: currentSite.id,
      }),
      AREAS.SECTION.LIST_TABLE
    );
  }, []);

  return (
    <PageLayout>
      <div className="row">
        <div className="col-lg-6 col-md-6">
          <h2>Secciones</h2>
        </div>
        <div className="col-lg-6 col-md-6">
          <Button
            type="primary"
            onClick={() => history.push(`/${currentSite.slug}/sections/create`)}
            style={{ float: 'right' }}
          >
            <PlusCircleOutlined />
            Nueva sección
          </Button>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <SuspenseLoader area={AREAS.SECTION.LIST_TABLE}>
            <Table dataSource={sections} columns={columns} rowKey="id" />
          </SuspenseLoader>
        </div>
      </div>
    </PageLayout>
  );
};

const mapStateToProps = state => {
  return {
    sections: Object.values(state.sections),
  };
};

export default withSite(
  connect(mapStateToProps, { fetchSections })(SectionList),
  true
);
