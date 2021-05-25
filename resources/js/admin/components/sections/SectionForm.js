import React, { useEffect, useState } from 'react';
import { Form, Button, Input, Select, Row, Col } from 'antd';

import history from '../../utils/history';
import {
  ajaxUploadURL,
  CSRFToken,
  StaticTypes,
  StaticTypesLabels,
} from '../../utils/baseData';
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
  section,
  currentSite,
}) => {
  const [form] = Form.useForm();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      listable_bonus: form.getFieldValue('listable_bonus') ?? [],
    });
    setInitialized(true);
  }, []);

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
            name="sections-form"
            onFinish={onFinish}
            validateMessages={antFormSettings.validateMessages}
            initialValues={{ ...initialValues }}
          >
            <Form.Item
              name="title"
              label="Título"
              rules={[
                {
                  max: 100,
                  whitespace: true,
                  required: true,
                  message: 'Ha superado el límite de contenido',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="content" label="Contenido">
              <HtmlEditor />
            </Form.Item>
            <Form.Item
              name="alignment_type"
              label="Alineación"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select>
                {[
                  StaticTypes.SECTION.ALIGNMENT_TYPE_LEFT,
                  StaticTypes.SECTION.ALIGNMENT_TYPE_CENTER,
                  StaticTypes.SECTION.ALIGNMENT_TYPE_RIGHT,
                ].map(alignmentType => (
                  <Select.Option value={alignmentType} key={alignmentType}>
                    {StaticTypesLabels.SECTION.ALIGNMENT_TYPE[alignmentType]}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="background_type"
              label="Color de fondo"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select>
                {[
                  StaticTypes.SECTION.BACKGROUND_TYPE_WHITE,
                  StaticTypes.SECTION.BACKGROUND_TYPE_SOFT_GRAY,
                  StaticTypes.SECTION.BACKGROUND_TYPE_BRAND_COLOR,
                ].map(backgroundType => (
                  <Select.Option value={backgroundType} key={backgroundType}>
                    {StaticTypesLabels.SECTION.BACKGROUND_TYPE[backgroundType]}
                  </Select.Option>
                ))}
              </Select>
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
              name="button_label"
              label="Texto del botón"
              rules={[
                {
                  max: 300,
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="button_url"
              label="URL del botón"
              rules={[
                {
                  max: 300,
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="image_url" label="Imagen">
              <FileUploader
                valueType="url-string"
                listType="picture"
                multiple={false}
                accept=".jpg,.png,.gif,.svg"
                sizeLimit={5}
                action={ajaxUploadURL}
                data={{ _token: CSRFToken }}
              />
            </Form.Item>
            <Form.Item className="mt-2">
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
                      if (section) {
                        history.push(
                          `/${currentSite.slug}/sections/${section.id}`
                        );
                      } else {
                        history.push(`/${currentSite.slug}/sections`);
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
