import React from 'react';

const Loader = React.memo(({text = 'Loading...', size = 'medium'}) => {
  const sizeClasses = {
    large: 'loader-large',
    medium: 'loader-medium',
    small: 'loader-small',
  };

  return (
    <div className={`loader-container ${sizeClasses[size] ? 'loads' : ''}`}>
      <div className={`loader ${sizeClasses[size]}`} />
      {text && <p>{text}</p>}
    </div>
  );
});

export default Loader;
