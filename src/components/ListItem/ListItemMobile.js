import React from 'react'
import {observer} from 'mobx-react'

import './listitem.css'
import '../../main-style.css'

import store from '../../store'

class ListItemMobile extends React.Component {
  render() {
    const {
      isInEditMode,
      error,
      errorMessageWhole,
      handler,
      dog,
      email,
      id,
      handleCancel,
      handleSave,
      changeEditMode,
      handleChange,
    } = this.props
    const {removeItem} = store

    return isInEditMode ? (
      <div className="form-listitem">
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
            required
          />
        </div>
        <div>
          <label htmlFor="dog">Koiran kutsumanimi:</label>
          <input
            type="text"
            name="dog"
            value={dog}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Sähköpostiosoite:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <span className="fas fa-times" onClick={handleCancel} />
          <span className="fas fa-check" onClick={handleSave} />
        </div>
      </div>
    ) : (
      <div className="listitem">
        <div>
          <div>
            <span className="bold">Koiran ohjaaja:</span> {handler}
          </div>
          <div>
            <span className="bold">Koira:</span> {dog}
          </div>
          <div>
            <span className="bold">Sähköpostiosoite:</span> {email}
          </div>
        </div>
        <div>
          <span className="fas fa-pen" onClick={changeEditMode} />
          <span className="fas fa-trash" onClick={() => removeItem(id)} />
        </div>
      </div>
    )
  }
}

export default observer(ListItemMobile)
