import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Popconfirm, Skeleton, Descriptions, message } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import parse from 'html-react-parser';

import { fetchSection, deleteSection } from '../../actions/sectionActions';
import history from '../../utils/history';
import PageLayout from '../layout/PageLayout';
import { StaticTypes, StaticTypesLabels } from '../../utils/baseData';

const SectionShow = ({
  configs,
  match,
  fetchSection,
  deleteSection,
  section,
}) => {
  const { currentSite } = configs;
  useEffect(() => {
    fetchSection(match.params.id);
  }, []);

  const handleDelete = id => {
    deleteSection(id)
      .then(() => {
        history.push(`/${currentSite.slug}/sections`);
      })
      .catch(() => {
        message.error('Lo sentimos, ocurrió un error al eliminar.');
      });
  };

  return (
    <PageLayout>
      {!section ? (
        <Skeleton paragraph={{ rows: 6 }} active />
      ) : (
        <>
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <h2>Sección ID-{section.id}</h2>
            </div>
            <div className="col-lg-6 col-md-6">
              <Popconfirm
                title="Seguro que desea eliminar?"
                cancelText="Cancelar"
                onConfirm={() => handleDelete(section.id)}
              >
                <Button danger className="float-right">
                  <DeleteOutlined />
                  Eliminar
                </Button>
              </Popconfirm>
              <Button
                onClick={() =>
                  history.push(
                    `/${currentSite.slug}/sections/edit/${section.id}`
                  )
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
                <Descriptions.Item label="Título" span={2}>
                  {parse(section.title)}
                </Descriptions.Item>
                <Descriptions.Item label="Contenido" span={2}>
                  {section.content && parse(section.content)}
                </Descriptions.Item>
                <Descriptions.Item label="Alineación">
                  {
                    StaticTypesLabels.SECTION.ALIGNMENT_TYPE[
                      section.alignment_type
                    ]
                  }
                </Descriptions.Item>
                <Descriptions.Item label="Color de fondo">
                  {
                    StaticTypesLabels.SECTION.BACKGROUND_TYPE[
                      section.background_type
                    ]
                  }
                </Descriptions.Item>
                <Descriptions.Item label="Características" span={2}>
                  {section.listable_bonus && (
                    <ul>
                      {section.listable_bonus.map((bonus, index) => (
                        <li key={index}>{bonus}</li>
                      ))}
                    </ul>
                  )}
                </Descriptions.Item>
                <Descriptions.Item label="Texto del botón">
                  {section.button_label}
                </Descriptions.Item>
                <Descriptions.Item label="URL del botón">
                  {section.button_url}
                </Descriptions.Item>
                <Descriptions.Item label="Imagen" span={2}>
                  <img
                    src={section.full_image_url}
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
  return { section: state.sections[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchSection, deleteSection })(
  SectionShow
);
