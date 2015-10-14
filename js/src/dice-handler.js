module.exports = (function () {
  'use strict'

  var FormElementHandler = require('./form-element-handler')
  var Random = require('random-js')

  var dice = []
  var totals = []
  var r = new Random(Random.engines.mt19937().autoSeed())
  var clickCounter = 3

  function DiceHandler () {}

  DiceHandler.prototype = Object.create(FormElementHandler.prototype)
  DiceHandler.prototype.constructor = DiceHandler

  function rollD6 () {
    return r.integer(1, 6)
  }

  function highlightActiveValuesForIndex (vals, idx) {
    var tmps = vals.slice()

    dice
      .slice()
      .splice(idx - 4, 5)
      .forEach(function (el) {
        var i = tmps.indexOf(+el.value)

        if (i > -1) {
          el.style.border = '1px solid red'
          tmps.splice(i, 1)
        }
      })
  }

  function add (a, b) {
    return a + b
  }

  function subtract (a, b) {
    return b - a
  }

  function onClick (e) {
    if (--clickCounter <= 0) {
      e.currentTarget.setAttribute('disabled', 'disabled')
    }

    var vals = []
    var totalsIdx = 0

    dice.forEach(function (el, idx) {
      var val = rollD6()
      el.value = val
      el.style.border = 'none'

      vals.push(val)

      if (idx !== 0 && (idx + 1) % 5 === 0) {
        vals.sort(subtract).splice(3, 2)

        highlightActiveValuesForIndex(vals, idx)

        totals[totalsIdx].value = vals.reduce(add, 0)
        vals = []
        totalsIdx++
      }
    })
  }

  function arrayOfLength (len) {
    var arr = []
    for (var i = 0; i < len; i++) {
      arr.push(0)
    }
    return arr
  }

  function addElementWithPrefix (arr, prefix) {
    return function (u, i) {
      arr.push(document.getElementById(prefix + (i+1)))
    }
  }

  DiceHandler.prototype.setCharacter = function (character) {
    FormElementHandler.prototype.setCharacter.call(this, character)

    dice = []
    arrayOfLength(30).forEach(addElementWithPrefix(dice, 'dice-'))

    dice.forEach(function (el) {
      el.value = 0
      el.style.border = 'none'
    })

    totals = []
    arrayOfLength(6).forEach(addElementWithPrefix(totals, 'total-'))

    clickCounter = 3

    var btn = document.getElementById('dice-btn')

    btn.removeEventListener('click')
    btn.addEventListener('click', onClick.bind(this))
  }

  return new DiceHandler()
})()
