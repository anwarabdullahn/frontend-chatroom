import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { CustomContainer } from '../components';
import { setLoginUser, setCurrentUser } from '../redux/auth/action';
import { Button, Form, Input, Spinner } from 'reactstrap';
import { connect } from 'react-redux';

class LoginPages extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
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
    const { email } = this.state;
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
          <Input type="email" className="form-control my-2" placeholder="Email" value={email} name="email" onChange={this.onChange} />
          <Button block={true} disabled={this.props.isLoading} color="primary" type="submit" size="lg">
            {this.props.isLoading &&
              <Spinner size="sm" color="secondary" />} Sign in
          </Button>
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
  isLoading: state.auth.isLoading || false,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPages);
