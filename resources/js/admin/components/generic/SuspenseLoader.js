import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import ContentLoader from './ContentLoader';

const SuspenseLoader = props => {
  const { promiseInProgress } = usePromiseTracker({
    area: props.area,
  });

  return promiseInProgress ? (
    props.showLoader === false ? (
      <></>
    ) : (
      props.loaderComponent || <ContentLoader />
    )
  ) : (
    props.children
  );
};

export default SuspenseLoader;
