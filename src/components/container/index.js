import React from 'react'
import classnames from 'classnames';
import PropTypes from 'prop-types';

export default function index(props) {
  const className = classnames('d-flex justify-content-center align-items-center', props.className);
  return (
    <div className={className} style={{
      height: '100vh',
      background: '#136a8a',
      background: '-webkit-linear-gradient(to right, #267871, #136a8a)',
      background: 'linear-gradient(to right, #267871, #136a8a)',

    }}>
      {props.children}
    </div>
  )
}

index.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

index.defaultProps = {
  className: null,
  children: null,
}
