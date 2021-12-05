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
      issuer: 'https://dev-1827916.okta.com/oauth2/default',
      clientId: '0oa2ykfxtpMjQBkbk5d7',
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
// eslint-disable-next-line
export default class extends Component {
  render() {
    return (<Router><AppWithRouterAccess/></Router>);
  }
}