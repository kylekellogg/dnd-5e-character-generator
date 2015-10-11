(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
module.exports = (function () {
  'use strict'

  function FormElementHandler () {
    this.input = null
    this.output = null
    this.character = null
  }

  FormElementHandler.prototype.setCharacter = function (character) {
    this.character = character
    return this
  }

  FormElementHandler.prototype.formatForDisplay = function (val) {}

  FormElementHandler.prototype.onChange = function (e) {
    this.formatForDisplay((e.currentTarget || {}).value || '')
  }

  FormElementHandler.prototype.onStart = function (e) {
    this.formatForDisplay((e.currentTarget || {}).value || '')
  }

  FormElementHandler.prototype.handle = function (el, output) {
    this.input = el
    this.output = output

    var cb = this.onStart.bind(this)
    this.input.addEventListener('change', cb)
    this.input.dispatchEvent(new Event('change'))
    this.input.removeEventListener('change', cb)

    this.input.addEventListener('change', this.onChange.bind(this))
    return this
  }

  return FormElementHandler
})()

},{}],4:[function(require,module,exports){
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

},{"./character":2,"./race-handler":5}],5:[function(require,module,exports){
module.exports = (function () {
  'use strict'

  var FormElementHandler = require('./form-element-handler')
  var AbilityScoreIncrease = require('./ability-score-increase')

  var baseRaceTable = {
      hill_dwarf: 'dwarf',
      mountain_dwarf: 'dwarf',
      high_elf: 'elf',
      wood_elf: 'elf',
      dark_elf_drow: 'elf',
      lightfoot: 'halfling',
      stout: 'halfling',
      calishite: 'human',
      chondathan: 'human',
      damaran: 'human',
      illuskan: 'human',
      mulan: 'human',
      rashemi: 'human',
      shou: 'human',
      tethyrian: 'human',
      turami: 'human',
      black: 'dragonborn',
      blue: 'dragonborn',
      brass: 'dragonborn',
      bronze: 'dragonborn',
      copper: 'dragonborn',
      gold: 'dragonborn',
      green: 'dragonborn',
      red: 'dragonborn',
      silver: 'dragonborn',
      white: 'dragonborn',
      forest_gnome: 'gnome',
      rock_gnome: 'gnome',
      half_elf: 'half_elf',
      half_orc: 'half_orc',
      tiefling: 'tiefling'
  }

  var baseRaceTraitTable = {
    dwarf: {},
    elf: {},
    halfling: {},
    human: {},
    dragonborn: {},
    gnome: {},
    half_elf: {},
    half_orc: {},
    tiefling: {}
  }

  var raceTraitTable = {
    hill_dwarf: {},
    mountain_dwarf: {},
    high_elf: {},
    wood_elf: {},
    dark_elf_drow: {},
    lightfoot: {},
    stout: {},
    calishite: {},
    chondathan: {},
    damaran: {},
    illuskan: {},
    mulan: {},
    rashemi: {},
    shou: {},
    tethyrian: {},
    turami: {},
    black: {},
    blue: {},
    brass: {},
    bronze: {},
    copper: {},
    gold: {},
    green: {},
    red: {},
    silver: {},
    white: {},
    forest_gnome: {},
    rock_gnome: {},
    half_elf: {},
    half_orc: {},
    tiefling: {}
  }

  function RaceHandler () {}

  RaceHandler.prototype = Object.create(FormElementHandler.prototype)
  RaceHandler.prototype.constructor = RaceHandler

  function formatRace (race) {
    return race.replace(/[\(\)]/g, '')
      .replace(/[\- ]/g, '_')
      .toLowerCase()
  }

  function determineBaseRace (race) {
    var formatted = formatRace(race)
    return baseRaceTable[formatted] || ''
  }

  function createBaseRaceTraits (race) {
    race = determineBaseRace(race)
    return baseRaceTraitTable[race]
  }

  RaceHandler.prototype.setCharacter = function (character) {
    FormElementHandler.prototype.setCharacter.call(this, character)

    baseRaceTraitTable.dwarf = $.extend(true, {}, character.traits, {
      age: {
        min: 50,
        max: 350
      },
      alignment: 'Lawful Good',
      speed: 25,
      languages: ['Common', 'Dwarvish']
    }).addAbilityScoreIncrease('constitution', 2)

    baseRaceTraitTable.elf = $.extend(true, {}, character.traits, {
      age: {
        min: 100,
        max: 750
      },
      alignment: 'Chaotic Good',
      languages: ['Common', 'Elvish']
    }).addAbilityScoreIncrease('dexterity', 2)

    baseRaceTraitTable.halfling = $.extend(true, {}, character.traits, {
      age: {
        min: 20,
        max: 250
      },
      alignment: 'Lawful Good',
      languages: ['Common', 'Halfling'],
      size: 'Small',
      speed: 25
    }).addAbilityScoreIncrease('dexterity', 2)

    baseRaceTraitTable.human = $.extend(true, {}, character.traits, {
      age: {
        min: 18,
        max: 75
      },
      alignment: 'Choose an alignment',
      languages: ['Common', 'One language of your choice']
    }).addAbilityScoreIncrease('strength', 1)
      .addAbilityScoreIncrease('dexterity', 1)
      .addAbilityScoreIncrease('constitution', 1)
      .addAbilityScoreIncrease('intelligence', 1)
      .addAbilityScoreIncrease('wisdom', 1)
      .addAbilityScoreIncrease('charisma', 1)

    baseRaceTraitTable.dragonborn = $.extend(true, {}, character.traits, {
      age: {
        min: 15,
        max: 80
      },
      alignment: 'Either extremely good or extremely evil',
      languages: ['Common', 'Draconic']
    }).addAbilityScoreIncrease('strength', 2)
      .addAbilityScoreIncrease('charisma', 1)

    baseRaceTraitTable.gnome = $.extend(true, {}, character.traits, {
      age: {
        min: 40,
        max: 500
      },
      alignment: 'Chaotic Good or Lawful Good',
      languages: ['Common', 'Gnomish'],
      size: 'Small',
      speed: 25
    }).addAbilityScoreIncrease('intelligence', 2)

    baseRaceTraitTable.half_elf = $.extend(true, {}, character.traits, {
      age: {
        min: 20,
        max: 180
      },
      alignment: 'Chaotic Neutral',
      languages: ['Common', 'Elvish']
    }).addAbilityScoreIncrease('charisma', 2)
      .addAbilityScoreIncrease('One ability of your choice', 1)
      .addAbilityScoreIncrease('One ability of your choice', 1)

    baseRaceTraitTable.half_orc = $.extend(true, {}, character.traits, {
      age: {
        min: 14,
        max: 75
      },
      alignment: 'Chaotic Good or Chaotic Evil',
      languages: ['Common', 'Orc']
    }).addAbilityScoreIncrease('strength', 2)
      .addAbilityScoreIncrease('constitution', 1)

    baseRaceTraitTable.tiefling = $.extend(true, {}, character.traits, {
      age: {
        min: 18,
        max: 85
      },
      alignment: 'Chaotic Evil',
      languages: ['Common', 'Infernal']
    }).addAbilityScoreIncrease('intelligence', 1)
      .addAbilityScoreIncrease('charisma', 2)

    raceTraitTable.hill_dwarf = $.extend(true, {}, baseRaceTraitTable.dwarf)
      .addAbilityScoreIncrease('wisdom', 1)
    raceTraitTable.mountain_dwarf = $.extend(true, {}, baseRaceTraitTable.dwarf)
      .addAbilityScoreIncrease('strength', 2)

    raceTraitTable.high_elf = $.extend(true, {}, baseRaceTraitTable.elf)
      .addAbilityScoreIncrease('intelligence', 1)
    raceTraitTable.wood_elf = $.extend(true, {}, baseRaceTraitTable.elf)
      .addAbilityScoreIncrease('wisdom', 1)
    raceTraitTable.dark_elf_drow = $.extend(true, {}, baseRaceTraitTable.elf)
      .addAbilityScoreIncrease('charisma', 1)

    raceTraitTable.lightfoot = $.extend(true, {}, baseRaceTraitTable.halfling)
      .addAbilityScoreIncrease('charisma', 1)
    raceTraitTable.stout = $.extend(true, {}, baseRaceTraitTable.halfling)
      .addAbilityScoreIncrease('constitution', 1)

    raceTraitTable.calishite = $.extend(true, {}, baseRaceTraitTable.human)
    raceTraitTable.chondathan = $.extend(true, {}, baseRaceTraitTable.human)
    raceTraitTable.damaran = $.extend(true, {}, baseRaceTraitTable.human)
    raceTraitTable.illuskan = $.extend(true, {}, baseRaceTraitTable.human)
    raceTraitTable.mulan = $.extend(true, {}, baseRaceTraitTable.human)
    raceTraitTable.rashemi = $.extend(true, {}, baseRaceTraitTable.human)
    raceTraitTable.shou = $.extend(true, {}, baseRaceTraitTable.human)
    raceTraitTable.tethyrian = $.extend(true, {}, baseRaceTraitTable.human)
    raceTraitTable.turami = $.extend(true, {}, baseRaceTraitTable.human)

    raceTraitTable.black = $.extend(true, {}, baseRaceTraitTable.dragonborn)
    raceTraitTable.blue = $.extend(true, {}, baseRaceTraitTable.dragonborn)
    raceTraitTable.brass = $.extend(true, {}, baseRaceTraitTable.dragonborn)
    raceTraitTable.bronze = $.extend(true, {}, baseRaceTraitTable.dragonborn)
    raceTraitTable.copper = $.extend(true, {}, baseRaceTraitTable.dragonborn)
    raceTraitTable.gold = $.extend(true, {}, baseRaceTraitTable.dragonborn)
    raceTraitTable.green = $.extend(true, {}, baseRaceTraitTable.dragonborn)
    raceTraitTable.red = $.extend(true, {}, baseRaceTraitTable.dragonborn)
    raceTraitTable.silver = $.extend(true, {}, baseRaceTraitTable.dragonborn)
    raceTraitTable.white = $.extend(true, {}, baseRaceTraitTable.dragonborn)

    raceTraitTable.forest_gnome = $.extend(true, {}, baseRaceTraitTable.gnome)
      .addAbilityScoreIncrease('dexterity', 1)
    raceTraitTable.rock_gnome = $.extend(true, {}, baseRaceTraitTable.gnome)
      .addAbilityScoreIncrease('constitution', 1)

    raceTraitTable.half_elf = $.extend(true, {}, baseRaceTraitTable.half_elf)
    raceTraitTable.half_orc = $.extend(true, {}, baseRaceTraitTable.half_orc)
    raceTraitTable.tiefling = $.extend(true, {}, baseRaceTraitTable.tiefling)

    return this
  }

  RaceHandler.prototype.onStart = function (e) {
    var val = (e.currentTarget || {}).value || ''
    var formatted = formatRace(val)

    this.character.traits = $.extend(true, {}, raceTraitTable[formatted])

    FormElementHandler.prototype.onStart.call(this, e)
  }

  RaceHandler.prototype.onChange = function (e) {
    var val = (e.currentTarget || {}).value || ''
    var formatted = formatRace(val)

    this.character.traits = $.extend(true, {}, raceTraitTable[formatted])

    FormElementHandler.prototype.onChange.call(this, e)
  }

  RaceHandler.prototype.formatForDisplay = function (val) {
    this.output.innerHTML = JSON.stringify(this.character.traits)
  }

  return new RaceHandler()
})()

},{"./ability-score-increase":1,"./form-element-handler":3}]},{},[4]);
