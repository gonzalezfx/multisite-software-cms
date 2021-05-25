import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Popconfirm, Skeleton, Descriptions, message } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import parse from 'html-react-parser';

import { fetchModule, deleteModule } from '../../actions/moduleActions';
import history from '../../utils/history';
import PageLayout from '../layout/PageLayout';

const ModuleShow = ({ configs, match, fetchModule, module }) => {
  const { currentSite } = configs;
  useEffect(() => {
    fetchModule(match.params.id);
  }, []);

  const handleDelete = id => {
    deleteModule(id)
      .then(() => {
        history.push(`/${currentSite.slug}/modules`);
      })
      .catch(() => {
        message.error('Lo sentimos, ocurrió un error al eliminar.');
      });
  };

  return (
    <PageLayout>
      {!module ? (
        <Skeleton paragraph={{ rows: 6 }} active />
      ) : (
        <>
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <h2>Módulo ID-{module.id}</h2>
            </div>
            <div className="col-lg-6 col-md-6">
              <Popconfirm
                title="Seguro que desea eliminar?"
                cancelText="Cancelar"
                onConfirm={() => handleDelete(module.id)}
              >
                <Button danger className="float-right">
                  <DeleteOutlined />
                  Eliminar
                </Button>
              </Popconfirm>
              <Button
                onClick={() =>
                  history.push(`/${currentSite.slug}/modules/edit/${module.id}`)
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
                <Descriptions.Item label="Ícono">
                  <img
                    src={module.full_icon_url}
                    style={{ maxWidth: '100%' }}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="Nombre">
                  {module.name}
                </Descriptions.Item>
                <Descriptions.Item label="Contenido" span={2}>
                  {module.content && parse(module.content)}
                </Descriptions.Item>
                <Descriptions.Item label="Características" span={2}>
                  {module.listable_bonus && (
                    <ul>
                      {module.listable_bonus.map((bonus, index) => (
                        <li key={index}>{bonus}</li>
                      ))}
                    </ul>
                  )}
                </Descriptions.Item>
                <Descriptions.Item label="Imagen" span={2}>
                  <img
                    src={module.full_image_url}
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
  return { module: state.modules[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchModule, deleteModule })(
  ModuleShow
);
