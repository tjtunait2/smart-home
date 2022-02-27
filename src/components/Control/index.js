import React, {Component} from 'react';

import {withFirebase} from '../Firebase';

import {Container, Col, Row, Button, Card} from 'react-bootstrap';
class ControlPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fan: 0,
      led: 0,
      pump: 0
    };

    this.onClick = this.onClick.bind(this);
  }


  onClick = (event) => {
    let ctrl = this.state[event.target.name];
    ctrl = ctrl ? 0 : 1;
    this.props.firebase.control_out(this.props.espid).update({[event.target.name]: ctrl});
  }

  render() {
    const {fan, led, pump} = this.state;
    return(
      <Container className="p-4">
        <Row className="justify-content-center">
          <Col lg={4} className="text-center">
            <Card>
              <Card.Img src={process.env.PUBLIC_URL + "/fan2.jpeg"} className="shadow-lg"/>
              <Card.Body>
                <Card.Title className="temperature">Control Fan</Card.Title>
                <Card.Text className="p-4">
                  <span>If the temperature is too hot just turn on!!<br /></span>
                  <span>Or turn it off when it's too cold</span>
                </Card.Text>
                <Button className={fan ? "text-white control-on" : "text-white control-off"}
                    size="lg"
                    type="button"
                    name="fan"
                    block="true"
                    onClick={this.onClick}>
                  Fan: {fan ? 'On': 'Off'}
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} className="text-center">
            <Card>
              <Card.Img src={process.env.PUBLIC_URL + "/led2.jpeg"} className="shadow-lg" />
              <Card.Body>
                <Card.Title className="food">Control Led</Card.Title>
                <Card.Text className="p-4">
                  <span>Just turn the led on<br /></span>
                  <span>Remember to turn off if you don't use</span>
                </Card.Text>
                <Button className={led ? "text-white control-on" : "text-white control-off"}
                      size="lg"
                      type="button"
                      name="led"
                      block="true"
                      onClick={this.onClick}>
                  Led: {led ? 'On': 'Off'}
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} className="text-center">
            <Card>
              <Card.Img src={process.env.PUBLIC_URL + "/pump2.jpeg"} className="shadow-lg" />
              <Card.Body>
                <Card.Title className="water">Control Pump</Card.Title>
                <Card.Text className="p-4">
                  <span>Don't forget to get some water<br /></span>
                  <span>Don't waste too much water by turning off</span>
                </Card.Text>
                <Button className={pump ? "text-white control-on" : "text-white control-off"}
                      size="lg"
                      type="button"
                      name="pump"
                      block="true"
                      onClick={this.onClick}>
                  Pump: {pump ? 'On': 'Off'}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  componentDidMount() {
    this.props.firebase.control_out(this.props.espid).on('value', snapshot => {
      const control = snapshot.val();
      this.setState({...control});
    })
  }

  componentWillUnmount() {
    this.props.firebase.control_out(this.props.espid).off();
  }

}

export default withFirebase(ControlPage);
