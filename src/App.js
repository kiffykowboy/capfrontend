import React, { Component } from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import { SecureRoute, Security, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import Home from './Home';
import Posts from './Posts';

class App extends Component {
  constructor(props) {
    super(props);
    this.oktaAuth = new OktaAuth({
      issuer: 'https://dev-37363092.okta.com',
      clientId: '0oa2yqzxzgPLuPD4t5d7',
      redirectUri: window.location.origin + '/login/callback'
    });
    this.restoreOriginalUri = async (_oktaAuth, originalUri) => {
      props.history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
    };
  }

  render() {
    return (
      <Security oktaAuth={this.oktaAuth} restoreOriginalUri={this.restoreOriginalUri} >
        <Route path='/' exact={true} component={Home} />
        <SecureRoute path='/Posts' component={Posts} />
        <Route path='/login/callback' component={LoginCallback} />
      </Security>
    );
  }
}

const AppWithRouterAccess = withRouter(App);
export default class extends Component {
  render() {
    return (<Router><AppWithRouterAccess/></Router>);
  }
} 