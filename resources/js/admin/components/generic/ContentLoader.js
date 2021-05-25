import React from 'react';

const LoaderIcon = props => {
  return (
    <div className="loader-ellipsis" {...props}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

const ContentLoader = () => {
  return (
    <div className="page-content-loader">
      <LoaderIcon />
    </div>
  );
};

export default ContentLoader;
