import React from 'react';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route
// } from "react-router-dom";
// import MaterialSignin from './components/signin/materialSignin';
// import MaterialSignup from './components/signup/materialSignup';
// import Dashboard from './components/dashboard/dashboard';
// import MainAcc from './components/account/mainacc';
// import SellItems from './components/sell/sellitems';
// import Home from './components/landingpage/home';
// import ResetPassword from './components/resetPassword/resetPassword';
// import BuyComponent from './components/buy/buy';
// import Messages from './components/messages/messages';
// import Contact from './components/contact/contact';
// import EditProduct from './components/account/editProductDetail/editProduct';
// import SubCategories from './components/categories/subCategories';
// import ConfirmEmail from "./components/signup/confirmEmail"
// import { GlobalContextProvider } from "./components/Context/contextApi"
import App2 from './App2';
import MyNavbar from './components/navbar/navBar';
function App(props) {
  return (
    <div className="App">
      <MyNavbar{...props} />
      <App2 />
      <h1>This H1 is wrote in APP</h1>

    </div>

  );
}
export default App;
