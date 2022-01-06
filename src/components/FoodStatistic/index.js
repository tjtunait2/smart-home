import React, {Component} from 'react';
import {withFirebase} from '../Firebase';
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer} from 'recharts';


const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="text-muted">{`Received time: ${label}`}</p>
        <p className="text-embers-6">{`Food: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};


class FoodStatistic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{
        food: 0,
        receive_time: "",
      }],
    }
  }

  render() {
    const {data} = this.state;
    return(
      <ResponsiveContainer width="100%" height={520}>
            <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
              <Line type="monotone"
                    dataKey="food"
                    dot={false}
                    stroke="#3CA369"
                    fill="#3CA369"
                    strokeWidth={2}/>
              <CartesianGrid stroke="#ccc" strokeDasharray="3 3"/>
              <XAxis dataKey="receive_time"/>
              <YAxis type="number" domain={[0, 1]}/>
              <Legend iconType="plainline"/>
              <Tooltip content={<CustomTooltip />}/>
            </LineChart>
      </ResponsiveContainer>
    );
  }

  componentDidMount() {
    this.props.firebase.data_in(this.props.espid).limitToLast(20).on('value', snapshot => {
      const data = snapshot.val();
      const data_list = Object.keys(data).map(key => ({food: data[key].food, receive_time: key}));
      this.setState({data: data_list});
    })
  }

  componentWillUnmount() {
    this.props.firebase.data_in(this.props.espid).off();
  }
}

export default withFirebase(FoodStatistic);
