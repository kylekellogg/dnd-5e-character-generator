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
      .addFeature('Darkvision', '60 feet')
      .addFeature('Dwarven Resilience', 'You have advantage on saving throws against poison, and you have resistance against poison damage (explained in chapter 9 of Players Handbook).')
      .addFeature('Dwarven Combat Training', 'You have proficiency with the battleaxe, handaxe, throwing hammer, and warhammer.')
      .addFeature('Tool Proficiency', 'You gain proficiency with the artisan\'s tools of your choice: smith\'s tools, brewer\'s supplies, or mason\'s tools.')
      .addFeature('Stonecunning', 'Whenever you make an Intelligence (History) check related to the origin of stonework, you are considered proficient in the History skill and add double your proficiency bonus to the check, instaed of your normal proficiency bonus.')

    baseRaceTraitTable.elf = $.extend(true, {}, character.traits, {
      age: {
        min: 100,
        max: 750
      },
      alignment: 'Chaotic Good',
      languages: ['Common', 'Elvish']
    }).addAbilityScoreIncrease('dexterity', 2)
      .addFeature('Darkvision', '60 feet')
      .addFeature('Keen Senses', 'You have proficiency in the Perception skill.')
      .addFeature('Fey Ancestry', 'You have advantage on saving throws against being charmed, and magic can\'t put you to sleep.')
      .addFeature('Trance', 'Elves don\'t need to sleep. Instead, they meditate deeply, remaining semiconscious, for 4 hours a day. (The Common word for such meditation is "trance.") While meditating, you can dream after a fashion; such dreams are actually mental exercises that have become reflexive through years of practice. After resting in this way, you gain the same benefit that a human does from 8 hours of sleep.')

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
      .addFeature('Lucky', 'When you roll a 1 on an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll.')
      .addFeature('Brave', 'You have advantage on saving throws against being frightened.')
      .addFeature('Halfling Nimbleness', 'You can move through the space of any creature that is of a size larger than yours.')

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
      .addFeature('Draconic Ancestry', 'You have draconic ancestry.')

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
      .addFeature('Darkvision', '60 feet')
      .addFeature('Gnome Cunning', 'You have advantage on all Intelligence, Wisdom, and Charisma saving throws against magic.')

    baseRaceTraitTable.half_elf = $.extend(true, {}, character.traits, {
      age: {
        min: 20,
        max: 180
      },
      alignment: 'Chaotic Neutral',
      languages: ['Common', 'Elvish', 'One language of your choice']
    }).addAbilityScoreIncrease('charisma', 2)
      .addAbilityScoreIncrease('One ability of your choice', 1)
      .addAbilityScoreIncrease('One ability of your choice', 1)
      .addFeature('Darkvision', '30 feet')
      .addFeature('Fey Ancestry', 'You have advantage on saving throws against being charmed, and magic can\'t put you to sleep.')
      .addFeature('Skill Versatility', 'You gain proficiency in two skills of your choice.')

    baseRaceTraitTable.half_orc = $.extend(true, {}, character.traits, {
      age: {
        min: 14,
        max: 75
      },
      alignment: 'Chaotic Good or Chaotic Evil',
      languages: ['Common', 'Orc']
    }).addAbilityScoreIncrease('strength', 2)
      .addAbilityScoreIncrease('constitution', 1)
      .addFeature('Darkvision', '60 feet')
      .addFeature('Menacing', 'You gain proficiency in the Intimidation skill.')
      .addFeature('Relentless Endurance', 'When you are reduced to 0 hit points but not killed outright, you can drop to 1 hit point instead. You can\'t use this feature again until you finish a long rest.')
      .addFeature('Savage Attacks', 'When you score a critical hit with a melee weapon attack, you can roll one of the weapon\'s damage dice one additional time and add it to the extra damage of the critical hit.')

    baseRaceTraitTable.tiefling = $.extend(true, {}, character.traits, {
      age: {
        min: 18,
        max: 85
      },
      alignment: 'Chaotic Evil',
      languages: ['Common', 'Infernal']
    }).addAbilityScoreIncrease('intelligence', 1)
      .addAbilityScoreIncrease('charisma', 2)
      .addFeature('Darkvision', '60 feet')
      .addFeature('Hellish Resistance', 'You have resistance to fire damage.')
      .addFeature('Infernal Legacy', 'You know the thaumaturgy cantrip. Once you reach 3rd level, you can cast the hellish rebuke spell once per day as a 2nd-level spell. Once you reach 5th level, you can also cast the darkness spell once per day. Charisma is your spellcasting ability for these spells.')

    raceTraitTable.hill_dwarf = $.extend(true, {}, baseRaceTraitTable.dwarf)
      .addAbilityScoreIncrease('wisdom', 1)
      .addFeature('Dwarven Toughness', 'Your hit point maximum increases by 1, and it increases by 1 every time you gain a level.')
    raceTraitTable.mountain_dwarf = $.extend(true, {}, baseRaceTraitTable.dwarf)
      .addAbilityScoreIncrease('strength', 2)
      .addFeature('Dwarven Armor Training', 'You have proficiency with high and medium armor.')

    raceTraitTable.high_elf = $.extend(true, {}, baseRaceTraitTable.elf)
      .addAbilityScoreIncrease('intelligence', 1)
      .addFeature('Elf Weapon Training', 'You have proficiency with the longsword, shortsword, shortbow, and longbow.')
      .addFeature('Cantrip', 'You know one cantrip of your choice from the wizard spell list. Intelligence is your spellcasting ability for it.')
      .addFeature('Extra Language', 'You can speak, read, and write one extra language of your choice.')
    raceTraitTable.wood_elf = $.extend(true, {}, baseRaceTraitTable.elf, {speed: 35})
      .addAbilityScoreIncrease('wisdom', 1)
      .addFeature('Elf Weapon Training', 'You have proficiency with the longsword, shortsword, shortbow, and longbow.')
      .addFeature('Fleet of Foot', 'Your base walking speed increases to 35 feet.')
      .addFeature('Mask of the Wild', 'You can attempt to hide even when you are only lightly obscured by foliage, heavy rain, falling snow, mist, and other natural phenomena.')
    raceTraitTable.dark_elf_drow = $.extend(true, {}, baseRaceTraitTable.elf)
      .addAbilityScoreIncrease('charisma', 1)
      .addFeature('Superior Darkvision', 'Your darkvision has a radius of 120 feet.')
      .addFeature('Sunlight Sensitivity', 'You have disadvantage on attack rolls and on Wisdom (Perception) checks that rely on sight when you, the target of your attack, or whatever you are trying to perceive is in direct sunlight.')
      .addFeature('Drow Magic', 'You know the dancing lights cantrip. When you reach 3rd level, you can cast the faerie fire spell once per day. When you reach 5th level, you can also cast the darkness spell once per day. Charisma is your spellcasting ability for these spells.')
      .addFeature('Drow Weapon Training', 'You have proficiency with rapiers, shortswords, and hand crossbows.')

    raceTraitTable.lightfoot = $.extend(true, {}, baseRaceTraitTable.halfling)
      .addAbilityScoreIncrease('charisma', 1)
      .addFeature('Naturally Stealthy', 'You can attempt to hide even when you are obscured only by a creature that is at least one size larger than you.')
    raceTraitTable.stout = $.extend(true, {}, baseRaceTraitTable.halfling)
      .addAbilityScoreIncrease('constitution', 1)
      .addFeature('Stout Resilience', 'You have advantage on saving throws against poison, and you have resistance against poison damage.')

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
      .addFeature('Breath Weapon', 'You can use your action to exhale destructive energy. Your draconic ancestry allows you to use a 5 by 30 ft. line (Dexterity save) of Acid type damage. When you use your breath weapon, each creature in the area of the exhalation must make a saving throw, the type of which is determined by your draconic ancestry. The DC for this saving throw equals 8 + your Constitution modifier + your proficiency bonus. A creature takes 2d6 damage on a failed save, and half as much damage on a successful one. The damage increases to 3d6 at 6th level, 4d6 at 11th level, and 5d6 at 16th level.')
      .addFeature('Damage Resistance', 'You have resistance to Acid damage.')
    raceTraitTable.blue = $.extend(true, {}, baseRaceTraitTable.dragonborn)
      .addFeature('Breath Weapon', 'You can use your action to exhale destructive energy. Your draconic ancestry allows you to use a 5 by 30 ft. line (Dexterity save) of Lightning type damage. When you use your breath weapon, each creature in the area of the exhalation must make a saving throw, the type of which is determined by your draconic ancestry. The DC for this saving throw equals 8 + your Constitution modifier + your proficiency bonus. A creature takes 2d6 damage on a failed save, and half as much damage on a successful one. The damage increases to 3d6 at 6th level, 4d6 at 11th level, and 5d6 at 16th level.')
      .addFeature('Damage Resistance', 'You have resistance to Lightning damage.')
    raceTraitTable.brass = $.extend(true, {}, baseRaceTraitTable.dragonborn)
      .addFeature('Breath Weapon', 'You can use your action to exhale destructive energy. Your draconic ancestry allows you to use a 5 by 30 ft. line (Dexterity save) of Fire type damage. When you use your breath weapon, each creature in the area of the exhalation must make a saving throw, the type of which is determined by your draconic ancestry. The DC for this saving throw equals 8 + your Constitution modifier + your proficiency bonus. A creature takes 2d6 damage on a failed save, and half as much damage on a successful one. The damage increases to 3d6 at 6th level, 4d6 at 11th level, and 5d6 at 16th level.')
      .addFeature('Damage Resistance', 'You have resistance to Fire damage.')
    raceTraitTable.bronze = $.extend(true, {}, baseRaceTraitTable.dragonborn)
      .addFeature('Breath Weapon', 'You can use your action to exhale destructive energy. Your draconic ancestry allows you to use a 5 by 30 ft. line (Dexterity save) of Lightning type damage. When you use your breath weapon, each creature in the area of the exhalation must make a saving throw, the type of which is determined by your draconic ancestry. The DC for this saving throw equals 8 + your Constitution modifier + your proficiency bonus. A creature takes 2d6 damage on a failed save, and half as much damage on a successful one. The damage increases to 3d6 at 6th level, 4d6 at 11th level, and 5d6 at 16th level.')
      .addFeature('Damage Resistance', 'You have resistance to Lightning damage.')
    raceTraitTable.copper = $.extend(true, {}, baseRaceTraitTable.dragonborn)
      .addFeature('Breath Weapon', 'You can use your action to exhale destructive energy. Your draconic ancestry allows you to use a 5 by 30 ft. line (Dexterity save) of Acid type damage. When you use your breath weapon, each creature in the area of the exhalation must make a saving throw, the type of which is determined by your draconic ancestry. The DC for this saving throw equals 8 + your Constitution modifier + your proficiency bonus. A creature takes 2d6 damage on a failed save, and half as much damage on a successful one. The damage increases to 3d6 at 6th level, 4d6 at 11th level, and 5d6 at 16th level.')
      .addFeature('Damage Resistance', 'You have resistance to Acid damage.')
    raceTraitTable.gold = $.extend(true, {}, baseRaceTraitTable.dragonborn)
      .addFeature('Breath Weapon', 'You can use your action to exhale destructive energy. Your draconic ancestry allows you to use a 15 ft. cone (Dexterity save) of Fire type damage. When you use your breath weapon, each creature in the area of the exhalation must make a saving throw, the type of which is determined by your draconic ancestry. The DC for this saving throw equals 8 + your Constitution modifier + your proficiency bonus. A creature takes 2d6 damage on a failed save, and half as much damage on a successful one. The damage increases to 3d6 at 6th level, 4d6 at 11th level, and 5d6 at 16th level.')
      .addFeature('Damage Resistance', 'You have resistance to Fire damage.')
    raceTraitTable.green = $.extend(true, {}, baseRaceTraitTable.dragonborn)
      .addFeature('Breath Weapon', 'You can use your action to exhale destructive energy. Your draconic ancestry allows you to use a 15 ft. cone (Constitution save) of Poison type damage. When you use your breath weapon, each creature in the area of the exhalation must make a saving throw, the type of which is determined by your draconic ancestry. The DC for this saving throw equals 8 + your Constitution modifier + your proficiency bonus. A creature takes 2d6 damage on a failed save, and half as much damage on a successful one. The damage increases to 3d6 at 6th level, 4d6 at 11th level, and 5d6 at 16th level.')
      .addFeature('Damage Resistance', 'You have resistance to Poison damage.')
    raceTraitTable.red = $.extend(true, {}, baseRaceTraitTable.dragonborn)
      .addFeature('Breath Weapon', 'You can use your action to exhale destructive energy. Your draconic ancestry allows you to use a 15 ft. cone (Dexterity save) of Fire type damage. When you use your breath weapon, each creature in the area of the exhalation must make a saving throw, the type of which is determined by your draconic ancestry. The DC for this saving throw equals 8 + your Constitution modifier + your proficiency bonus. A creature takes 2d6 damage on a failed save, and half as much damage on a successful one. The damage increases to 3d6 at 6th level, 4d6 at 11th level, and 5d6 at 16th level.')
      .addFeature('Damage Resistance', 'You have resistance to Fire damage.')
    raceTraitTable.silver = $.extend(true, {}, baseRaceTraitTable.dragonborn)
      .addFeature('Breath Weapon', 'You can use your action to exhale destructive energy. Your draconic ancestry allows you to use a 15 ft. cone (Constitution save) of Cold type damage. When you use your breath weapon, each creature in the area of the exhalation must make a saving throw, the type of which is determined by your draconic ancestry. The DC for this saving throw equals 8 + your Constitution modifier + your proficiency bonus. A creature takes 2d6 damage on a failed save, and half as much damage on a successful one. The damage increases to 3d6 at 6th level, 4d6 at 11th level, and 5d6 at 16th level.')
      .addFeature('Damage Resistance', 'You have resistance to Cold damage.')
    raceTraitTable.white = $.extend(true, {}, baseRaceTraitTable.dragonborn)
      .addFeature('Breath Weapon', 'You can use your action to exhale destructive energy. Your draconic ancestry allows you to use a 15 ft. cone (Constitution save) of Cold type damage. When you use your breath weapon, each creature in the area of the exhalation must make a saving throw, the type of which is determined by your draconic ancestry. The DC for this saving throw equals 8 + your Constitution modifier + your proficiency bonus. A creature takes 2d6 damage on a failed save, and half as much damage on a successful one. The damage increases to 3d6 at 6th level, 4d6 at 11th level, and 5d6 at 16th level.')
      .addFeature('Damage Resistance', 'You have resistance to Cold damage.')

    raceTraitTable.forest_gnome = $.extend(true, {}, baseRaceTraitTable.gnome)
      .addAbilityScoreIncrease('dexterity', 1)
      .addFeature('Natural Illusionist', 'You know the minor illusion cantrip. Intelligence is your spellcasting ability for it.')
      .addFeature('Speak with Small Beasts', 'Through sounds and gestures, you can communicate simple ideas with Small or smaller beasts. Forest gnomes love animals and often keep squirrels, badgers, rabbits, moles, woodpeckers, and other creatures as beloved pets.')
    raceTraitTable.rock_gnome = $.extend(true, {}, baseRaceTraitTable.gnome)
      .addAbilityScoreIncrease('constitution', 1)
      .addFeature('Artificer\'s Lore', 'Whenever you make an Intelligence (History) check related to magic items, alchemical objects, or technological devices, you can add twice your proficiency bonus, instead of any proficiency bonus you normally apply.')
      .addFeature('Tinker', 'You have proficiency with artisan\'s tools (tinker\'s tools). Using those tools, you can spend 1 hour and 10 gp worth of materials to construct a Tiny clockwork device (AC 5, 1 hp). The device ceases to function after 24 hours (unless you spend 1 hour reparing it to keep the device functioning), or when you use your action to dismantle it; at that time, you can reclaim the materials used to create it. You can have up to three such devices active at a time.\nWhen you create a device, choose one of the following options:\n\nClockwork Toy: This toy is a clockwork animal, monster, or person, such as a frog, mouse, bird, dragon, or soldier. When placed on the ground, the toy moves 5 feet across the ground on each of your turns in a random direction. It makes noises as appropriate to the creature it represents.\nFire Starter: This device produces a miniature flame, which you can use to light a candle, torch, or campfire. Using the device requires your action.\nMusic Box: When opened, this music box plays a single song at a moderate volume. The box stops playing when it reaches the song\'s end or when it is closed.')

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
