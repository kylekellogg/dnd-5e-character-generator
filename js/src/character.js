module.exports = (function () {
  'use strict'

  function Character () {
    this.name = ''
    this.class = ''
    this.level = 1
    this.race = ''
    this.background = ''
    this.alignment = ''
    this.xp = 0

    this.stats = {
      strength: new Ability(0, false),
      dexterity: new Ability(0, false),
      constitution: new Ability(0, false),
      intelligence: new Ability(0, false),
      wisdom: new Ability(0, false),
      charisma: new Ability(0, false)
    }

    this.proficiency = 0

    this.passiveWisdom = 0

    this.ac = 0
    this.initiative = 0
    this.speed = 30

    this.hitDice = ''

    this.proficiencies = []
    this.languages = []
    this.equipment = []
    this.money = {
      cp: 0,
      sp: 0,
      ep: 0,
      gp: 0,
      pp: 0
    }
    this.attacks = []
    this.features = []
    this.personalityTraits = []
    this.ideals = []
    this.bonds = []
    this.flaws = []
    this.traits = new Traits()

    this.spellcastingAbility = ''
    this.spellSavesDC = 0
    this.spellAttackBonus = 0

    this.cantrips = []
    this.spells = []
  }

  function lookupModifier (value) {
    switch (value) {
      case 30: return 10;
      case 29:
      case 28: return 9;
      case 27:
      case 26: return 8;
      case 25:
      case 24: return 7;
      case 23:
      case 22: return 6;
      case 21:
      case 20: return 5;
      case 19:
      case 18: return 4;
      case 17:
      case 16: return 3;
      case 15:
      case 14: return 2;
      case 13:
      case 12: return 1;
      case 11:
      case 10: return 0;
      case 9:
      case 8: return -1;
      case 7:
      case 6: return -2;
      case 5:
      case 4: return -3;
      case 3:
      case 2: return -4;
      default: return -5;
    }
  }

  function Ability (value, proficiency) {
    this.value = value
    this.proficiency = proficiency === true
    this.modifier = lookupModifier(value)
  }

  Ability.prototype.updateValue = function (value) {
    this.value = value
    this.modifier = lookupModifier(value)
  }

  Ability.prototype.updateProficiency = function (proficient) {
    this.proficiency = proficient === true
  }

  function Traits () {
    this.abilityScoreIncreases = []
    this.age = {
      min: 0,
      max: 0
    }
    this.alignment = 'True Neutral'
    this.size = 'Medium'
    this.speed = 30
    this.languages = ['Common']
  }

  Traits.prototype.addAbilityScoreIncrease = function (ability, value) {
    this.abilityScoreIncreases.push({ability:ability, value:value})
    return this
  }

  return new Character();
})()