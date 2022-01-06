import React, {Component} from 'react';

import PasswordChangePage from '../PasswordChange';
import {withFirebase} from '../Firebase';
import {AuthUserContext, withAuthorization} from '../Session';
import {ListGroup, Container, Row, Col} from 'react-bootstrap';
import hash from 'object-hash';

class AccountPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      house: '',
    }
  }

  render() {
    return(
      <Container>
        <h2 className='gradient-3'>Account Info</h2>
        <Row className="justify-content-center m-4">
          <Col lg={2} className="p-0">
            <ListGroup as="ul">
              <ListGroup.Item as="li" className="bg-embers-4 border-0" active>
                Username
              </ListGroup.Item>
              <ListGroup.Item as="li">
                Email
              </ListGroup.Item>
              <ListGroup.Item as="li">
                Esp-32
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col lg={3}>
            <ListGroup as="ul">
              <ListGroup.Item as="li" className="bg-embers-3 border-0" active>
                {this.props.authUser.username}
              </ListGroup.Item>
              <ListGroup.Item as="li">
                {this.props.authUser.email}
              </ListGroup.Item>
              <ListGroup.Item as="li">
                {this.state.house}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
        <Row className="p-4" />
        <PasswordChangePage authUser={this.props.authUser}/>
      </Container>
    );
  }

  componentDidMount() {
    const userId = hash(this.props.authUser.email);
    this.props.firebase.user(userId).once('value').then(snapshot => {
      const value = snapshot.val();
      this.setState({house : value.house});
    })
  }

}

export default withAuthorization(withFirebase(AccountPage));
