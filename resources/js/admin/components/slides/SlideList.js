import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { InfoCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Table, Button, Avatar } from 'antd';
import { trackPromise } from 'react-promise-tracker';

import history from '../../utils/history';
import { fetchSlides } from '../../actions/slideActions';
import AREAS from '../../utils/promiseAreas';
import SuspenseLoader from '../generic/SuspenseLoader';
import { withSite } from '../hocs/withSite';
import PageLayout from '../layout/PageLayout';

const SlideList = ({ configs, slides, fetchSlides, deleteSlide, location }) => {
  const { currentSite } = configs;
  const columns = [
    {
      title: '',
      dataIndex: 'image_url',
      key: 'image_url',
      render: (value, record, index) => {
        return (
          <NavLink to={`/${currentSite.slug}/slides/${record.id}`}>
            <Avatar size={64} src={record.full_image_url}></Avatar>
          </NavLink>
        );
      },
    },
    {
      title: 'Linea 1',
      dataIndex: 'first_line',
      key: 'first_line',
    },
    {
      title: 'Linea 2',
      dataIndex: 'second_line',
      key: 'second_line',
    },
    {
      title: '',
      dataIndex: 'show',
      key: 'show',
      render: (value, record, index) => {
        return (
          <Button
            onClick={() =>
              history.push(`/${currentSite.slug}/slides/${record.id}`)
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
      fetchSlides({
        site_id: currentSite.id,
      }),
      AREAS.SLIDE.LIST_TABLE
    );
  }, []);

  return (
    <PageLayout>
      <div className="row">
        <div className="col-lg-6 col-md-6">
          <h2>Banners</h2>
        </div>
        <div className="col-lg-6 col-md-6">
          <Button
            type="primary"
            onClick={() => history.push(`/${currentSite.slug}/slides/create`)}
            style={{ float: 'right' }}
          >
            <PlusCircleOutlined />
            Nuevo banner
          </Button>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <SuspenseLoader area={AREAS.SLIDE.LIST_TABLE}>
            <Table dataSource={slides} columns={columns} rowKey="id" />
          </SuspenseLoader>
        </div>
      </div>
    </PageLayout>
  );
};

const mapStateToProps = state => {
  return {
    slides: Object.values(state.slides),
  };
};

export default withSite(
  connect(mapStateToProps, { fetchSlides })(SlideList),
  true
);
