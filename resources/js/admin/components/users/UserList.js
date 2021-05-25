import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  PlusCircleTwoTone,
  InfoCircleTwoTone,
  AppstoreTwoTone
} from '@ant-design/icons';
import {
  Table,
  Button,
  Avatar
} from 'antd';
import { trackPromise } from 'react-promise-tracker';

import history from '../../utils/history';
import { fetchUsers } from '../../actions/userActions';
import AREAS from '../../utils/promiseAreas';
import SuspenseLoader from '../generic/SuspenseLoader';

function ActionButtons() {
  return (
    <>
      <Button type="primary" onClick={() => history.push("/users/create")}  style={{ float: "right" }}>
        <PlusCircleTwoTone />
        Nuevo administrador
      </Button>
    </>
  );
}

class UserList extends React.Component {

  constructor(props) {
    super(props);

    this.columns = [
      {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Correo',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '',
        dataIndex: 'show',
        key: 'show',
        render: (value, record, index) => {
          return (
            <Button onClick={() => history.push(`/users/${record.id}`)} className="float-right">
              <InfoCircleTwoTone />
              Detalles
            </Button>
          );
        },
      },
    ];
  }

  componentDidMount() {
    trackPromise(this.props.fetchUsers(), AREAS.USER.LIST_TABLE);
  }

  handleDelete = (id) => {
    this.props.deleteUser(id);
  }

  render() {

    const users = this.props.users;

    return (
      <>
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <h2>Administradores</h2>
          </div>
          <div className="col-lg-6 col-md-6">
            <ActionButtons />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <SuspenseLoader area={AREAS.USER.LIST_TABLE}>
              <Table
                dataSource={users}
                columns={this.columns}
                rowKey="id"
                />
            </SuspenseLoader>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: Object.values(state.users)
  };
};

export default connect(
  mapStateToProps,
  { fetchUsers }
)(UserList);
