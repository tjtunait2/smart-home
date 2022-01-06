import React, {Component} from 'react';
import {withFirebase} from '../Firebase';
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="text-muted">{`Received time: ${label}`}</p>
        <p className="text-embers-4">{`Temperature: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};


class TemperatureStatistic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{
        temperature: 0,
        receive_time: "",
      }],
    }
  }

  render() {
    const {data} = this.state;
    return(
      <ResponsiveContainer width="100%" height={520}>
            <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
              <Line type="monotone" dataKey="temperature" dot={false} stroke="#FE9677" fill="#FE9677" strokeWidth={2}/>
              <CartesianGrid stroke="#ccc" strokeDasharray="3 3"/>
              <XAxis dataKey="receive_time"/>
              <YAxis/>
              <Legend iconType="plainline"/>
              <Tooltip content={<CustomTooltip />}/>
            </LineChart>
      </ResponsiveContainer>
    );
  }

  componentDidMount() {
    this.props.firebase.data_in(this.props.espid).limitToLast(20).on('value', snapshot => {
      const data = snapshot.val();
      //const data_list = Object.keys(data).map(key => ({temperature: data[key].temperature, receive_time: key}));
      const data_list = [{
        temperature: 10,
        receive_time: "",
      }]
      this.setState({data: data_list});
    })
  }

  componentWillUnmount() {
    this.props.firebase.data_in(this.props.espid).off();
  }
}


export default withFirebase(TemperatureStatistic);
