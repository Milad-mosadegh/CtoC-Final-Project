import React from 'react';
import MyNavbar from './components/navbar/navBar';

import MaterialSignin from './components/sign/materialSignin';
import MaterialSignup from './components/sign/materialSignup';


function App() {
  return (
    <div className="App">
      <MyNavbar />
      <MaterialSignin />
      <MaterialSignup />

    </div>

  );
}
export default App;
