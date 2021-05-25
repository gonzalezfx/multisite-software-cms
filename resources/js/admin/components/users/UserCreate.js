import React from 'react';
import { connect } from 'react-redux';

import { createUser } from '../../actions/userActions';
import UserForm from './UserForm';

class UserCreate extends React.Component {

  onFinish = (values) => {
    this.props.createUser(values);
  };

  render () {

    return (
      <UserForm title="Nuevo administrador" finishAction={this.onFinish}></UserForm>
    );
  }
};

export default connect(
  null,
  { createUser }
)(UserCreate);
