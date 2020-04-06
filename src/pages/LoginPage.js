import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { CustomContainer } from '../components';

import { Button, Form, Input } from 'reactstrap';
export default class LoginPages extends Component {
  render() {
    return (
      <CustomContainer className="text-center">
        <Form style={{
          backgroundColor: '#fff',
          width: '100%',
          maxWidth: '430px',
          padding: '30px',
          margin: '0 auto',
          borderRadius: '1rem',

        }}>
          <FontAwesomeIcon icon={faPaperPlane} size="6x" color="#007bff" />
          <Input type="text" className="form-control mt-4 mb-2" placeholder="Name" />
          <Input type="email" className="form-control my-2" placeholder="Email" />
          <Button block={true} color="primary" type="submit" size="lg">Sign in</Button>
          <div className="my-3">
            <Link className="py-5 text-muted" to="/register">I've no Account</Link>
          </div>
        </Form>
      </CustomContainer>
    )
  }
}
