import React from 'react'
import {observer} from 'mobx-react'

import '../../main-style.css'

import AddNewItem from '../AddNewItem/AddNewItem'
import List from '../List/List'

import store from '../../store'

class Participants extends React.Component {
  componentDidMount = () => {
    if (store.participantsMini.length === 0) {
      store.fetchParticipantsMini()
    }

    if (store.participantsMedi.length === 0) {
      store.fetchParticipantsMedi()
    }
  }

  render() {
    const {participantsMini, participantsMedi} = store

    return (
      <main className="App-main">
        <div className="main-container">
          <h1>Ilmoittautuminen</h1>
          <AddNewItem addItem={this.addItem} />
          <h2>Minit</h2>
          <p>
            Tämä luokka on tarkoitettu koirille, joiden säkäkorkeus on alle 35
            cm. Esteet ovat tässä luokassa 20 - 30 cm korkeita.
          </p>
          <List participants={participantsMini} />
          <h2>Medit</h2>
          <p>
            Tämä luokka on tarkoitettu koirille, joiden säkäkorkeus on 35 -
            42,99 cm. Esteet ovat tässä luokassa 30 - 40 cm korkeita.
          </p>
          <List participants={participantsMedi} />
        </div>
      </main>
    )
  }
}

export default observer(Participants)
