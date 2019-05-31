import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import {ROUTES} from '../../constants'

import './determineclass.css'
import '../../main-style.css'

class DisplayAnswer extends React.Component {
  render() {
    const {answer, answerClass} = this.props

    return (
      <div className="answer">
        <h3>Vastaus</h3>
        <p>{answer}</p>
        {answerClass !== 'other' && (
          <ul className="action-links">
            <li>
              <Link to={ROUTES.PARTICIPANTS}>Ilmoittaudu!</Link>
            </li>
          </ul>
        )}
      </div>
    )
  }
}

export default DisplayAnswer
