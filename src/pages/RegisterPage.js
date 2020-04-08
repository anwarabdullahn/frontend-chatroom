import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { CustomContainer } from '../components';
import { Button, Form, Input, Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { setRegisterUser, setCurrentUser } from '../redux/auth/action';

class RegisterPages extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    }
  }

  componentDidUpdate() {
    this.props.isAuthenticated && this.props.history.push('/home');
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.setRegisterUser(this.state);
  }

  render() {
    const { name, email } = this.state;
    console.warn(this.props, 'this.props.register');
    return (
      <CustomContainer className="text-center">
        <Form style={{
          backgroundColor: '#fff',
          width: '100%',
          maxWidth: '430px',
          padding: '30px',
          margin: '0 auto',
          borderRadius: '1rem',
        }}
          onSubmit={this.onSubmit}
        >
          <FontAwesomeIcon icon={faPaperPlane} size="6x" color="#007bff" />
          <Input type="text" className="form-control my-2" placeholder="Your Name" name="name" value={name} onChange={this.onChange} />
          <Input type="email" className="form-control my-2" placeholder="Your Email" name="email" value={email} onChange={this.onChange} />
          <Button block={true} disabled={this.props.isLoading} color="primary" type="submit" size="lg">
            {this.props.isLoading &&
              <Spinner size="sm" color="secondary" />} Register</Button>
          <div className="my-3">
            <Link className="my-5 text-muted" to="/">Back to Login</Link>
          </div>
        </Form>
      </CustomContainer>
    )
  }
}

const mapDispatchToProps = {
  setRegisterUser,
  setCurrentUser,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading || false,
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPages)