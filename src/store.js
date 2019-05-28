import {decorate, observable, action} from 'mobx'
import uuidv4 from 'uuid/v4'

class store {
  participantsMini = []
  participantsMedi = []

  // AddNewItem.js, ListItem.js
  errorMessage = {
    didNotSucceedReqistration: 'Ilmoittautuminen ei onnistunut. ',
    didNotSucceedEditing: 'Muokkaus ei onnistunut. ',
    invalidHandler: 'Virheellinen koiran ohjaaja (täytä etunimi ja sukunimi). ',
    invalidDog: 'Virheellinen koiran kutsumanimi. ',
    invalidHeight: 'Virheellinen koiran säkäkorkeus. ',
    invalidEmail: 'Virheellinen sähköpostiosoite.',
  }

  // DetermineClass.js
  answer = {
    smallMini:
      'Koirasi on pikkumini. Se voi osallistua näissä kisoissa miniluokkaan.',
    mini: 'Koirasi on mini. Se voi osallistua näissä kisoissa miniluokkaan.',
    medi: 'Koirasi on medi. Se voi osallistua näissä kisoissa mediluokkaan.',
    invalidNumber: 'Et syöttänyt kelvollista lukua. :(',
    invalidHeight: 'Koirasi on väärän kokoinen näihin kisoihin. :(',
  }

  // Participants.js
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

    for (let i = 0; i < dataHandlers.length; i++) {
      this.participantsMini.push({
        handler: dataHandlers[i].handler,
        dog: dataDogs[i].name,
        email: dataHandlers[i].email,
        id: uuidv4(i),
      })
    }
  }

  // Participants.js
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

    for (let i = 0; i < dataHandlers.length; i++) {
      this.participantsMedi.push({
        handler: dataHandlers[i].handler,
        dog: dataDogs[i].name,
        email: dataHandlers[i].email,
        id: uuidv4(i),
      })
    }
  }

  addItem = newParticipant => {
    const {participantsMini, participantsMedi} = this

    if (
      newParticipant.confirmedHeight >= 13 &&
      newParticipant.confirmedHeight < 35
    ) {
      participantsMini.push({
        handler: newParticipant.handler,
        dog: newParticipant.dog,
        height: newParticipant.confirmedHeight,
        email: newParticipant.email,
        id: newParticipant.id,
      })
    } else {
      participantsMedi.push({
        handler: newParticipant.handler,
        dog: newParticipant.dog,
        height: newParticipant.confirmedHeight,
        email: newParticipant.email,
        id: newParticipant.id,
      })
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
  errorMessage: observable,
  answer: observable,
  fetchParticipantsMini: action,
  setParticipantsMini: action,
  fetchParticipantsMedi: action,
  setParticipantsMedi: action,
  addItem: action,
  editItem: action,
  removeItem: action,
})

export default new store()
