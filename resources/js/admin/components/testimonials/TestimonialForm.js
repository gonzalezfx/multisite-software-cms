import React from 'react';
import { Form, Button, Input } from 'antd';

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

const SlideForm = ({
  initialValues,
  title,
  finishAction,
  testimonial,
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
            name="testimonials-form"
            onFinish={onFinish}
            validateMessages={antFormSettings.validateMessages}
            initialValues={{ ...initialValues }}
          >
            <Form.Item
              name="company_name"
              label="Empresa"
              rules={[
                {
                  max: 100,
                  whitespace: true,
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Descripción"
              rules={[
                {
                  max: 2000,
                  whitespace: true,
                  required: true,
                },
              ]}
            >
              <HtmlEditor />
            </Form.Item>
            <Form.Item
              name="logo_url"
              label="Logo"
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
                      if (testimonial) {
                        history.push(
                          `/${currentSite.slug}/testimonials/${testimonial.id}`
                        );
                      } else {
                        history.push(`/${currentSite.slug}/testimonials`);
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
