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
import Messages from './components/messages/messages';
import Contact from './components/contact/contact';
import EditProduct from './components/account/editProductDetail/editProduct';
import SubCategories from './components/categories/subCategories';
import ConfirmEmail from "./components/signup/confirmEmail"
import { GlobalContextProvider } from "./components/Context/contextApi"
function App() {
    return (
        <div className="App">
            <GlobalContextProvider>
                <Router>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/account" component={MainAcc} />
                        <Route path="/contact" component={Contact} />
                        <Route path="/editproduct/:id" component={EditProduct} />
                        <Route path="/categories/:type" component={SubCategories} />
                        <Route path="/messages" component={Messages} />
                        <Route path="/resetpass/:id/:token" component={ResetPassword} />
                        <Route path="/sellitems" component={SellItems} />
                        <Route path="/buyitems" component={BuyComponent} />
                        <Route path="/signin" component={MaterialSignin} />
                        <Route path="/signup" component={MaterialSignup} />
                        <Route path="/dashboard" component={Dashboard} />
                        <Route path="/confirm/:id/:token" component={ConfirmEmail} />
                    </Switch>
                </Router>
            </GlobalContextProvider>
        </div>

    );
}
export default App;
