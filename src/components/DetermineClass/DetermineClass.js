import React from 'react'
import validator from 'validator'
import {observer} from 'mobx-react'

import DisplayAnswer from './DisplayAnswer'

import './determineclass.css'
import '../../main-style.css'

import store from '../../store'

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

    if (height >= 13 && height < 28) {
      this.setState({
        answer: store.answer.smallMini,
        answerClass: 'smallMini',
        showAnswer: true,
      })
    } else if (height >= 13 && height < 35) {
      this.setState({
        answer: store.answer.mini,
        answerClass: 'mini',
        showAnswer: true,
      })
    } else if (height >= 35 && height <= 42.99) {
      this.setState({
        answer: store.answer.medi,
        answerClass: 'medi',
        showAnswer: true,
      })
    } else if (validator.isEmpty(height)) {
      this.setState({
        answer: store.answer.invalidNumber,
        answerClass: 'other',
        showAnswer: true,
      })
    } else {
      this.setState({
        answer: store.answer.invalidHeight,
        answerClass: 'other',
        showAnswer: true,
      })
    }
  }

  render() {
    const {height, answer, answerClass, showAnswer} = this.state

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
            onChange={this.handleChange}
          />
          <input
            type="submit"
            value="Määritä säkäluokka!"
            onClick={this.handleAnswer}
          />
        </div>
        <DisplayAnswer
          answer={answer}
          answerClass={answerClass}
          showAnswer={showAnswer}
        />
      </div>
    )
  }
}

export default observer(DetermineClass)
