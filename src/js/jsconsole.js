/* global hljs */
import { checkFlick } from './utils.js'

hljs.configure({
  languages: ['javascript'],
  es: {
    next: true
  }
})

/**
 * JSConsole
 * @namespace
 */
class JSConsole {
  /**
   * Initialises a JSConsole instance with a console element
   *
   * @param {HTMLElement} consoleElement - The console's owned DOM
   * @param {Object} options - Options object
   * @param {boolean} options.autoplay - Whether the console should automatically start executing the list of commands
   * @param {array} options.commandList - List of JS statements to be executed
   * @param {boolean} options.debug - Whether it should write the commands to the console without the "typing animation"
   *
   * @return {undefined}
   */
  constructor (consoleElement, options) {
    this.debug = options.debug

    this.consoleEl = consoleElement
    this.wrapperEl = this.consoleEl.parentElement
    this.inputEl = this.consoleEl.querySelector('.js-console__input')
    this.commandsEl = this.consoleEl.querySelector('.js-console__commands')
    this._dragHandler = this._dragHandler.bind(this)

    this.initListener()
    this.initDraggable()

    if (options.autoplay) {
      this.commandListIterator = this.commandListGenerator(options.commandList)
      this.autoplayCommands()
    }
  }

  /**
   * Runs a JavaScript statement by appending it to a <script> tag thats added and then removed to the <head>
   * It then adds it to the JSConsole DOM with syntax highlighting
   *
   * @param {string} command - Command to be executed
   *
   * @return {undefined}
  */
  runCommand (command) {
    const script = document.createElement('script')
    script.text = command
    document.head.appendChild(script).parentNode.removeChild(script)

    const commandEl = document.createElement('li')
    const preEl = document.createElement('pre')
    const codeEl = document.createElement('code')
    codeEl.classList.add('language-javascript')
    codeEl.textContent = command
    hljs.highlightElement(codeEl)
    preEl.appendChild(codeEl)
    commandEl.appendChild(preEl)
    this.commandsEl.appendChild(commandEl)
    this.commandsEl.scroll({ top: this.commandsEl.scrollHeight, behaviour: 'smooth' })
  }

  /**
   * Runs the current command in the <input> and resets the <input>
   *
   * @return {undefined}
   */
  submitCommand () {
    this.runCommand(this.inputEl.value)
    this.inputEl.value = ''
  }

  /**
   * Handles keydown events to check if its the enter key, if so, submit current command
   *
   * @param {Event} event - Event object
   * @return {undefined}
   *
   * @private
   */
  _keydownHandler (event) {
    if (event.keyCode === 13) {
      event.preventDefault()
      this.submitCommand()
    }
  }

  /**
   * Adds a handler to the keydown event on the <input>
   *
   * @return {undefined}
   */
  initListener () {
    this.inputEl.addEventListener('keydown', this._keydownHandler.bind(this))
  }

  /**
   * Based on the touch position, changes the js-console height
   * @param {Event} event
   */
  _dragHandler (event) {
    if (!this.startDragHeight) return
    event.preventDefault()
    // Converts from '180px' to Number
    const minHeight = Number(window.getComputedStyle(document.documentElement).getPropertyValue('--console-height').slice(0, -2))
    const newHeight = window.innerHeight - event.clientY
    if (newHeight >= minHeight && newHeight <= window.innerHeight - 64) {
      this.wrapperEl.style.height = `${newHeight}px`
      this.consoleEl.style.height = `${newHeight}px`
    }
  }

  /**
   * Handles the events on the draggable element
   *
   * @return {undefined}
   */
  initDraggable () {
    const minHeight = Number(window.getComputedStyle(document.documentElement).getPropertyValue('--console-height').slice(0, -2))
    if (this.wrapperEl.style.height === '') {
      this.wrapperEl.style.height = `${minHeight}px`
    }
    const dragEl = this.consoleEl.querySelector('.js-console-drag')

    dragEl.addEventListener('pointerdown', () => {
      this.startDragHeight = Number(this.wrapperEl.style.height.slice(0, -2))
      this.startDragTime = new Date().getTime()
      window.addEventListener('pointermove', this._dragHandler, false)
    })

    window.addEventListener('pointerup', (event) => {
      if (event.target !== dragEl) return

      this.wrapperEl.classList.add('js-console-transition')
      this.consoleEl.classList.add('js-console-transition')

      const endDragTime = new Date().getTime()
      const maxHeight = window.innerHeight - 64
      const midHeight = minHeight + Math.floor((maxHeight - minHeight) / 2)
      const wrapperHeight = Number(this.wrapperEl.style.height.slice(0, -2))
      const isClick = endDragTime - this.startDragTime < 100 &&
        (this.startDragHeight <= minHeight + 10 || this.startDragHeight >= maxHeight - 10)
      const isFlick = checkFlick(this.startDragHeight, wrapperHeight, this.startDragTime, endDragTime)

      if (
        (!isClick && isFlick !== -1 && wrapperHeight > midHeight) ||
        (isClick && wrapperHeight === minHeight) ||
        isFlick === 1
      ) {
        this.wrapperEl.style.height = `${maxHeight}px`
        this.consoleEl.style.height = `${maxHeight}px`
      } else {
        this.wrapperEl.style.height = `${minHeight}px`
        this.consoleEl.style.height = `${minHeight}px`
      }

      this.startDragHeight = null
      window.removeEventListener('pointermove', this._dragHandler, false)
      setTimeout(() => {
        if (this.wrapperEl.style.height === `${minHeight}px`) {
          this.commandsEl.scroll({ top: this.commandsEl.scrollHeight, behaviour: 'smooth' })
        }
        this.wrapperEl.classList.remove('js-console-transition')
        this.consoleEl.classList.remove('js-console-transition')
      }, 550)
    })
  }

  /**
   * Creates an iterator from an array of commands
   *
   * @param {array} commands - List of commands
   *
   * @return {undefined}
   */
  * commandListGenerator (commands) {
    yield * commands
  }

  /**
   * Creates a character iterator per command
   *
   * @param {string} command - Command that will be sliced into an iterator
   *
   * @return {undefined}
   */
  * commandGenerator (command) {
    const charsPerDelay = 1
    while (command.length > 0) {
      const length = command.length >= charsPerDelay ? charsPerDelay : command.length
      const chars = command.substr(0, length)
      command = command.slice(charsPerDelay)
      yield chars
    }
  }

  /**
   * Uses the command iterator and creates a character iterator for it to simulate a "typing animation" by writing it in intervals
   *
   * @return {undefined}
   */
  autoplayCommands () {
    const charsDelay = 6
    const commandDelay = 50
    const commandsIterator = this.commandListIterator.next()
    if (!commandsIterator.done) {
      const commandIterator = this.commandGenerator(commandsIterator.value)

      const charInterval = setInterval(() => {
        const chars = commandIterator.next()
        if (!chars.done) {
          this.inputEl.value += chars.value
          this.inputEl.scrollLeft = this.inputEl.scrollWidth
        } else {
          this.submitCommand()
          clearInterval(charInterval)
          if (this.debug) {
            this.autoplayCommands()
          } else {
            setTimeout(() => this.autoplayCommands(), commandDelay)
          }
        }
      }, this.debug ? 0 : charsDelay)
    } else {
      this.consoleEl.dispatchEvent(new window.CustomEvent('autoplayFinished'))
    }
  }
}

export { JSConsole }
