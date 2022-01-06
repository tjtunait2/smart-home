import React, {Component} from 'react';
import {withFirebase} from '../Firebase';
import {NavLink} from 'react-bootstrap';
import Cookies from 'universal-cookie';
import * as ROUTES from '../../constants/routes';
import {withRouter} from 'react-router-dom';

const cookies = new Cookies();


class SignOutLink extends Component {

  constructor(props) {
    super(props);

    this.signOut = this.signOut.bind(this);
  }

  signOut = (event) => {
    cookies.remove('cat_house_username');
    cookies.remove('cat_house_email');
    this.props.history.push(ROUTES.SIGN_IN);
  };

  render() {
    return (
      <NavLink onClick={this.signOut}>
        Sign Out
      </NavLink>
    );
  }
}

export default withRouter(withFirebase(SignOutLink));
