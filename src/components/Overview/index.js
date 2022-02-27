import React, {Component} from 'react';
import {withFirebase} from '../Firebase';
import {Container, Row, Col, Card} from 'react-bootstrap';

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      // food: 0,
      temperature: 0,
      water: 0,
    }
  }

  render() {
    const {food, temperature, water} = this.state;
    return(
      <Container>
        <Row className="justify-content-left p-4">
          <Col lg={6} className="text-center">
            <Card>
              {temperature > 30 ?
                <Card.Img src={process.env.PUBLIC_URL + "/cloud.jpeg"} className="shadow-lg"/> :
                <Card.Img src={process.env.PUBLIC_URL + "/cloud.jpeg"} className="shadow-lg"/>}
              <Card.Body>
                <Card.Title className="temperature">Temperature</Card.Title>
                <Card.Text className="p-4">
                  <span>This is the temperature of the room<br/></span>
                  <span className={temperature > 30 ? "hot": "cold"}>{temperature}°C</span>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6} className="text-center">
            <Card>
              {water ? <Card.Img src={process.env.PUBLIC_URL + "/thirsty.jpeg"} className="shadow-lg"/> :
              <Card.Img src={process.env.PUBLIC_URL + "/thirsty.jpeg"} className="shadow-lg"/>}
              <Card.Body>
                <Card.Title className="water">Water</Card.Title>
                <Card.Text className="p-4">
                  <span>This is the amount of water (l) <br/></span>
                  <span className={water ? "cold": "hot"}>{water}</span>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          {/* <Col lg={4} className="text-center">
            <Card>
              {food ? <Card.Img src={process.env.PUBLIC_URL + "/full.png"} className="shadow-lg"/> :
              <Card.Img src={process.env.PUBLIC_URL + "/hungry.png"} className="shadow-lg"/>}
              <Card.Body>
                <Card.Title className="food">Food</Card.Title>
                <Card.Text className="p-4">
                  <span>This is the amount of food<br/></span>
                  <span className={food ? "cold": "hot"}>{food}</span>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col> */}
        </Row>
      </Container>
    );
  }

  componentDidMount() {
    this.props.firebase.data_in(this.props.espid).limitToLast(3).on('value', snapshot => {
      const data = snapshot.val();
      //const key = Object.keys(data)[0];
      console.log(this.props.espid);
      console.log(data);
      this.setState({temperature: data.temperature, water: data.water, food: data.food});
      //this.setState({uid: key, ...data[key]});
    })
  }

  componentWillUnmount() {
    this.props.firebase.data_in(this.props.espid).off();
  }

}

export default withFirebase(Overview);
