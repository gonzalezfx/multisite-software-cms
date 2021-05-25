import React, { Children, cloneElement, useEffect, useState } from 'react';
import { Router, Route, Switch, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { RollbackOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { trackPromise } from 'react-promise-tracker';
import { matchPath } from 'react-router-dom';

import history from '../../utils/history';
import Sidebar from './Sidebar';
import { ROUTES } from './../../utils/routes';
import SuspenseLoader from '../generic/SuspenseLoader';
import PROMISE_AREAS from '../../utils/promiseAreas';
import { setCurrentSite } from '../../actions/configsActions';

const PageLayout = ({ children, configs }) => {
  return (
    <SuspenseLoader area={PROMISE_AREAS.CONFIGS.CURRENT_SITE}>
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-3" hidden={!configs.currentSite}>
            <NavLink to="/">
              <Button type="dark-gray" className="mb-1 btn-block ">
                <RollbackOutlined />
                Listado de sitios
              </Button>
            </NavLink>
            <Sidebar />
          </div>
          <div
            className={`col-lg-${configs.currentSite ? '9' : '12'} col-md-${
              configs.currentSite ? '9' : '12'
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </SuspenseLoader>
  );
};

const mapStateToProps = state => {
  return {
    configs: state.configs,
  };
};

export default connect(mapStateToProps, null)(PageLayout);
