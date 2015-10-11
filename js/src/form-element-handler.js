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
