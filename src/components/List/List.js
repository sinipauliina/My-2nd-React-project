import React from 'react'
import {observer} from 'mobx-react'

import './list.css'
import '../../main-style.css'

import ListItem from '../ListItem/ListItem'

const headerKeys = {
  handler: 'handler',
  dog: 'dog',
  email: 'email',
}

class List extends React.Component {
  state = {
    sortKey: headerKeys.handler,
  }

  handleSort = e => {
    this.setState({sortKey: e.target.id})
  }

  render() {
    const {participants} = this.props
    const {sortKey} = this.state

    const sortedParticipants = [...participants].sort((a, b) =>
      a[sortKey].localeCompare(b[sortKey])
    )

    return (
      <div className="list">
        <div className="list_header">
          <div id={headerKeys.handler} onClick={this.handleSort}>
            Koiran ohjaaja{' '}
            <span
              className={
                sortKey === headerKeys.handler ? 'arrow-on' : 'arrow-off'
              }
            >
              &darr;
            </span>
          </div>
          <div id={headerKeys.dog} onClick={this.handleSort}>
            Koira{' '}
            <span
              className={sortKey === headerKeys.dog ? 'arrow-on' : 'arrow-off'}
            >
              &darr;
            </span>
          </div>
          <div id={headerKeys.email} onClick={this.handleSort}>
            Sähköpostiosoite{' '}
            <span
              className={
                sortKey === headerKeys.email ? 'arrow-on' : 'arrow-off'
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
