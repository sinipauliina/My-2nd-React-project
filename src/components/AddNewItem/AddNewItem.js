import React from 'react'
import uuidv4 from 'uuid/v4'
import {observer} from 'mobx-react'

import './addnewitem.css'
import '../../main-style.css'

import {isHandlerValid} from '../../helpers'
import {isDogValid} from '../../helpers'
import {isHeightValid} from '../../helpers'
import {isEmailValid} from '../../helpers'

import {ERROR_MESSAGE} from '../../constants'
import store from '../../store'

class AddNewItem extends React.Component {
  state = {
    handler: '',
    dog: '',
    confirmedHeight: '',
    email: '',
    error: false,
    errorMessageWhole: '',
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  isValid = () => {
    const {handler, dog, email} = this.state

    return isHandlerValid(handler) && isDogValid(dog) && isEmailValid(email)
  }

  handleSave = () => {
    const {handler, dog, confirmedHeight, email} = this.state
    const {
      DID_NOT_SUCCEED_REGISTRATION,
      INVALID_HANDLER,
      INVALID_DOG,
      INVALID_HEIGHT,
      INVALID_EMAIL,
    } = ERROR_MESSAGE

    if (this.isValid()) {
      store.addItem({
        handler,
        dog,
        confirmedHeight,
        email,
        id: uuidv4(),
      })

      this.setState({
        handler: '',
        dog: '',
        confirmedHeight: '',
        email: '',
        error: false,
        errorMessage: '',
      })
    } else {
      const newErrorMessage =
        DID_NOT_SUCCEED_REGISTRATION +
        (!isHandlerValid(handler) ? INVALID_HANDLER : '') +
        (!isDogValid(dog) ? INVALID_DOG : '') +
        (!isHeightValid(confirmedHeight) ? INVALID_HEIGHT : '') +
        (!isEmailValid(email) ? INVALID_EMAIL : '')

      this.setState({
        error: true,
        errorMessageWhole: newErrorMessage,
      })
    }
  }

  render() {
    const {
      handler,
      dog,
      confirmedHeight,
      email,
      error,
      errorMessageWhole,
    } = this.state
    const {handleChange, handleSave} = this

    return (
      <div className="form-addnew">
        <div className={error ? 'error-on' : 'error-off'}>
          {errorMessageWhole}
        </div>
        <div>
          <label htmlFor="handler">Koiran ohjaaja:</label>
          <input
            type="text"
            name="handler"
            value={handler}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="dog">Koiran kutsumanimi:</label>
          <input type="text" name="dog" value={dog} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="confirmedHeight">Koiran säkäkorkeus:</label>
          <input
            type="number"
            size="5"
            min="13"
            max="42.99"
            step="0.01"
            name="confirmedHeight"
            value={confirmedHeight}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Sähköpostiosoite:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <input type="submit" value="Ilmoittaudu" onClick={handleSave} />
      </div>
    )
  }
}

export default observer(AddNewItem)
