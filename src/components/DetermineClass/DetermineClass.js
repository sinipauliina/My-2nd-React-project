import React from 'react'
import validator from 'validator'
import {observer} from 'mobx-react'

import DisplayAnswer from './DisplayAnswer'

import './determineclass.css'
import '../../main-style.css'

import {ANSWER} from '../../constants'

class DetermineClass extends React.Component {
  state = {
    height: '',
    answer: '',
    answerClass: '',
    showAnswer: false,
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleAnswer = () => {
    const {height} = this.state
    const {SMALL_MINI, MINI, MEDI, INVALID_HEIGHT, INVALID_NUMBER} = ANSWER

    if (height >= 13 && height < 28) {
      this.setState({
        answer: SMALL_MINI,
        answerClass: 'smallMini',
        showAnswer: true,
      })
    } else if (height >= 13 && height < 35) {
      this.setState({
        answer: MINI,
        answerClass: 'mini',
        showAnswer: true,
      })
    } else if (height >= 35 && height <= 42.99) {
      this.setState({
        answer: MEDI,
        answerClass: 'medi',
        showAnswer: true,
      })
    } else if (validator.isEmpty(height)) {
      this.setState({
        answer: INVALID_HEIGHT,
        answerClass: 'other',
        showAnswer: true,
      })
    } else {
      this.setState({
        answer: INVALID_NUMBER,
        answerClass: 'other',
        showAnswer: true,
      })
    }
  }

  render() {
    const {height, answer, answerClass, showAnswer} = this.state
    const {handleChange, handleAnswer} = this

    return (
      <div>
        <p>
          Syötä alla olevaan kenttään koirasi säkäkorkeus senttimetreinä, niin
          saat vastaukseksi, mihin säkäluokkaan koirasi kuuluu. :) Näihin
          kisoihin voivat osallistua vain koirat, joiden säkäkorkeus on enintään
          42,99 cm.
        </p>
        <div className="form-determineClass">
          <input
            type="number"
            size="5"
            min="13"
            max="42.99"
            step="0.01"
            name="height"
            value={height}
            onChange={handleChange}
          />
          <input
            type="submit"
            value="Määritä säkäluokka!"
            onClick={handleAnswer}
          />
        </div>
        {showAnswer && (
          <DisplayAnswer answer={answer} answerClass={answerClass} />
        )}
      </div>
    )
  }
}

export default observer(DetermineClass)
