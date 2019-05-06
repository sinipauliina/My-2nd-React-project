import React from 'react'
import {decorate, observable, action} from 'mobx'
import {observer} from 'mobx-react'

import {isHandlerValid} from '../../helpers'
import {isDogValid} from '../../helpers'
import {isHeightValid} from '../../helpers'
import {isEmailValid} from '../../helpers'

import './addnewitem.css'
import '../../main-style.css'

import uuidv4 from 'uuid/v4'

class AddNewItem extends React.Component {
  // State
  handler = ''
  dog = ''
  confirmedHeight = ''
  email = ''
  error = false
  errorMessage = ''

  handleChange = e => {
    this[e.target.name] = e.target.value
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
      this.props.addItem({
        handler: this.handler,
        dog: this.dog,
        height: this.confirmedHeight,
        email: this.email,
        id: uuidv4(),
      })

      // Onko mahdollista saada tekstikentät muuten tyhjiksi lisäämisen jälkeen?
      this.handler = ''
      this.dog = ''
      this.confirmedHeight = ''
      this.email = ''
      this.error = false
      this.errorMessage = ''
    } else {
      this.error = true
      this.errorMessage =
        'Ilmoittautuminen ei onnistunut. ' +
        (!isHandlerValid(this.handler)
          ? 'Virheellinen koiran ohjaaja (täytä etunimi ja sukunimi). '
          : '') +
        (!isDogValid(this.dog) ? 'Virheellinen koiran kutsumanimi. ' : '') +
        (!isHeightValid(this.confirmedHeight)
          ? 'Virheellinen koiran säkäkorkeus. '
          : '') +
        (!isEmailValid(this.email) ? 'Virheellinen sähköpostiosoite.' : '')
    }
  }

  render() {
    return (
      <div className="form-addnew">
        <div className={this.error ? 'error-on' : 'error-off'}>
          {this.errorMessage}
        </div>
        <div>
          <label htmlFor="handler">Koiran ohjaaja:</label>
          <input
            type="text"
            name="handler"
            value={this.handler}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor="dog">Koiran kutsumanimi:</label>
          <input
            type="text"
            name="dog"
            value={this.dog}
            onChange={this.handleChange}
          />
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
            value={this.confirmedHeight}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Sähköpostiosoite:</label>
          <input
            type="email"
            name="email"
            value={this.email}
            onChange={this.handleChange}
          />
        </div>
        <input type="submit" value="Ilmoittaudu" onClick={this.handleSave} />
      </div>
    )
  }
}

decorate(AddNewItem, {
  handler: observable,
  dog: observable,
  confirmedHeight: observable,
  email: observable,
  error: observable,
  errorMessage: observable,
  handleChange: action,
  handleSave: action,
  render: observer,
})

export default AddNewItem
