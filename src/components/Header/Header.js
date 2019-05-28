import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import {ROUTES} from '../../constants'

import './header.css'
import '../../main-style.css'
import 'font-awesome/css/font-awesome.min.css'

class Header extends React.Component {
  state = {
    mobileMenu: false,
  }

  handleClick = () => {
    const currentMobileMenuState = !this.state.mobileMenu
    this.setState({mobileMenu: currentMobileMenuState})
  }

  handleClickLink = () => {
    this.setState({mobileMenu: false})
  }

  render() {
    const {mobileMenu} = this.state

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
          <nav className={mobileMenu ? 'mobilemenu' : 'mainmenu'}>
            <ul>
              <li>
                <Link to="/" onClick={this.handleClickLink}>
                  <span className="fas fa-home" />
                </Link>
              </li>
              <li>
                <Link to={ROUTES.PARTICIPANTS} onClick={this.handleClickLink}>
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

export default Header
