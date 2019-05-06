import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {decorate, observable, action} from 'mobx'
import {observer} from 'mobx-react'

import './header.css'
import '../../main-style.css'
import 'font-awesome/css/font-awesome.min.css'

class Header extends React.Component {
  // State
  mobileMenu = false

  handleClick = () => {
    const currentMobileMenuState = !this.mobileMenu
    this.mobileMenu = currentMobileMenuState
  }

  handleClickLink = () => {
    this.mobileMenu = false
  }

  render() {
    return (
      <header className="App-header">
        <div className="header-container">
          <div className="sitename">
            <Link to="/" onClick={this.handleClickLink}>
              Touhutassut
            </Link>
          </div>
          <div className="toggle-button" onClick={this.handleClick}>
            <span className="fas fa-bars" />
          </div>
          <nav className={this.mobileMenu ? 'mobilemenu' : 'mainmenu'}>
            <ul>
              <li>
                <Link to="/" onClick={this.handleClickLink}>
                  <span className="fas fa-home" />
                </Link>
              </li>
              <li>
                <Link to="/ilmoittautuminen/" onClick={this.handleClickLink}>
                  Ilmoittautuminen
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    )
  }
}

decorate(Header, {
  mobileMenu: observable,
  handleClick: action,
  handleClickLink: action,
  render: observer,
})

export default Header
