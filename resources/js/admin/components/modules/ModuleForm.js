import React from 'react';
import { Form, Button, Input, Row, Col } from 'antd';

import history from '../../utils/history';
import { ajaxUploadURL, CSRFToken } from '../../utils/baseData';
import FileUploader from '../generic/FileUploader';
import { antFormSettings } from '../../utils/defaultConfigs';
import HtmlEditor from '../generic/HtmlEditor';
import { CloseOutlined, PlusCircleOutlined } from '@ant-design/icons';

const layout = {
  layout: 'vertical',
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const SlideForm = ({
  initialValues,
  title,
  finishAction,
  module,
  currentSite,
}) => {
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
            name="modules-form"
            onFinish={onFinish}
            validateMessages={antFormSettings.validateMessages}
            initialValues={{ ...initialValues }}
          >
            <Form.Item
              name="name"
              label="Nombre"
              rules={[
                {
                  max: 100,
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="content" label="Contenido">
              <HtmlEditor />
            </Form.Item>
            <Form.Item
              className="listable-bonus-field"
              label="Características"
              required={false}
            >
              <Form.List name="listable_bonus">
                {(fields, { add, remove }, meta) => (
                  <div className="editable-inputs-list">
                    {fields.map(field => (
                      <Row key={field.fieldKey}>
                        <Col span={24}>
                          <Form.Item
                            {...field}
                            rules={[
                              {
                                max: 300,
                                whitespace: true,
                                required: true,
                                message: `Característica ${field.name +
                                  1} no puede ser vacío`,
                              },
                            ]}
                            className="float-left"
                          >
                            <Input
                              placeholder={`Característica ${field.name + 1}`}
                            />
                          </Form.Item>
                          <Button
                            size="small"
                            className="float-left ml-2 mt-1"
                            onClick={e => remove(field.name)}
                          >
                            <CloseOutlined />
                          </Button>
                        </Col>
                      </Row>
                    ))}
                    {meta && meta.errors && <Form.ErrorList errors={errors} />}
                    <Row>
                      <Col span={24}>
                        <Button onClick={e => add()}>
                          <PlusCircleOutlined />
                          Agregar nueva
                        </Button>
                      </Col>
                    </Row>
                  </div>
                )}
              </Form.List>
            </Form.Item>
            <Form.Item
              name="icon_url"
              label="Ícono"
              rules={[
                {
                  required: true,
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
            <Form.Item
              name="image_url"
              label="Imagen"
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
                      if (module) {
                        history.push(
                          `/${currentSite.slug}/modules/${module.id}`
                        );
                      } else {
                        history.push(`/${currentSite.slug}/modules`);
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
