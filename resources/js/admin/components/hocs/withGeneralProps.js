import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { matchPath, withRouter } from 'react-router-dom';

import { setCurrentSite } from '../../actions/configsActions';
import { ROUTES } from '../../utils/routes';
import ContentLoader from '../generic/ContentLoader';

export const withGeneralProps = WrappedComponent => {
  const WithGeneralPropsWrapper = ({ ...props }) => {
    const [validationFinalized, setValidationFinalized] = useState(false);
    const siteRouteMatch = matchPath(
      props.location.pathname,
      ROUTES.SITE_ADMIN.path
    );
    const siteRouteParams = siteRouteMatch ? siteRouteMatch.params : {};

    useEffect(() => {
      props
        .setCurrentSite(siteRouteParams.currentSite)
        .then(() => {
          setValidationFinalized(true);
        })
        .catch(() => {});
    }, []);

    return !validationFinalized ? (
      <ContentLoader />
    ) : (
      <WrappedComponent {...props} />
    );
  };

  const mapStateToProps = state => {
    return {
      configs: state.configs,
    };
  };

  return connect(mapStateToProps, { setCurrentSite })(
    withRouter(WithGeneralPropsWrapper)
  );
};
