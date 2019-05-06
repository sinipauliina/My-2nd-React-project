import React from 'react'
import {decorate, observable} from 'mobx'
import {observer} from 'mobx-react'

import './list.css'
import '../../main-style.css'

import ListItem from '../ListItem/ListItem'

class List extends React.Component {
  // State
  headerKeys = {
    handler: 'handler',
    dog: 'dog',
    email: 'email',
  }
  sortKey = this.headerKeys.handler

  handleSort = e => {
    this.sortKey = e.target.id
  }

  render() {
    const {participants, changeEditMode, editItem, removeItem} = this.props

    const sortedParticipants = [...participants].sort((a, b) =>
      a[this.sortKey].localeCompare(b[this.sortKey])
    )

    return (
      <div className="list">
        <div className="list_header">
          <div id={this.headerKeys.handler} onClick={this.handleSort}>
            Koiran ohjaaja{' '}
            <span
              className={
                this.sortKey === this.headerKeys.handler
                  ? 'arrow-on'
                  : 'arrow-off'
              }
            >
              &darr;
            </span>
          </div>
          <div id={this.headerKeys.dog} onClick={this.handleSort}>
            Koira{' '}
            <span
              className={
                this.sortKey === this.headerKeys.dog ? 'arrow-on' : 'arrow-off'
              }
            >
              &darr;
            </span>
          </div>
          <div id={this.headerKeys.email} onClick={this.handleSort}>
            Sähköpostiosoite{' '}
            <span
              className={
                this.sortKey === this.headerKeys.email
                  ? 'arrow-on'
                  : 'arrow-off'
              }
            >
              &darr;
            </span>
          </div>
        </div>
        {sortedParticipants.map(x => (
          <ListItem
            key={x.id}
            participant={x}
            changeEditMode={changeEditMode}
            editItem={editItem}
            removeItem={removeItem}
          />
        ))}
      </div>
    )
  }
}

decorate(List, {
  headerKeys: observable,
  sortKey: observable,
  render: observer,
})

export default List
