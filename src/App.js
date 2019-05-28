import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import {ROUTES} from './constants'

import Header from './components/Header/Header'
import Home from './components/Home/Home'
import Participants from './components/Participants/Participants'
import Footer from './components/Footer/Footer'

import './App.css'
import './main-style.css'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Header />

          <Route path="/" exact component={Home} />
          <Route path={ROUTES.PARTICIPANTS} component={Participants} />

          <Footer />
        </Router>
      </div>
    )
  }
}

export default App
