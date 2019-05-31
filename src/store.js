import {decorate, observable, action} from 'mobx'
import uuidv4 from 'uuid/v4'

class store {
  constructor() {
    this.fetchParticipantsMini()
    this.fetchParticipantsMedi()
  }

  participantsMini = []
  participantsMedi = []

  fetchParticipantsMini = () => {
    Promise.all([
      fetch('https://randomuser.me/api/?results=5&inc=name,email&nat=fi').then(
        response => response.json()
      ),
      fetch(
        'https://pokeapi.co/api/v2/pokemon/?limit=5&offset=12&inc=name'
      ).then(response => response.json()),
    ]).then(data => this.setParticipantsMini(data))
  }

  setParticipantsMini = data => {
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

    let newParticipantsMini = []

    for (let i = 0; i < dataHandlers.length; i++) {
      newParticipantsMini.push({
        handler: dataHandlers[i].handler,
        dog: dataDogs[i].name,
        email: dataHandlers[i].email,
        id: uuidv4(i),
      })
    }

    this.participantsMini = newParticipantsMini
  }

  fetchParticipantsMedi = () => {
    Promise.all([
      fetch('https://randomuser.me/api/?results=5&inc=name,email&nat=fi').then(
        response => response.json()
      ),
      fetch(
        'https://pokeapi.co/api/v2/pokemon/?limit=5&offset=55&inc=name'
      ).then(response => response.json()),
    ]).then(data => this.setParticipantsMedi(data))
  }

  setParticipantsMedi = data => {
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

    let newParticipantsMedi = []

    for (let i = 0; i < dataHandlers.length; i++) {
      newParticipantsMedi.push({
        handler: dataHandlers[i].handler,
        dog: dataDogs[i].name,
        email: dataHandlers[i].email,
        id: uuidv4(i),
      })
    }

    this.participantsMedi = newParticipantsMedi
  }

  addItem = newParticipant => {
    if (
      newParticipant.confirmedHeight >= 13 &&
      newParticipant.confirmedHeight < 35
    ) {
      let newParticipantsMini = [
        ...this.participantsMini,
        {
          handler: newParticipant.handler,
          dog: newParticipant.dog,
          height: newParticipant.confirmedHeight,
          email: newParticipant.email,
          id: newParticipant.id,
        },
      ]

      this.participantsMini = newParticipantsMini
    } else {
      let newParticipantsMedi = [
        ...this.participantsMedi,
        {
          handler: newParticipant.handler,
          dog: newParticipant.dog,
          height: newParticipant.confirmedHeight,
          email: newParticipant.email,
          id: newParticipant.id,
        },
      ]

      this.participantsMedi = newParticipantsMedi
    }
  }

  editItem = editedParticipant => {
    const {participantsMini, participantsMedi} = this

    let index = participantsMini.findIndex(x => x.id === editedParticipant.id)

    if (index > -1) {
      participantsMini[index] = {
        handler: editedParticipant.handler,
        dog: editedParticipant.dog,
        email: editedParticipant.email,
        id: editedParticipant.id,
      }

      index = -1
    } else {
      index = participantsMedi.findIndex(x => x.id === editedParticipant.id)

      participantsMedi[index] = {
        handler: editedParticipant.handler,
        dog: editedParticipant.dog,
        email: editedParticipant.email,
        id: editedParticipant.id,
      }

      index = -1
    }
  }

  removeItem = id => {
    const index = this.participantsMini.findIndex(x => x.id === id)

    if (index > -1) {
      let filteredParticipantsMini = this.participantsMini.filter(
        participant => participant.id !== id
      )

      this.participantsMini = filteredParticipantsMini
    } else {
      let filteredParticipantsMedi = this.participantsMedi.filter(
        participant => participant.id !== id
      )

      this.participantsMedi = filteredParticipantsMedi
    }
  }
}

decorate(store, {
  participantsMini: observable,
  participantsMedi: observable,
  fetchParticipantsMini: action,
  setParticipantsMini: action,
  fetchParticipantsMedi: action,
  setParticipantsMedi: action,
  addItem: action,
  editItem: action,
  removeItem: action,
})

export default new store()
