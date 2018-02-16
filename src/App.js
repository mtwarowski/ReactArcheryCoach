import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import Login from './Login'

import Bows from './Equipment/Bows'
import PracticesPage from './Practicing/PracticesPage'
import AuthService from './Auth/AuthService'

const Home = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
    </header>
  </div>
)

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    new AuthService().loggedIn() === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home} />
      <PrivateRoute path='/Practices' component={PracticesPage} />
      <PrivateRoute path='/Bows' component={Bows} />
    </Switch>
  </main>
)

const Header = () => (

  <header>
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/Practices'>PracticesPage</Link></li>
        <li><Link to='/Bows'>Bows</Link></li>
      </ul>
    </nav>
    <Login />
  </header>
)

const App = () => (
  <div>
    <Header />
    <Main />
  </div>
)

export default App;