import React from 'react';
import '../css/Spinner.scss';

export const Spinner: React.SFC = () => {
  return (
    <div className="spinner">
      <div className="innerSpinner" />
    </div>
  );
};
