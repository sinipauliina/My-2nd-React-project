import React from 'react'
import {decorate, observable, action} from 'mobx'
import {observer} from 'mobx-react'

import '../../main-style.css'

import AddNewItem from '../AddNewItem/AddNewItem'
import List from '../List/List'

import uuidv4 from 'uuid/v4'

class Participants extends React.Component {
  // State
  participantsMinit = []
  participantsMedit = []

  componentDidMount = () => {
    Promise.all([
      fetch('https://randomuser.me/api/?results=5&inc=name,email&nat=fi').then(
        response => response.json()
      ),
      fetch(
        'https://pokeapi.co/api/v2/pokemon/?limit=5&offset=12&inc=name'
      ).then(response => response.json()),
    ]).then(data => {
      const dataHandlers = data[0].results.map((participant, i) => {
        return {
          ...participant,
          handler: participant.name.first + ' ' + participant.name.last,
          email: participant.email,
        }
      })

      const dataDogs = data[1].results.map((participant, i) => {
        return {
          ...participant,
          dog: participant.name,
        }
      })

      for (let i = 0; i < dataHandlers.length; i++) {
        this.participantsMinit.push({
          handler: dataHandlers[i].handler,
          dog: dataDogs[i].name,
          email: dataHandlers[i].email,
          id: uuidv4(i),
        })
      }
    })

    Promise.all([
      fetch('https://randomuser.me/api/?results=5&inc=name,email&nat=fi').then(
        response => response.json()
      ),
      fetch(
        'https://pokeapi.co/api/v2/pokemon/?limit=5&offset=55&inc=name'
      ).then(response => response.json()),
    ]).then(data => {
      const dataHandlers = data[0].results.map((participant, i) => {
        return {
          ...participant,
          handler: participant.name.first + ' ' + participant.name.last,
          email: participant.email,
        }
      })

      const dataDogs = data[1].results.map((participant, i) => {
        return {
          ...participant,
          dog: participant.name,
        }
      })

      for (let i = 0; i < dataHandlers.length; i++) {
        this.participantsMedit.push({
          handler: dataHandlers[i].handler,
          dog: dataDogs[i].name,
          email: dataHandlers[i].email,
          id: uuidv4(i),
        })
      }
    })
  }

  addItem = newParticipant => {
    newParticipant.height >= 13 && newParticipant.height < 35
      ? this.participantsMinit.push({
        handler: newParticipant.handler,
        dog: newParticipant.dog,
        height: newParticipant.height,
        email: newParticipant.email,
        id: newParticipant.id,
      })
      : this.participantsMedit.push({
        handler: newParticipant.handler,
        dog: newParticipant.dog,
        height: newParticipant.height,
        email: newParticipant.email,
        id: newParticipant.id,
      })
  }

  editItem = editedParticipant => {
    let index = this.participantsMinit.findIndex(
      x => x.id === editedParticipant.id
    )

    if (index > -1) {
      this.participantsMinit[index] = {
        handler: editedParticipant.handler,
        dog: editedParticipant.dog,
        email: editedParticipant.email,
        id: editedParticipant.id,
      }

      index = -1
    } else {
      index = this.participantsMedit.findIndex(
        x => x.id === editedParticipant.id
      )

      this.participantsMedit[index] = {
        handler: editedParticipant.handler,
        dog: editedParticipant.dog,
        email: editedParticipant.email,
        id: editedParticipant.id,
      }

      index = -1
    }
  }

  removeItem = id => {
    const index = this.participantsMinit.findIndex(x => x.id === id)

    if (index > -1) {
      this.participantsMinit = this.participantsMinit.filter(
        participant => participant.id !== id
      )
    } else {
      this.participantsMedit = this.participantsMedit.filter(
        participant => participant.id !== id
      )
    }
  }

  render() {
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
          <List
            participants={this.participantsMinit}
            editItem={this.editItem}
            removeItem={this.removeItem}
          />
          <h2>Medit</h2>
          <p>
            Tämä luokka on tarkoitettu koirille, joiden säkäkorkeus on 35 -
            42,99 cm. Esteet ovat tässä luokassa 30 - 40 cm korkeita.
          </p>
          <List
            participants={this.participantsMedit}
            editItem={this.editItem}
            removeItem={this.removeItem}
          />
        </div>
      </main>
    )
  }
}

decorate(Participants, {
  participantsMinit: observable,
  participantsMedit: observable,
  componentDidMount: action,
  addItem: action,
  editItem: action,
  removeItem: action,
  render: observer,
})

export default Participants
