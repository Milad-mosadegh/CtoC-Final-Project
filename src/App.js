import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import MaterialSignin from './components/sign/materialSignin';
import MaterialSignup from './components/sign/materialSignup';

import Home from './components/LandigPage/home';

import Dashboard from './components/sign/Dashboard';

import SellItems from './components/SellPart/sellItems';
import MainAcc from './components/accountFolder/mainAcc';





function App() {



  useEffect(() => {
    if (localStorage.getItem("c2c-token")) console.log("token available")

  }, [])

  return (
    <div >


      <Router>

        <Switch>
          <Route path="/account" component={MainAcc} />
          <Route path="/sellitems" component={SellItems} />
          <Route path="/signin" component={localStorage.getItem('c2c-token') ? Dashboard : MaterialSignin} />
          <Route path="/signup" component={localStorage.getItem('c2c-token') ? Dashboard : MaterialSignup} />
          <Route path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard} />






        </Switch>
      </Router>
    </div>

  );
}
export default App;
