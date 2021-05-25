import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { InfoCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Table, Button, Avatar } from 'antd';
import { trackPromise } from 'react-promise-tracker';

import history from '../../utils/history';
import { fetchTestimonials } from '../../actions/testimonialActions';
import AREAS from '../../utils/promiseAreas';
import SuspenseLoader from '../generic/SuspenseLoader';
import { withSite } from '../hocs/withSite';
import PageLayout from '../layout/PageLayout';

const TestimonialList = ({ configs, testimonials, fetchTestimonials }) => {
  const { currentSite } = configs;
  const columns = [
    {
      title: '',
      dataIndex: 'logo_url',
      key: 'logo_url',
      render: (value, record, index) => {
        return (
          <NavLink to={`/${currentSite.slug}/testimonials/${record.id}`}>
            <Avatar size={64} src={record.full_logo_url}></Avatar>
          </NavLink>
        );
      },
    },
    {
      title: 'Empresa',
      dataIndex: 'company_name',
      key: 'company_name',
    },
    {
      title: '',
      dataIndex: 'show',
      key: 'show',
      render: (value, record, index) => {
        return (
          <Button
            onClick={() =>
              history.push(`/${currentSite.slug}/testimonials/${record.id}`)
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
      fetchTestimonials({
        site_id: currentSite.id,
      }),
      AREAS.TESTIMONIAL.LIST_TABLE
    );
  }, []);

  return (
    <PageLayout>
      <div className="row">
        <div className="col-lg-6 col-md-6">
          <h2>Testimonios</h2>
        </div>
        <div className="col-lg-6 col-md-6">
          <Button
            type="primary"
            onClick={() =>
              history.push(`/${currentSite.slug}/testimonials/create`)
            }
            style={{ float: 'right' }}
          >
            <PlusCircleOutlined />
            Nuevo testimonio
          </Button>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <SuspenseLoader area={AREAS.TESTIMONIAL.LIST_TABLE}>
            <Table dataSource={testimonials} columns={columns} rowKey="id" />
          </SuspenseLoader>
        </div>
      </div>
    </PageLayout>
  );
};

const mapStateToProps = state => {
  return {
    testimonials: Object.values(state.testimonials),
  };
};

export default withSite(
  connect(mapStateToProps, { fetchTestimonials })(TestimonialList),
  true
);
