import React from 'react'
import {observer} from 'mobx-react'

import './list.css'
import '../../main-style.css'

import ListItem from '../ListItem/ListItem'

const HEADER_KEYS = {
  HANDLER: 'handler',
  DOG: 'dog',
  EMAIL: 'email',
}

class List extends React.Component {
  state = {
    sortKey: HEADER_KEYS.HANDLER,
  }

  handleSort = e => {
    this.setState({sortKey: e.target.id})
  }

  render() {
    const {participants} = this.props
    const {sortKey} = this.state
    const {handleSort} = this

    const sortedParticipants = [...participants].sort((a, b) =>
      a[sortKey].localeCompare(b[sortKey])
    )

    return (
      <div className="list">
        <div className="list_header">
          <div id={HEADER_KEYS.HANDLER} onClick={handleSort}>
            Koiran ohjaaja{' '}
            <span
              className={
                sortKey === HEADER_KEYS.HANDLER ? 'arrow-on' : 'arrow-off'
              }
            >
              &darr;
            </span>
          </div>
          <div id={HEADER_KEYS.DOG} onClick={handleSort}>
            Koira{' '}
            <span
              className={sortKey === HEADER_KEYS.DOG ? 'arrow-on' : 'arrow-off'}
            >
              &darr;
            </span>
          </div>
          <div id={HEADER_KEYS.EMAIL} onClick={handleSort}>
            Sähköpostiosoite{' '}
            <span
              className={
                sortKey === HEADER_KEYS.EMAIL ? 'arrow-on' : 'arrow-off'
              }
            >
              &darr;
            </span>
          </div>
        </div>
        {sortedParticipants.map(x => (
          <ListItem key={x.id} participant={x} />
        ))}
      </div>
    )
  }
}

export default observer(List)
