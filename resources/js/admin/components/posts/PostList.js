import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { InfoCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Table, Button, Avatar } from 'antd';
import { trackPromise } from 'react-promise-tracker';

import history from '../../utils/history';
import { fetchPosts } from '../../actions/postActions';
import AREAS from '../../utils/promiseAreas';
import SuspenseLoader from '../generic/SuspenseLoader';
import { withSite } from '../hocs/withSite';
import PageLayout from '../layout/PageLayout';

const PostList = ({ configs, posts, fetchPosts }) => {
  const { currentSite } = configs;
  const columns = [
    {
      title: '',
      dataIndex: 'image_url',
      key: 'image_url',
      render: (value, record, index) => {
        return (
          <NavLink to={`/${currentSite.slug}/posts/${record.id}`}>
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
      title: 'Autor',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: '',
      dataIndex: 'show',
      key: 'show',
      render: (value, record, index) => {
        return (
          <Button
            onClick={() =>
              history.push(`/${currentSite.slug}/posts/${record.id}`)
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
      fetchPosts({
        site_id: currentSite.id,
      }),
      AREAS.POST.LIST_TABLE
    );
  }, []);

  return (
    <PageLayout>
      <div className="row">
        <div className="col-lg-6 col-md-6">
          <h2>Entradas del blog</h2>
        </div>
        <div className="col-lg-6 col-md-6">
          <Button
            type="primary"
            onClick={() => history.push(`/${currentSite.slug}/posts/create`)}
            style={{ float: 'right' }}
          >
            <PlusCircleOutlined />
            Nueva entrada
          </Button>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <SuspenseLoader area={AREAS.POST.LIST_TABLE}>
            <Table dataSource={posts} columns={columns} rowKey="id" />
          </SuspenseLoader>
        </div>
      </div>
    </PageLayout>
  );
};

const mapStateToProps = state => {
  return {
    posts: Object.values(state.posts),
  };
};

export default withSite(
  connect(mapStateToProps, { fetchPosts })(PostList),
  true
);
