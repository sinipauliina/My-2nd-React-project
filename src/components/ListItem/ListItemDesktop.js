import React from 'react'
import {observer} from 'mobx-react'

import './listitem.css'
import '../../main-style.css'

import store from '../../store'

class ListItemDesktop extends React.Component {
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
        <div className="form">
          <div>
            <input
              type="text"
              name="handler"
              value={handler}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="dog"
              value={dog}
              onChange={handleChange}
              required
            />
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
      </div>
    ) : (
      <div className="listitem">
        <div>
          <div>{handler}</div>
          <div>{dog}</div>
          <div>{email}</div>
        </div>
        <div>
          <span className="fas fa-pen" onClick={changeEditMode} />
          <span className="fas fa-trash" onClick={() => removeItem(id)} />
        </div>
      </div>
    )
  }
}

export default observer(ListItemDesktop)
