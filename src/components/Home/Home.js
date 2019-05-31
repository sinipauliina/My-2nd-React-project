import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import image from '../../assets/dog-1.jpg'
import DetermineClass from '../DetermineClass/DetermineClass'
import {ROUTES} from '../../constants'

import './home.css'
import '../../main-style.css'

class Home extends React.Component {
  render() {
    return (
      <main className="App-main">
        <div className="image-container">
          <img src={image} alt="" />
          <div>
            <p>Tervetuloa kisaamaan!</p>
          </div>
        </div>
        <div className="main-container">
          <h1>Pikkukoirien agilitykilpailut</h1>
          <p className="lead">
            Koirakerho Touhutassut järjestää pikkukoirille oman
            agilitykilpailun. Paikalla on myös kahvio, josta löytyy virvokkeita
            ja pientä syötävää. Tervetuloa kisaamaan ja kannustamaan! :)
          </p>
          <h2>Mitä, missä, milloin?</h2>
          <ul>
            <li>
              <span className="bold">Aika:</span> 27.7.2019 klo 10 alkaen
            </li>
            <li>
              <span className="bold">Paikka:</span> Koirakerho Touhutassujen
              agilitykenttä
            </li>
            <li>
              <span className="bold">Säkäluokat:</span> minit, medit
            </li>
            <li>
              <span className="bold">Taso:</span> 1. luokka
            </li>
            <li>
              <span className="bold">Ratatyyppi:</span> agility
            </li>
            <li>
              <span className="bold">Osallistumismaksu:</span> 10 €/koira (Lasku
              lähetetään sähköpostiin ilmoittautumisen jälkeen.)
            </li>
          </ul>
          <h2>Ilmoittautuminen</h2>
          <p>
            Kilpailuun ilmoittaudutaan tällä sivustolla viimeistään 27.6.2019.
          </p>
          <ul className="action-links">
            <li>
              <Link to={ROUTES.PARTICIPANTS}>Ilmoittaudu!</Link>
            </li>
          </ul>
          <h2>Tarkista koirasi säkäluokka</h2>
          <DetermineClass />
        </div>
      </main>
    )
  }
}

export default Home
