import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {decorate, observable, action} from 'mobx'
import {observer} from 'mobx-react'

import './App.css'
import './main-style.css'

import Header from './components/Header/Header'
import Home from './components/Home/Home'
import Ilmoittautuminen from './components/Ilmoittautuminen/Ilmoittautuminen'
import Footer from './components/Footer/Footer'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Header />

          <Route path="/" exact component={Home} />
          <Route path="/ilmoittautuminen/" component={Ilmoittautuminen} />

          <Footer />
        </Router>
      </div>
    )
  }
}

decorate(App, {
  render: observer,
})

export default App
