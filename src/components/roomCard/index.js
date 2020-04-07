import React from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Media } from 'reactstrap';

export default function index(props) {
  const outerClassName = classnames('list-group-item list-group-item-action text-white rounded-0', {
    active: props.active,
  });
  const messageClassName = classnames('font-italic mb-0 text-small', {
    'text-muted': !props.active,
  });

  return (
    <a className={outerClassName}>
      <Media className="media">
        <img src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg" alt="user" width="50" className="rounded-circle" />
        <Media body className="ml-4">
          <div className="d-flex align-items-center justify-content-between mb-1">
            <h6 className={classnames('mb-0', {
              'text-muted': !props.active,
              'text-white': props.active,
            })}>{props.name}</h6>
            <small className={classnames('small font-weight-bold', {
              'text-muted': !props.active,
            })}>{props.date}</small>
          </div>
          <p className={messageClassName} style={{
            lineHeight: '1.5em',
            height: '3em',
            overflow: 'hidden',
            whiteSpace: 'wrap',
            textOverflow: 'ellipsis',
            width: '100%',
          }}>{props.message}</p>
        </Media>
      </Media>
    </a>
  )
}

index.propTypes = {
  active: PropTypes.bool,
  name: PropTypes.string,
  message: PropTypes.string,
  date: PropTypes.string,
};

index.defaultProps = {
  active: false,
  name: null,
  message: null,
  date: null,
}
