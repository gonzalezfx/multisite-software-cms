import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { matchPath } from 'react-router-dom';
import { trackPromise } from 'react-promise-tracker';

import { ROUTES } from '../../utils/routes';
import { setCurrentSite } from '../../actions/configsActions';
import PROMISE_AREAS from '../../utils/promiseAreas';
import SuspenseLoader from '../generic/SuspenseLoader';
import NotFound from '../index/NotFound';
import ContentLoader from '../generic/ContentLoader';

/**
 * Require the component to show only if there is an active site throught path.
 */
export const withSite = (WrappedComponent, showError = true) => {
  const WithSiteWrapper = props => {
    return props.configs.currentSite ? (
      <WrappedComponent {...props} />
    ) : showError ? (
      <NotFound />
    ) : (
      <></>
    );
  };

  const mapStateToProps = state => {
    return {
      configs: state.configs,
    };
  };

  return connect(mapStateToProps, { setCurrentSite })(WithSiteWrapper);
};
