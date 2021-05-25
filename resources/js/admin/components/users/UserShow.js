import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Popconfirm,
  Skeleton,
  Descriptions,
  Modal,
  Card
} from 'antd';
import { DeleteOutlined, EditTwoTone, EyeTwoTone } from '@ant-design/icons';

import { fetchUser, deleteUser } from '../../actions/userActions';
import history from '../../utils/history';

const PropertyCover = ({ property }) => {
  const imagesKeys = Object.keys(property.images);
  const firstImageUrl = imagesKeys.length && property.images[imagesKeys[0]].full_image_url;

  return <img src={firstImageUrl} />
}

class UserShow extends React.Component {

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.id);
  }

  handleDelete = (user) => {
    if (Object.keys(this.props.users).length < 2) {
      Modal.error({
        title: 'Acción inválida',
        content: 'No es posibile eliminar el último administrador ya que no sería posible volver a ingresar al panel.',
        onOk() {},
      });
    } else {
      this.props.deleteUser(user.id);
    }
  };

  render() {

    const { user } = this.props;

    if (!user) {
      return <Skeleton paragraph={{ rows: 6 }} active />;
    }

    return (
      <>
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <h2>{user.name}</h2>
          </div>
          <div className="col-lg-6 col-md-6">
            <Popconfirm
              title="Seguro que desea eliminar?"
              cancelText="Cancelar"
              onConfirm={() => this.handleDelete(user)}
            >
              <Button danger className="float-right">
                <DeleteOutlined />
                Eliminar
              </Button>
            </Popconfirm>
            <Button
              onClick={() => history.push(`/users/edit/${user.id}`)}
              style={{ marginRight: '10px' }}
              className="float-right"
            >
              <EditTwoTone />
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
              style={{ backgroundColor: "white"}}
            >
              <Descriptions.Item label="Nombre">{user.name}</Descriptions.Item>
              <Descriptions.Item label="Correo">{user.email}</Descriptions.Item>
            </Descriptions>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.users[ownProps.match.params.id],
    users: state.users,
  };
}

export default connect(
  mapStateToProps,
  { fetchUser, deleteUser }
)(UserShow);
