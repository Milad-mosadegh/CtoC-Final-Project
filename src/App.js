import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


import MaterialSignin from './components/sign/materialSignin';
import MaterialSignup from './components/sign/materialSignup';
import Home from './components/LandigPage/home';
import MyNavbar from './components/navbar/navBar';

import Dashboard from './components/sign/Dashboard';
import SearchBar from './components/SearchBar/searchbar';



function App() {
  return (
    <div className="App">
      <MyNavbar />
      <SearchBar />
      <Router>
        <Switch>
          <Route path="/signin" component={localStorage.getItem('c2c-token') ? Dashboard : MaterialSignin} />
          <Route path="/signup" component={localStorage.getItem('c2c-token') ? Dashboard : MaterialSignup} />
          {/* <Route path="/" component={localStorage.getItem('c2c-token') ? Dashboard : Home} /> */}
          <Route><Home /> </Route>

        </Switch>
      </Router>
    </div>

  );
}
export default App;
