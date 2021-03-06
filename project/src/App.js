import Restaurants from './components/Restaurants'
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import { logout } from './helpers/auth'
import { firebaseAuth } from './config/constants'
import Profile from './components/Profile'
import RestaurantDetails from './components/RestaurantDetails'
import './App.css'
import { DropdownButton, MenuItem, Grid, Row } from 'react-bootstrap'

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/' />}
    />
  )
}

export default class App extends Component {
  state = {
    authed: false,
    loading: true,
    displayName: '',
    photo_url: '',

  }
  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
          displayName: user.displayName,
          photo_url: user.photoURL
        })
      } else {
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
  }
  componentWillUnmount () {
    this.removeListener()
  }
  render() {
    return this.state.loading === true ? <h1>Loading</h1> : (
      <BrowserRouter>
        <div>
          <nav style={styles.nav}>
            <Row style={styles.row}>
              <div>
                <Link to="/" style={styles.logo} className="navbar-brand">Restaurant Finder</Link>
              </div>
              <ul style={styles.rightNav}>
                <li>
                  {this.state.authed
                    ? <div>
                         <DropdownButton style={styles.dropDown} title={ this.state.displayName ? this.state.displayName.charAt(0) : ''} noCaret id="bg-vertical-dropdown-2">
                            <Profile profile_url={this.state.profile_url} displayName={this.state.displayName} />
                            <div style={styles.logoutContainer}>
                              <button
                              className="primary-btn"
                              onClick={() => {
                                logout()
                              }} >Logout</button>
                            </div>
                          </DropdownButton>
                      </div>
                    : <span>
                        <Link to="/login" className="navbar-brand">Login</Link>
                        <Link to="/register" className="navbar-brand">Register</Link>
                      </span>}
                </li>
              </ul>
            </Row>
          </nav>
          <div>
            <Switch>
              <PrivateRoute authed={this.state.authed} path='/' exact component={Restaurants} />
              <PublicRoute authed={this.state.authed} path='/login' component={Login} />
              <PublicRoute authed={this.state.authed} path='/register' component={Register} />
              <PrivateRoute authed={this.state.authed} path='/details' component={RestaurantDetails} />
              <Route render={() => <h3>No Match</h3>} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const styles = {
  nav: {
    backgroundColor: "#3c3c3c",
    marginBottom: "30px"
  },
  row: {
    margin: "0 15px"
  },
  logo: {
    color: "#FFFFFF",
    fontSize: "20px",
    paddingLeft: "0",
    fontWeight: "bold"
  },
  dropDown: {
    backgroundColor: "#4485f5",
    borderRadius: "50%",
    padding: "0",
    border: "none",
    width: "35px",
    height: "35px",
    color: "#FFFFFF",
    textTransform: "uppercase"
  },
  logoutContainer: {
    padding: "10px",
    textAlign: "center",
    background: "#f8f8f8"
  },
  rightNav: {
    display: "flex",
    alignItems: "center",
    height: "50px",
    listStyle: "none",
    padding: "0",
    margin: "0",
    float: "right"
  }
}




