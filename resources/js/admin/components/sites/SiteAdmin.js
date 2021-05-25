import React from 'react';
import { connect } from 'react-redux';

import { fetchSite } from '../../actions/siteActions';
import { Redirect } from 'react-router';
import { withSite } from '../hocs/withSite';

const SiteAdmin = ({ match }) => {
  return <Redirect to={`${match.params.currentSite}/details`} />;
};

const mapStateToProps = (state, ownProps) => {
  return {};
};

export default withSite(connect(mapStateToProps, null)(SiteAdmin));
