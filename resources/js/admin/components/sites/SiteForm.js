import React from 'react';
import { Form, Button, Input, Switch } from 'antd';

import history from '../../utils/history';
import { ajaxUploadURL, CSRFToken } from '../../utils/baseData';
import FileUploader from '../generic/FileUploader';
import { antFormSettings } from '../../utils/defaultConfigs';
import HtmlEditor from '../generic/HtmlEditor';

const layout = {
  layout: 'vertical',
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const SlideForm = ({ initialValues, title, finishAction, site }) => {
  const [form] = Form.useForm();

  const onFinish = values => {
    finishAction(values);
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <h2>{title}</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <Form
            {...layout}
            form={form}
            name="slides-form"
            onFinish={onFinish}
            validateMessages={antFormSettings.validateMessages}
            initialValues={{ ...initialValues }}
          >
            <Form.Item
              name="name"
              label="Nombre"
              rules={[
                {
                  max: 40,
                  whitespace: true,
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="slug"
              label="Ruta"
              extra={
                'Es el texto que se usará como parte de la URL para acceder a este sitio'
              }
              rules={[
                {
                  max: 40,
                  whitespace: true,
                  required: true,
                },
                {
                  pattern: new RegExp(/^[a-z0-9\-]+(?:-[a-z0-9\-]+)*$/),
                  message:
                    'No puede contener espacios ni caracteres especiales.',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="show_in_home"
              label="Mostrar en página principal"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Switch />
            </Form.Item>
            <Form.Item
              name="logo_url"
              label="Logo"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <FileUploader
                valueType="url-string"
                listType="picture"
                multiple={false}
                accept=".svg"
                sizeLimit={5}
                action={ajaxUploadURL}
                data={{ _token: CSRFToken }}
              />
            </Form.Item>
            {site && (
              <>
                <Form.Item
                  name="contact_email"
                  label="Correo de contacto"
                  rules={[
                    {
                      max: 60,
                      whitespace: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="software_url"
                  label="URL para acceder al sistema"
                  rules={[
                    {
                      max: 100,
                      whitespace: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="software_guides_url"
                  label="URL de manuales"
                  rules={[
                    {
                      max: 100,
                      whitespace: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <hr />
                <h3>Burbuja de Chat</h3>
                <Form.Item
                  name="chat_whatsapp"
                  label="Núero de Whatsapp para chat"
                  rules={[
                    {
                      max: 60,
                      whitespace: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="chat_facebook"
                  label="ID de facebook para chat"
                  rules={[
                    {
                      max: 60,
                      whitespace: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <hr />
                <h3>Redes sociales</h3>

                <Form.Item
                  name="facebook_url"
                  label="URL de Facebook"
                  rules={[
                    {
                      max: 60,
                      whitespace: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="linkedin_url"
                  label="URL de LinkedIn"
                  rules={[
                    {
                      max: 60,
                      whitespace: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="youtube_url"
                  label="URL de Youtube"
                  rules={[
                    {
                      max: 60,
                      whitespace: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <hr />
                <h3>Call to action</h3>

                <Form.Item
                  name="call_to_action_title"
                  label="Título"
                  rules={[
                    {
                      max: 200,
                      whitespace: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="call_to_action_text"
                  label="Contenido"
                  rules={[
                    {
                      max: 2000,
                      whitespace: true,
                    },
                  ]}
                >
                  <HtmlEditor />
                </Form.Item>
                <Form.Item
                  name="call_to_action_button_label"
                  label="Texto del botón"
                  rules={[
                    {
                      max: 40,
                      whitespace: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="call_to_action_button_url"
                  label="URL del botón"
                  rules={[
                    {
                      max: 100,
                      whitespace: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <hr />
              </>
            )}
            <Form.Item>
              <div className="row">
                <div className="col-md-4">
                  <Button
                    type="primary"
                    className="btn-block"
                    htmlType="submit"
                  >
                    Guardar
                  </Button>
                </div>
                <div className="col-md-4">
                  <Button
                    className="cancel-form btn-block"
                    htmlType="button"
                    onClick={() => {
                      if (site) {
                        history.push(`/${site.slug}/details`);
                      } else {
                        history.push(`/`);
                      }
                    }}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SlideForm;
