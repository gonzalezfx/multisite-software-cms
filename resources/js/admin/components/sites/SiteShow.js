import React from 'react';
import { Button, Descriptions } from 'antd';
import parse from 'html-react-parser';

import history from '../../utils/history';
import PageLayout from '../layout/PageLayout';
import { withSite } from '../hocs/withSite';
import { EditOutlined } from '@ant-design/icons';

const SiteShow = ({ configs, match }) => {
  const { currentSite } = configs;

  return (
    <PageLayout>
      <div className="row">
        <div className="col-lg-6 col-md-6">
          <h2>Configuración</h2>
        </div>
        <div className="col-lg-6 col-md-6">
          <>
            <Button
              type="primary"
              onClick={() => history.push(`/${match.params.currentSite}/edit`)}
              style={{ float: 'right' }}
            >
              <EditOutlined />
              Editar
            </Button>
          </>
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
            <Descriptions.Item label="Nombre">
              {currentSite.name}
            </Descriptions.Item>
            <Descriptions.Item label="Ruta">
              {currentSite.slug}
            </Descriptions.Item>
            <Descriptions.Item label="Mostrar en página principal" span={2}>
              {currentSite.show_in_home ? 'Si' : 'No'}
            </Descriptions.Item>
            <Descriptions.Item label="Logo">
              {currentSite.logo_url && (
                <img
                  src={currentSite.full_logo_url}
                  style={{ maxWidth: '100%' }}
                />
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Correo de contacto">
              {currentSite.contact_email}
            </Descriptions.Item>
            <Descriptions.Item label="URL para acceder al sistema">
              {currentSite.software_url}
            </Descriptions.Item>
            <Descriptions.Item label="URL de manuales">
              {currentSite.software_guides_url}
            </Descriptions.Item>
          </Descriptions>

          <h3 className="mt-4">Burbuja de chat</h3>

          <Descriptions
            layout="vertical"
            column={2}
            bordered
            style={{ backgroundColor: 'white' }}
          >
            <Descriptions.Item label="Núero de Whatsapp para chat">
              {currentSite.chat_whatsapp}
            </Descriptions.Item>
            <Descriptions.Item label="ID de facebook para chat">
              {currentSite.chat_facebook}
            </Descriptions.Item>
          </Descriptions>

          <h3 className="mt-4">Redes sociales</h3>

          <Descriptions
            layout="vertical"
            column={2}
            bordered
            style={{ backgroundColor: 'white' }}
          >
            <Descriptions.Item label="URL de Facebook">
              {currentSite.facebook_url}
            </Descriptions.Item>
            <Descriptions.Item label="URL de LinkedIn">
              {currentSite.linkedin_url}
            </Descriptions.Item>
            <Descriptions.Item label="URL de Youtube">
              {currentSite.youtube_url}
            </Descriptions.Item>
          </Descriptions>

          <h3 className="mt-4">Call to action</h3>

          <Descriptions
            layout="vertical"
            column={2}
            bordered
            style={{ backgroundColor: 'white' }}
          >
            <Descriptions.Item label="Título" span={2}>
              {currentSite.call_to_action_title}
            </Descriptions.Item>
            <Descriptions.Item label="Contenido" span={2}>
              {currentSite.call_to_action_text &&
                parse(currentSite.call_to_action_text)}
            </Descriptions.Item>
            <Descriptions.Item label="Texto del botón">
              {currentSite.call_to_action_button_label}
            </Descriptions.Item>
            <Descriptions.Item label="URL del botón">
              {currentSite.call_to_action_button_url}
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>
    </PageLayout>
  );
};

export default withSite(SiteShow);
