import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Popconfirm, Skeleton, Descriptions, message } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { fetchSlide, deleteSlide } from '../../actions/slideActions';
import history from '../../utils/history';
import PageLayout from '../layout/PageLayout';

const SlideShow = ({ configs, match, fetchSlide, deleteSlide, slide }) => {
  const { currentSite } = configs;
  useEffect(() => {
    fetchSlide(match.params.id);
  }, []);

  const handleDelete = id => {
    deleteSlide(id)
      .then(() => {
        history.push(`/${currentSite.slug}/slides`);
      })
      .catch(() => {
        message.error('Lo sentimos, ocurrió un error al eliminar.');
      });
  };

  return (
    <PageLayout>
      {!slide ? (
        <Skeleton paragraph={{ rows: 6 }} active />
      ) : (
        <>
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <h2>Banner ID-{slide.id}</h2>
            </div>
            <div className="col-lg-6 col-md-6">
              <Popconfirm
                title="Seguro que desea eliminar?"
                cancelText="Cancelar"
                onConfirm={() => handleDelete(slide.id)}
              >
                <Button danger className="float-right">
                  <DeleteOutlined />
                  Eliminar
                </Button>
              </Popconfirm>
              <Button
                onClick={() =>
                  history.push(`/${currentSite.slug}/slides/edit/${slide.id}`)
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
                <Descriptions.Item label="Línea 1">
                  {slide.first_line}
                </Descriptions.Item>
                <Descriptions.Item label="Línea 2">
                  {slide.second_line}
                </Descriptions.Item>
                <Descriptions.Item label="Línea 3" span={2}>
                  {slide.third_line}
                </Descriptions.Item>
                <Descriptions.Item label="Ícono del botón">
                  <img
                    src={slide.full_button_icon_url}
                    style={{ maxWidth: 100 }}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="Texto del botón">
                  {slide.button_label}
                </Descriptions.Item>
                <Descriptions.Item label="URL del botón" span={2}>
                  {slide.button_url}
                </Descriptions.Item>
                <Descriptions.Item label="Imagen" span={2}>
                  <img
                    src={slide.full_image_url}
                    style={{ maxWidth: '100%' }}
                  />
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
  return { slide: state.slides[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchSlide, deleteSlide })(SlideShow);
