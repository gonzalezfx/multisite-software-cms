import React from 'react';
import { Form, Button, Input } from 'antd';

import history from '../../utils/history';
import { ajaxUploadURL, CSRFToken } from '../../utils/baseData';
import FileUploader from '../generic/FileUploader';
import { antFormSettings } from '../../utils/defaultConfigs';

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
  slide,
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
            name="slides-form"
            onFinish={onFinish}
            validateMessages={antFormSettings.validateMessages}
            initialValues={{ ...initialValues }}
          >
            <Form.Item
              name="first_line"
              label="Línea 1"
              rules={[
                {
                  max: 1000,
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="second_line"
              label="Línea 2"
              rules={[
                {
                  max: 1000,
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="third_line"
              label="Línea 3"
              rules={[
                {
                  max: 1000,
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="button_icon_url"
              label="Ícono del botón"
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
            <Form.Item
              name="image_url"
              label="Imagen"
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
                accept=".jpg,.png,.gif,.svg"
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
                      if (slide) {
                        history.push(`/${currentSite.slug}/slides/${slide.id}`);
                      } else {
                        history.push(`/${currentSite.slug}/slides`);
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
