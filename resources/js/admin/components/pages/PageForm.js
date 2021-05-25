import React from 'react';
import { Form, Button, Input, InputNumber } from 'antd';

import history from '../../utils/history';
import { ajaxUploadURL, CSRFToken } from '../../utils/baseData';
import { antFormSettings } from '../../utils/defaultConfigs';
import FileUploader from '../generic/FileUploader';
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

const PageForm = ({
  initialValues,
  title,
  finishAction,
  page,
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
            name="pages-form"
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
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="introduction"
              label="Introducción"
              rules={[
                {
                  whitespace: true,
                },
              ]}
            >
              <HtmlEditor />
            </Form.Item>
            <Form.Item
              name="content"
              label="Contenido"
              rules={[
                {
                  whitespace: true,
                },
              ]}
            >
              <HtmlEditor />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Guardar
              </Button>
              <Button
                className="cancel-form"
                htmlType="button"
                onClick={() => {
                  if (page) {
                    history.push(`/${currentSite.slug}/pages/${page.id}`);
                  } else {
                    history.push('/${currentSite.slug}/pages');
                  }
                }}
              >
                Cancelar
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default PageForm;
