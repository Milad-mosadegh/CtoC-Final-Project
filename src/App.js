import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import MaterialSignin from './components/sign/materialSignin';
import MaterialSignup from './components/sign/materialSignup';
import Dashboard from './components/sign/Dashboard';
import MainAcc from './components/account/mainacc';
import SellItems from './components/sell/sellitems';
import Home from './components/landingpage/home';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/account" component={MainAcc} />
          <Route path="/sellitems" component={SellItems} />
          <Route path="/signin" component={localStorage.getItem('c2c-token') ? Dashboard : MaterialSignin} />
          <Route path="/signup" component={localStorage.getItem('c2c-token') ? Dashboard : MaterialSignup} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </div>

  );
}
export default App;
