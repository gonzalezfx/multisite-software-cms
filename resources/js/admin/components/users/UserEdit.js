import React from 'react';
import { connect } from 'react-redux';
import { Skeleton } from 'antd';
import _ from 'lodash';

import { fetchUser, editUser } from '../../actions/userActions';
import history from '../../utils/history';
import UserForm from './UserForm';

class UserEdit extends React.Component {
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.id);
  }

  onFinish = values => {
    const { id } = this.props.match.params;
    this.props.editUser(id, values).then(() => {
      history.push(`/users/${id}`);
    });
  };

  render() {
    if (!this.props.user) {
      return <Skeleton active />;
    }

    return (
      <UserForm
        title="Editar administrador"
        initialValues={_.pick(this.props.user, 'name', 'email')}
        finishAction={this.onFinish}
        user={this.props.user}
      ></UserForm>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { user: state.users[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchUser, editUser })(UserEdit);
