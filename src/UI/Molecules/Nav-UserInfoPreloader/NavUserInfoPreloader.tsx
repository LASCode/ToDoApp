import './NavUserInfoPreloader.scss';
import React from 'react';
import ContentLoader from 'react-content-loader';

const NavUserInfoPreloader = () => {
  return (
    <ContentLoader viewBox="0 0 150 35" backgroundColor='#C4C4C4FF' foregroundColor='#e0e0e0'>
      <rect x="0" y="0" rx="5" ry="5" width="35" height="35" />
      <rect x="40" y="5" rx="4" ry="4" width="100" height="10" />
      <rect x="40" y="20" rx="3" ry="3" width="60" height="7" />
    </ContentLoader>
  );
};

export { NavUserInfoPreloader };
