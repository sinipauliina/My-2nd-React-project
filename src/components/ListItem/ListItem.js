import React from 'react'
import {decorate, observable, action} from 'mobx'
import {observer} from 'mobx-react'

import './listitem.css'
import '../../main-style.css'

import {isHandlerValid} from '../../helpers'
import {isDogValid} from '../../helpers'
import {isEmailValid} from '../../helpers'
import DesktopComponent from './DesktopComponent'
import MobileComponent from './MobileComponent'

class ListItem extends React.Component {
  // State
  windowWidth = window.innerWidth
  isInEditMode = false
  error = false
  errorMessage = ''
  handler = this.props.participant.handler
  dog = this.props.participant.dog
  email = this.props.participant.email
  id = this.props.participant.id

  handleResize = () => {
    this.windowWidth = window.innerWidth
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.handleResize)
  }

  handleChange = e => {
    this[e.target.name] = e.target.value
  }

  handleCancel = () => {
    this.isInEditMode = false
    this.error = false
    this.errorMessage = ''
    this.handler = this.props.participant.handler
    this.dog = this.props.participant.dog
    this.email = this.props.participant.email
    this.id = this.props.participant.id
  }

  isValid = () => {
    return (
      isHandlerValid(this.handler) &&
      isDogValid(this.dog) &&
      isEmailValid(this.email)
    )
  }

  handleSave = () => {
    if (this.isValid()) {
      this.props.editItem({
        handler: this.handler,
        dog: this.dog,
        email: this.email,
        id: this.id,
      })

      this.error = false
      this.errorMessage = ''
      this.isInEditMode = false
    } else {
      this.error = true
      this.errorMessage =
        'Muokkaus ei onnistunut. ' +
        (!isHandlerValid(this.handler)
          ? 'Virheellinen koiran ohjaaja (täytä etunimi ja sukunimi). '
          : '') +
        (!isDogValid(this.dog) ? 'Virheellinen koiran kutsumanimi. ' : '') +
        (!isEmailValid(this.email) ? 'Virheellinen sähköpostiosoite.' : '')
    }
  }

  changeEditMode = () => {
    this.isInEditMode = true
  }

  render() {
    const {removeItem} = this.props

    return this.windowWidth >= 767 ? (
      <DesktopComponent
        handler={this.handler}
        dog={this.dog}
        email={this.email}
        id={this.id}
        isInEditMode={this.isInEditMode}
        error={this.error}
        errorMessage={this.errorMessage}
        handleChange={this.handleChange}
        handleCancel={this.handleCancel}
        handleSave={this.handleSave}
        changeEditMode={this.changeEditMode}
        removeItem={removeItem}
      />
    ) : (
      <MobileComponent
        handler={this.handler}
        dog={this.dog}
        email={this.email}
        id={this.id}
        isInEditMode={this.isInEditMode}
        error={this.error}
        errorMessage={this.errorMessage}
        handleChange={this.handleChange}
        handleCancel={this.handleCancel}
        handleSave={this.handleSave}
        changeEditMode={this.changeEditMode}
        removeItem={removeItem}
      />
    )
  }
}

decorate(ListItem, {
  handler: observable,
  dog: observable,
  email: observable,
  id: observable,
  windowWidth: observable,
  isInEditMode: observable,
  error: observable,
  errorMessage: observable,
  handleResize: action,
  componentDidMount: action,
  componentWillUnmount: action,
  changeEditMode: action,
  handleCancel: action,
  handleSave: action,
  render: observer,
})

export default ListItem
