import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { CustomContainer } from '../components';
import { setLoginUser, setCurrentUser } from '../redux/auth/action';
import { Button, Form, Input } from 'reactstrap';
import { connect } from 'react-redux';

class LoginPages extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: ''
    }
  }

  componentDidUpdate() {
    this.props.isAuthenticated && this.props.history.push('/home');
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.setLoginUser(this.state);
  }

  render() {
    const { email, name } = this.state;
    console.warn(this.props, 'this.props.login');

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
          <Input type="text" className="form-control mt-4 mb-2" placeholder="Name" value={name} name="name" onChange={this.onChange} />
          <Input type="email" className="form-control my-2" placeholder="Email" value={email} name="email" onChange={this.onChange} />
          <Button block={true} color="primary" type="submit" size="lg">Sign in</Button>
          <div className="my-3">
            <Link className="my-5 text-muted" to="/register">I've no Account</Link>
          </div>
        </Form>
      </CustomContainer>
    )
  }
}

const mapDispatchToProps = {
  setLoginUser,
  setCurrentUser,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPages);
