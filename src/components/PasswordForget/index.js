import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';
import {Container, Form, Col, Row, Button} from 'react-bootstrap';
import hash from 'object-hash';

const PasswordForgetPage = () =>
  <Container>
    <h1 className="gradient-2">Password Forget</h1>
    <h3 className="text-muted">Send your email here</h3>
    <Row className="justify-content-center">
      <Col lg={4}>
        <hr />
        <PasswordForgetForm />
      </Col>
    </Row>
  </Container>;


const INITIAL_STATE = {
  email: '',
  error: null
}

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = {...INITIAL_STATE};
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
  }

  sendEmail = (email) => {
    const userId = hash(email);
    this.props.firebase.user(userId).once('value').then(snapshot => {
      const value = snapshot.val();
      const mailgun = require("mailgun-js");
      const DOMAIN = `${process.env.MAILGUN_DOMAIN}`;
      const mg = mailgun({apiKey: `${process.env.MAILGUN_API_KEY}`, domain: DOMAIN});
      const data = {
        from: "cat_house2020@iot.hust.com",
        to: `${email}`,
        subject: "Change password",
        text: `Code: ${value.code}`,
      };
      mg.messages().send(data, function (error, body) {
        console.log(body);
      });
    })

    this.props.firebase.user(userId).update({'code': Math.floor(Math.random() * 99999) + 10000});
  }

  onSubmit = (event) => {
    event.preventDefault();
    const {email, code} = this.state;
    this.sendEmail(email);
    this.props.history.push(ROUTES.PASSWORD_CONFIRM + `/${hash(email)}`);
  }

  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    const {email, error} = this.state;
    const isInvalid = email === '';
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control size="lg" type="email" name="email" onChange={this.onChange} placeholder="Email"/>
        </Form.Group>
        {error && <p className="alert">{error.message}</p>}
        <p className="p-4 text-center">
          <Button className="text-white button-gradient" size="lg" type="submit" disabled={isInvalid}>Submit</Button>
        </p>
      </Form>
    );
  }
}

const PasswordForgetForm = withRouter(withFirebase(PasswordForgetFormBase));

const PasswordForgetLink = (props) =>
  <p {...props}>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>

export default PasswordForgetPage;
export {PasswordForgetForm, PasswordForgetLink};
