import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";


import Login from "./Pages/Login.page";
import Register from "./Pages/Register.page";
import CategoriesDetails from "./Pages/CategoriesDetails.page";
import LanguageDetails from "./Components/LanguageDetails.component"
import Password from "./Pages/Password.page";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from "./Components/profile";
import ResetPassword from "./Pages/resetPassword";
import PagenotFound from "./Components/PageNotFound";

function App() {
  return (

    <BrowserRouter>
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/categoriesdetails" component={CategoriesDetails} />
        <Route path="/languagedetails/:name" component={LanguageDetails} />
        <Route path="/forgotpassword" component={Password} />
        <Route path="/profile" component={Profile} />
        <Route path="/resetpassword/:token" component={ResetPassword} />
        <Route path="*" component={PagenotFound} />
      </Switch>
    </BrowserRouter>

  );
}

export default App;
