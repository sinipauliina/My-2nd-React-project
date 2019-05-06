import React from 'react'
import {decorate, observable, action} from 'mobx'
import {observer} from 'mobx-react'

import DisplayAnswer from './DisplayAnswer'

import './determineclass.css'
import '../../main-style.css'

import validator from 'validator'

class DetermineClass extends React.Component {
  // State
  height = ''
  answer = ''
  answerClass = ''
  showAnswer = false

  handleChange = e => {
    this[e.target.name] = e.target.value
  }

  handleAnswer = () => {
    if (this.height >= 13 && this.height < 28) {
      this.answer =
        'Koirasi säkäkorkeus on ' +
        this.height +
        ' cm eli se on pikkumini. ' +
        'Se voi osallistua näissä kisoissa miniluokkaan.'
      this.answerClass = 'pikkumini'
      this.showAnswer = true
    } else if (this.height >= 13 && this.height < 35) {
      this.answer =
        'Koirasi säkäkorkeus on ' +
        this.height +
        ' cm eli se on mini. Se voi osallistua näissä kisoissa miniluokkaan.'
      this.answerClass = 'mini'
      this.showAnswer = true
    } else if (this.height >= 35 && this.height <= 42.99) {
      this.answer =
        'Koirasi säkäkorkeus on ' +
        this.height +
        ' cm eli se on medi. Se voi osallistua näissä kisoissa mediluokkaan.'
      this.answerClass = 'medi'
      this.showAnswer = true
    } else if (validator.isEmpty(this.height)) {
      this.answer = 'Et syöttänyt kelvollista lukua. :('
      this.answerClass = 'other'
      this.showAnswer = true
      console.log('luku: ' + this.height)
    } else {
      this.answer = 'Koirasi on väärän kokoinen näihin kisoihin. :('
      this.answerClass = 'other'
      this.showAnswer = true
    }
  }

  render() {
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
            value={this.height}
            onChange={this.handleChange}
          />
          <input
            type="submit"
            value="Määritä säkäluokka!"
            onClick={this.handleAnswer}
          />
        </div>
        <DisplayAnswer
          answer={this.answer}
          answerClass={this.answerClass}
          showAnswer={this.showAnswer}
        />
      </div>
    )
  }
}

decorate(DetermineClass, {
  height: observable,
  answer: observable,
  answerClass: observable,
  showAnswer: observable,
  handleChange: action,
  handleAnswer: action,
  render: observer,
})

export default DetermineClass
