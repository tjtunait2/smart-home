import React, {Component} from 'react';
import {withFirebase} from '../Firebase';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import {withAuthorization} from '../Session';

const INITIAL_STATE = {
  password1: '',
  password2: '',
  error: null,
}

class PasswordChangePage extends Component {
  constructor(props) {
    super(props);

    this.state = {...INITIAL_STATE};
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit = (event) => {
    const {password1} = this.state;
    this.props.firebase.doPasswordUpdate(this.props.authUser, password1);
    this.setState({...INITIAL_STATE});

    event.preventDefault();

  }

  onChange = (event) => {
    this.setState({[event.target.name] : event.target.value});
  }

  render() {
    const {password1, password2, error} = this.state;
    const isInvalid = password1 === '' || password2 === '';
    return (
      <Container className="p-4">
        <h2 className="gradient-2">Change password here</h2>
        <Row className="justify-content-center">
          <Col lg={4}>
            <Form onSubmit={this.onSubmit}>
              <Form.Group className="p-2">
                <Form.Control name="password1" type="password" onChange={this.onChange} placeholder="New Password"/>
              </Form.Group>
              <Form.Group className="p-2">
                <Form.Control name="password2" type="password" onChange={this.onChange} placeholder="Confirm Password"/>
              </Form.Group>
              {error && <p className="alert">{error.message}</p>}
              <p className="text-center">
                <Button className="text-white button-gradient" type="submit"  size="lg" block="true" disabled={isInvalid}>
                  Change Password</Button>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withFirebase(PasswordChangePage);
