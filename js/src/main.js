(function (){
  'use strict'

  var Character = require('./character')
  var RaceHandler = require('./race-handler')

  $(document).ready(function (e) {
    var x = document.getElementById.bind(document)

    RaceHandler.setCharacter(Character)
      .handle(x('race'), x('race_traits'))
  })
})()
