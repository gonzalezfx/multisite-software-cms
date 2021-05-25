import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Input, Select } from 'antd';

import history from '../../utils/history';
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

const UserForm = ({ initialValues, title, finishAction, user }) => {
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
            name="users-form"
            onFinish={onFinish}
            validateMessages={antFormSettings.validateMessages}
            initialValues={{ ...initialValues }}
          >
            <Form.Item
              name="name"
              label="Nombre"
              rules={[
                {
                  required: true,
                  max: 50,
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Correo"
              rules={[
                {
                  required: true,
                  max: 50,
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label={user ? 'Actualizar contraseña' : 'Contraseña'}
              rules={[
                {
                  required: user ? false : true,
                  min: 5,
                  max: 20,
                  whitespace: true,
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="password_confirmation"
              label="Confirmar contraseña"
              dependencies={['password']}
              rules={[
                {
                  required: user ? false : true,
                  whitespace: true,
                  message: 'Es necesario confirmar la contraseña',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (
                      !getFieldValue('password') ||
                      getFieldValue('password') === value
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      'Las dos contraseñas ingresadas no coinciden'
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Guardar
              </Button>
              <Button
                className="cancel-form"
                htmlType="button"
                onClick={() => {
                  if (user) {
                    history.push(`/users/${user.id}`);
                  } else {
                    history.push('/users');
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

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {})(UserForm);
