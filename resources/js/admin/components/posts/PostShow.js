import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Popconfirm, Skeleton, Descriptions, message } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import parse from 'html-react-parser';

import { fetchPost, deletePost } from '../../actions/postActions';
import history from '../../utils/history';
import PageLayout from '../layout/PageLayout';

const PostShow = ({ configs, match, fetchPost, deletePost, post }) => {
  const { currentSite } = configs;
  useEffect(() => {
    fetchPost(match.params.id);
  }, []);

  const handleDelete = id => {
    deletePost(id)
      .then(() => {
        history.push(`/${currentSite.slug}/posts`);
      })
      .catch(() => {
        message.error('Lo sentimos, ocurrió un error al eliminar.');
      });
  };

  return (
    <PageLayout>
      {!post ? (
        <Skeleton paragraph={{ rows: 6 }} active />
      ) : (
        <>
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <h2>Entrada ID-{post.id}</h2>
            </div>
            <div className="col-lg-6 col-md-6">
              <Popconfirm
                title="Seguro que desea eliminar?"
                cancelText="Cancelar"
                onConfirm={() => handleDelete(post.id)}
              >
                <Button danger className="float-right">
                  <DeleteOutlined />
                  Eliminar
                </Button>
              </Popconfirm>
              <Button
                onClick={() =>
                  history.push(`/${currentSite.slug}/posts/edit/${post.id}`)
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
                <Descriptions.Item label="Título">
                  {post.title}
                </Descriptions.Item>
                <Descriptions.Item label="Autor">
                  {post.author}
                </Descriptions.Item>
                <Descriptions.Item label="Introducción" span={2}>
                  {post.introduction}
                </Descriptions.Item>
                <Descriptions.Item label="Contenido" span={2}>
                  {parse(post.content)}
                </Descriptions.Item>
                <Descriptions.Item label="Imagen" span={2}>
                  <img src={post.full_image_url} style={{ maxWidth: '100%' }} />
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
  return { post: state.posts[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchPost, deletePost })(PostShow);
