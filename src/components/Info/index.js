import React, {Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap';

class InfoPage extends Component {
  render() {
    return (
      <Container className="p-4">
        <h1 className="gradient-2">Smart Home project v1</h1>
        <Row className="justify-content-center p-5">
          <Col lg={6}>
            <h2 className="text-embers-4">Introdution</h2>
            <p>This project using IoT technology with <strong><a href="https://www.espressif.com/en/products/socs/esp32">ESP-32</a></strong> to collect data from sensor, then send data through HTTP protocol to <strong><a href="https://console.firebase.google.com/u/0/">Firebase</a></strong> to save data realtime, user interface using <b><a href="https://reactjs.org/">Reactjs</a></b> to implement on website and <b><a href="https://www.java.com/en/">Java</a></b> to run on <b><a href="https://www.android.com/">Android</a></b>.</p>
          </Col>
        </Row>
        <Row className="justify-content-center p-5">
          <Col lg={6}>
            <h2 className="text-embers-2">Features</h2>
            <p>User can sign up for an account to sign in the system and get data like <b>temparature</b>, <b>food</b>, <b>water</b> and then control device like <b>fan</b>, <b>led</b> and <b>pump</b> to adjust temp, add food and water to make the cat happy.</p>
          </Col>
        </Row>
         <Row className="justify-content-center p-5">
          <h2 className="text-embers-1">People Behind</h2>
          <Col lg={3} className="text-center font-weight-bolder">
            <p></p>
            <p>h</p>
          </Col>
          <Col lg={3} className="text-center font-weight-bolder">
            <p></p>
            <p></p>
          </Col>
         </Row>
      </Container>
    );
  }
}


export default InfoPage;
