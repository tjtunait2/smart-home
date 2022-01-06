import React from 'react';
import {AuthUserContext} from './context';
import {withFirebase} from '../Firebase';
import Cookies from 'universal-cookie';


const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.cookies = new Cookies();

      this.intervalID = null;
      this.state = {
        username: '',
        email: '',
      }
    }
    render() {
      return (
        <AuthUserContext.Provider value={this.state}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }

    componentDidMount() {
      this.intervalID = setInterval(() => {this.setState({username: this.cookies.get('cat_house_username'), email: this.cookies.get('cat_house_email')});}, 1000);
    }

    componentWillUnmount() {
      clearInterval(this.intervalID);
    }
  }

  return WithAuthentication;

}

export {withAuthentication};
