import React from 'react'
import PropTypes from 'prop-types';
import { Media } from 'reactstrap';

export default function index(props) {
  return props.mine ? (
    <Media className="media w-50 ml-auto mb-3">
      <Media body>
        <div className="bg-primary rounded py-2 px-3 mb-2">
          <p className="text-small mb-0 text-white">{props.message}</p>
        </div>
        <p className="small text-muted text-right">{props.date}</p>
      </Media>
    </Media>
  ) : (
      <Media className="w-50 mb-3">
        <img
          className="rounded-circle align-self-center"
          src={`https://ui-avatars.com/api/?name=${props.senderName}`}
          alt="user"
          width="50"
        />
        <Media body className="ml-3">
          <p className="small text-muted">{props.senderName}</p>
          <div className="bg-light rounded py-2 px-3 mb-2">
            <p className="text-small mb-0 text-muted">{props.message}</p>
          </div>
          <p className="small text-muted">{props.date}</p>
        </Media>
      </Media>
    );
}

index.propTypes = {
  mine: PropTypes.bool,
  name: PropTypes.string,
  message: PropTypes.string,
  date: PropTypes.string,
  senderName: PropTypes.string,
};

index.defaultProps = {
  mine: false,
  name: null,
  message: null,
  date: null,
  senderName: null,
}
