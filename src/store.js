import {decorate, observable, action} from 'mobx'
import uuidv4 from 'uuid/v4'

class store {
  participantsMinit = []
  participantsMedit = []

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
  fetchParticipantsMinit = () => {
    Promise.all([
      fetch('https://randomuser.me/api/?results=5&inc=name,email&nat=fi').then(
        response => response.json()
      ),
      fetch(
        'https://pokeapi.co/api/v2/pokemon/?limit=5&offset=12&inc=name'
      ).then(response => response.json()),
    ]).then(data => this.setParticipantsMinit(data))
  }

  setParticipantsMinit = data => {
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
  }

  // Participants.js
  fetchParticipantsMedit = () => {
    Promise.all([
      fetch('https://randomuser.me/api/?results=5&inc=name,email&nat=fi').then(
        response => response.json()
      ),
      fetch(
        'https://pokeapi.co/api/v2/pokemon/?limit=5&offset=55&inc=name'
      ).then(response => response.json()),
    ]).then(data => this.setParticipantsMedit(data))
  }

  setParticipantsMedit = data => {
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
  }

  addItem = newParticipant => {
    const {participantsMinit, participantsMedit} = this

    if (
      newParticipant.confirmedHeight >= 13 &&
      newParticipant.confirmedHeight < 35
    ) {
      participantsMinit.push({
        handler: newParticipant.handler,
        dog: newParticipant.dog,
        height: newParticipant.confirmedHeight,
        email: newParticipant.email,
        id: newParticipant.id,
      })
    } else {
      participantsMedit.push({
        handler: newParticipant.handler,
        dog: newParticipant.dog,
        height: newParticipant.confirmedHeight,
        email: newParticipant.email,
        id: newParticipant.id,
      })
    }
  }

  editItem = editedParticipant => {
    const {participantsMinit, participantsMedit} = this

    let index = participantsMinit.findIndex(x => x.id === editedParticipant.id)

    if (index > -1) {
      participantsMinit[index] = {
        handler: editedParticipant.handler,
        dog: editedParticipant.dog,
        email: editedParticipant.email,
        id: editedParticipant.id,
      }

      index = -1
    } else {
      index = participantsMedit.findIndex(x => x.id === editedParticipant.id)

      participantsMedit[index] = {
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
      let filteredParticipantsMinit = this.participantsMinit.filter(
        participant => participant.id !== id
      )

      this.participantsMinit = filteredParticipantsMinit
    } else {
      let filteredParticipantsMedit = this.participantsMedit.filter(
        participant => participant.id !== id
      )

      this.participantsMedit = filteredParticipantsMedit
    }
  }
}

decorate(store, {
  participantsMinit: observable,
  participantsMedit: observable,
  errorMessage: observable,
  answer: observable,
  fetchParticipantsMinit: action,
  setParticipantsMinit: action,
  fetchParticipantsMedit: action,
  setParticipantsMedit: action,
  addItem: action,
  editItem: action,
  removeItem: action,
})

// Onko tämä oikein? Miten muuten välttää tekemästä new store joka tiedostossa,
// jos ei halua käyttää propseja, vaan importtaa storen suoraan?
export default new store()
