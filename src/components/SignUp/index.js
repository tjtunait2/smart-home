import React, {Component} from 'react';

import {Link, withRouter} from 'react-router-dom';

import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';
import {Container, Form, Col, Row, Button} from 'react-bootstrap';

const INITIAL_STATE = {
  username: '',
  email:'',
  password1: '',
  password2: '',
  espid:'',
  error: '',
}

const SignUpPage = () =>
  <Container fuild="lg" className="p-4">
    <h1 className="gradient-3">Sign Up</h1>
    <h3 className="text-muted">Create your account here</h3>
    <Row className="justify-content-center">
    <Col lg={4}>
      <hr />
      <SignUpForm />
    </Col>
    </Row>
  </Container>

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = {...INITIAL_STATE};

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit = event => {
    const {username, email, espid, password1} = this.state;
    this.props.firebase.doCreateUserWithEmailAndPassword(username, email, espid, password1)
    .then(res => this.props.history.push(ROUTES.SIGN_IN))
    .catch(error => this.setState({error}));
    event.preventDefault();
  }

  onChange = event => {
    this.setState({[event.target.name] : event.target.value});
  }

  render() {
    const {username, email, password1, password2, error} = this.state;
    const isInvalid = password1 !== password2 || password1 === '' || email === '' || username === '';
    return(
      <Form onSubmit={this.onSubmit}>
          <Form.Group className="p-2">
            <Form.Label>Username</Form.Label>
            <Form.Control size="lg" type="text" name="username" onChange={this.onChange} placeholder="Username"/>
          </Form.Group>
          <Form.Group className="p-2">
            <Form.Label>Email</Form.Label>
            <Form.Control size="lg" type="email" name="email" onChange={this.onChange} placeholder="Email"/>
          </Form.Group>
          <Form.Group className="p-2">
            <Form.Label>Esp-32</Form.Label>
          <Form.Control size="lg" type="text" name="espid" onChange={this.onChange} placeholder="ID"/>
          </Form.Group>
          <Form.Group className="p-2">
            <Form.Label>Password</Form.Label>
            <Form.Control size="lg" type="password" name="password1" onChange={this.onChange} placeholder="Password"/>
          </Form.Group>
          <Form.Group className="p-2">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control size="lg" type="password" name="password2" onChange={this.onChange} placeholder="Confirm password"/>
          </Form.Group>
          {error && <p className="alert">{error}</p>}
          <p className="p-4 text-center">
            <Button className="text-white button-gradient"  size="lg" type="submit" disabled={isInvalid}>Sign up</Button>
          </p>
        </Form>
    );
  }

}

const SignUpLink = props =>
  <p {...props}>
    <Link to={ROUTES.SIGN_UP}>Create New Account</Link>
  </p>

const SignUpForm = withRouter(withFirebase(SignUpFormBase));


export default SignUpPage;

export {SignUpForm, SignUpLink};
