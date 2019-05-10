import {observable} from 'mobx'

class store {
  participants = []
  
  setParticipants = (newParticipants) => {
    this.participants = newParticipants
  }
  
  
  fetchParticipants = () => {
    /* Fetch here
     * .then(res = > this.setParticipants(res.data))
     * ...
     */
  }
}

export default store
