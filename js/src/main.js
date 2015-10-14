(function (){
  'use strict'

  require('babel/register')
  var Character = require('./character')
  var DiceHandler = require('./dice-handler')
  var RaceHandler = require('./race-handler')

  $(document).ready(jQ => {
    var x = document.getElementById.bind(document)

    DiceHandler.setCharacter(Character)

    RaceHandler.setCharacter(Character)
      .handle(x('race'), x('race_traits'))
  })
})()
