module.exports = (function () {
  'use strict'

  function AbilityScoreIncrease (ability, value) {
    this.ability = ability
    this.value = value
  }

  AbilityScoreIncrease.prototype.STR = 'Strength'
  AbilityScoreIncrease.prototype.DEX = 'Dexterity'
  AbilityScoreIncrease.prototype.CON = 'Constitution'
  AbilityScoreIncrease.prototype.INT = 'Intelligence'
  AbilityScoreIncrease.prototype.WIS = 'Wisdom'
  AbilityScoreIncrease.prototype.CHA = 'Charisma'

  return AbilityScoreIncrease
})()