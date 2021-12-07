import React from "react"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ProviderAuthentication } from "../contexts/Authentication";

import Chats from "./Chats"
import Login from "./Login"

function App() {
  return (
    // A div with router, ProviderAuthentication components. Switch renders one of the Routes for the login en chats pages.
    <div style={{ fontFamily: 'Avenir' }}>
      <Router>
        <ProviderAuthentication>
          <Switch>
            <Route path="/chats" component={Chats} />
            <Route path="/" component={Login} />
          </Switch>
        </ProviderAuthentication>
      </Router>
    </div>
  )
}

export default App
