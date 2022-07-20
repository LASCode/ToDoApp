import './TaskPreloader.scss';
import React from 'react';
import ContentLoader from 'react-content-loader';

const TaskPreloader = () => {
  return (
    <div className='TaskPreloader'>
      <ContentLoader viewBox="0 0 565 132" backgroundColor="#f3f3f3" foregroundColor="#ecebeb" width='100%'>
        <rect x="0" y="0" rx="5" ry="5" width="565" height="132" />
      </ContentLoader>
    </div>
  );
};

export { TaskPreloader };
