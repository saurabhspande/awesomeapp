import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Service from './Service';
import Signup from './Signup';
import Login from './Login';
import Navbar from './Navbar';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Footer from "./Footer";
const App = () => {
  return ( 
  <>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/about' component={About} />
        <Route exact path='/service' component={Service} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/login' component={Login} />
        <Redirect to='/'/>
    </Switch>
    <Footer />
  </>
  )

}
export default App;