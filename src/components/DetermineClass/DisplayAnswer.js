import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import './determineclass.css'
import '../../main-style.css'

class DisplayAnswer extends React.Component {
  render() {
    const {answer, answerClass, showAnswer} = this.props

    return showAnswer ? (
      <div className="answer">
        <h3>Vastaus</h3>
        <p>{answer}</p>
        {answerClass !== 'other' ? (
          <ul className="action-links">
            <li>
              <Link to="/ilmoittautuminen/">Ilmoittaudu!</Link>
            </li>
          </ul>
        ) : (
          ''
        )}
      </div>
    ) : (
      ''
    )
  }
}

export default DisplayAnswer
