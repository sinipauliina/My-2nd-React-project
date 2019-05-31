import React from 'react'
import {observer} from 'mobx-react'

import './listitem.css'
import '../../main-style.css'

import {isHandlerValid} from '../../helpers'
import {isDogValid} from '../../helpers'
import {isEmailValid} from '../../helpers'
import ListItemDesktop from './ListItemDesktop'
import ListItemMobile from './ListItemMobile'

import {ERROR_MESSAGE} from '../../constants'
import store from '../../store'

class ListItem extends React.Component {
  state = {
    windowWidth: window.innerWidth,
    isInEditMode: false,
    error: false,
    errorMessageWhole: '',
    handler: this.props.participant.handler,
    dog: this.props.participant.dog,
    email: this.props.participant.email,
    id: this.props.participant.id,
  }

  handleResize = () => {
    this.setState({windowWidth: window.innerWidth})
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.handleResize)
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleCancel = () => {
    const {handler, dog, email, id} = this.props.participant

    this.setState({
      isInEditMode: false,
      error: false,
      errorMessageWhole: '',
      handler: handler,
      dog: dog,
      email: email,
      id: id,
    })
  }

  isValid = () => {
    const {handler, dog, email} = this.state

    return isHandlerValid(handler) && isDogValid(dog) && isEmailValid(email)
  }

  handleSave = () => {
    const {handler, dog, email, id} = this.state
    const {
      DID_NOT_SUCCEED_EDITING,
      INVALID_HANDLER,
      INVALID_DOG,
      INVALID_EMAIL,
    } = ERROR_MESSAGE

    if (this.isValid()) {
      store.editItem({
        handler,
        dog,
        email,
        id,
      })

      this.setState({
        error: false,
        errorMessageWhole: '',
        isInEditMode: false,
      })
    } else {
      const newErrorMessage =
        DID_NOT_SUCCEED_EDITING +
        (!isHandlerValid(handler) ? INVALID_HANDLER : '') +
        (!isDogValid(dog) ? INVALID_DOG : '') +
        (!isEmailValid(email) ? INVALID_EMAIL : '')

      this.setState({
        error: true,
        errorMessageWhole: newErrorMessage,
      })
    }
  }

  changeEditMode = () => {
    this.setState({isInEditMode: true})
  }

  render() {
    const {
      handler,
      dog,
      email,
      id,
      windowWidth,
      isInEditMode,
      error,
      errorMessageWhole,
    } = this.state
    const {handleChange, handleCancel, handleSave, changeEditMode} = this

    return windowWidth >= 767 ? (
      <ListItemDesktop
        handler={handler}
        dog={dog}
        email={email}
        id={id}
        isInEditMode={isInEditMode}
        error={error}
        errorMessageWhole={errorMessageWhole}
        handleChange={handleChange}
        handleCancel={handleCancel}
        handleSave={handleSave}
        changeEditMode={changeEditMode}
      />
    ) : (
      <ListItemMobile
        handler={handler}
        dog={dog}
        email={email}
        id={id}
        isInEditMode={isInEditMode}
        error={error}
        errorMessageWhole={errorMessageWhole}
        handleChange={handleChange}
        handleCancel={handleCancel}
        handleSave={handleSave}
        changeEditMode={changeEditMode}
      />
    )
  }
}

export default observer(ListItem)
