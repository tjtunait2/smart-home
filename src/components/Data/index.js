import React, {Component} from 'react';
import {withFirebase} from '../Firebase';
import {Container, Table, Col, Row} from 'react-bootstrap';

class DataPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data_in: []
    }
  }

  render() {
    const {data_in} = this.state;
    return(
      <Container>
        <Row className="justify-content-center">
          <Col lg={12}>
            <Table hover className="text-center align-middle">
              <thead>
                <tr>
                  <th className="text-embers-3">Received Time</th>
                  <th className="text-embers-6">Food</th>
                  <th className="text-embers-4">Temperature</th>
                  <th className="text-embers-5">Water</th>
                </tr>
              </thead>
              <tbody>
                {data_in.map(item => (
                  <tr key={item.uid}>
                    <td className="p-4">{item.uid}</td>
                    <td>{item.food}</td>
                    <td>{item.temperature}</td>
                    <td>{item.water}</td>
                  </tr>
                ))
               }
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }

  componentDidMount() {

    this.props.firebase.data_in(this.props.espid).limitToLast(10).on('value', snapshot => {
      const data = snapshot.val();
      const data_list = Object.keys(data).map(key => ({ ...data[key], uid: key}));
      this.setState({data_in: data_list});
    })
  }

  componentWillUnmount() {
    this.props.firebase.data_in(this.props.espid).off();
  }

}

export default withFirebase(DataPage);
