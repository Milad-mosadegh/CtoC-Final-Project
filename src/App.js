import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import MaterialSignin from './components/signin/materialSignin';
import MaterialSignup from './components/signup/materialSignup';
import Dashboard from './components/dashboard/dashboard';
import MainAcc from './components/account/mainacc';
import SellItems from './components/sell/sellitems';
import Home from './components/landingpage/home';
import ResetPassword from './components/resetPassword/resetPassword';
import BuyComponent from './components/buy/buy';





function App() {
  return (
    <div className="App">

      <Router>
        
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/account" component={MainAcc} />
          <Route path="/resetpass/:id/:token" component={ResetPassword} />
          <Route path="/sellitems" component={SellItems} />
          <Route path="/buyitems" component={BuyComponent} />
          <Route path="/signin" component={MaterialSignin} />
          <Route path="/signup" component={MaterialSignup} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </div>

  );
}
export default App;
