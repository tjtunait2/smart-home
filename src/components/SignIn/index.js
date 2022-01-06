import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {withFirebase} from '../Firebase';
import {SignUpLink} from '../SignUp';
import {withAuthentication} from '../Session';
import {PasswordForgetLink} from '../PasswordForget';
import * as ROUTES from '../../constants/routes';
import {Form, Container, Button, Col, Row} from 'react-bootstrap';
import Cookies from 'universal-cookie';


const cookies = new Cookies();

const INITIAL_STATE = {
  email: '',
  password: '',
  error: '',
}

const SignInPage = () =>
  <Container fuild="lg" className="p-4">
    <Row className="justify-content-center">
      <h1 className="gradient-2">Sign In</h1>
      <h3 className="text-muted">Use your email to sign in</h3>
      <Col lg={4}>
        <hr />

        <SignInForm />
        <SignUpLink className="text-center"/>
        <PasswordForgetLink className="text-center"/>
      </Col>
    </Row>
  </Container>;

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = {...INITIAL_STATE};
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit = (event) => {
    const {email, password} = this.state;
    this.props.firebase.doSignInWithEmailAndPassword(email, password)
    .then(authUser => {
      this.setState({...INITIAL_STATE});
      cookies.set('cat_house_username', authUser.name, { path: '/'});
      cookies.set('cat_house_email', authUser.email, { path: '/'});
      this.props.history.push(ROUTES.HOME);
    })
    .catch(error => this.setState({error}));

    event.preventDefault();
  }

  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    const {email, password, error} = this.state;
    const isInvalid = email === '' || password === '';
    return(
        <Form onSubmit={this.onSubmit} className="p-2">
          <Form.Group className="p-2">
            <Form.Label>Email</Form.Label>
            <Form.Control size="lg" type="email" name="email" onChange={this.onChange} placeholder="Email"/>
          </Form.Group>
          <Form.Group className="p-2">
            <Form.Label>Password</Form.Label>
            <Form.Control size="lg" type="password" name="password" onChange={this.onChange} placeholder="Password"/>
          </Form.Group>
          {error && <p className="alert">{error}</p>}
          <p className="p-4 m-0 text-center">
            <Button className="text-white button-gradient"  size="lg" type="submit" disabled={isInvalid}>Sign in</Button>
          </p>
        </Form>
    );
  }
}

const SignInForm = withRouter(withFirebase(SignInFormBase));

export default SignInPage;
export {SignInForm};
