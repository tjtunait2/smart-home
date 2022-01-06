import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {withFirebase} from '../Firebase';
import {Container, Form, Col, Row, Button} from 'react-bootstrap';
import Cookies from 'universal-cookie';
import * as ROUTES from '../../constants/routes';
const cookies = new Cookies();


class PasswordConfirmPage extends Component {
  render() {
    return(
      <Container>
        <h1 className="gradient-2">Password Confirm</h1>
        <h3 className="text-muted"><p>Insert your code here</p><p>Check your spam if you don't see</p></h3>
        <Row className="justify-content-center">
          <Col lg={4}>
            <hr />
            <PasswordConfirmForm />
          </Col>
        </Row>
      </Container>
    );
  }
}


const INITIAL_STATE = {
  code: '',
  error: null
}

class PasswordConfirmFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = {...INITIAL_STATE};
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);

  }

  onSubmit = (event) => {
    event.preventDefault();
    const {code} = this.state;
    const path = this.props.location.pathname.split('/');
    const userId = path[path.length - 1];
    this.props.firebase.user(userId).once('value').then(snapshot => {
      const verify_code = snapshot.val().code;
      if(code == verify_code) {
        cookies.set('cat_house_username', snapshot.val().name, { path: '/'});
        cookies.set('cat_house_email', snapshot.val().email, { path: '/'});
        this.props.history.push(ROUTES.ACCOUNT);
      }
      else {
        this.setState({error: 'Confirm code is wrong'});
      }
    })
  }

  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    const {code, error} = this.state;
    const isInvalid = code === '';
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Group>
          <Form.Label>Code</Form.Label>
          <Form.Control size="lg" type="text" name="code" onChange={this.onChange} placeholder="Code"/>
        </Form.Group>
        {error && <p className="alert">{error.message}</p>}
        <p className="p-4 text-center">
          <Button className="text-white button-gradient" size="lg" type="submit" disabled={isInvalid}>Submit</Button>
        </p>
      </Form>
    );
  }
}

const PasswordConfirmForm = withRouter(withFirebase(PasswordConfirmFormBase));

export default PasswordConfirmPage;
