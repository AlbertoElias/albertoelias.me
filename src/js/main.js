'use strict' // eslint-disable-line strict

import { JSConsole } from './jsconsole.js'
import { Person } from './person.js'

/** Debug mode for the app. (Default: false) */
const debug = true

const myCommandsList = [
  'const bioEl = document.querySelector(\'.bio\')',
  'const me = new Person(bioEl)',
  'me.name = \'Alberto Elias\'',
  'me.announce(`Hey!👋 I\'m ${me.name}`)',
  'me.emphasize(`I\'m a senior Web developer researching VR/AR and decentralized technologies.`)',
  'me.say(`Currently researching and talking about the open metaverse at ${addLink(`Simbol`, `https://simbol.io`)}. Check out the ${addLink(`Podcast`, `https://anchor.fm/simbol`)}, ${addLink(`Blog`, `https://blog.simbol.io/`)} and ${addLink(`Newsletter`, `https://simbol.substack.com/`)}.`)',
  'me.say(`Find me on ${addLink(`Twitter`, `https://twitter.com/aeliasnet`)}, ${addLink(`Github`, `https://github.com/AlbertoElias`)}, ${addLink(`Linkedin`, `https://www.linkedin.com/in/albertoelias`)}`)',
  'me.say(addLink(`Let\'s collaborate! 🤗`, `mailto:hi@albertoelias.me`))',
  'me.emphasize(`Check out my projects:`)',
  'const myProjects = fetchProjects()',
  'me.showProjects(myProjects)'
]

function fetchProjects () {
  return [
    {
      name: 'Financial Times',
      image: '/assets/projects/ft.jpg',
      link: 'https://ft.com',
      description: 'Worked on the components and tools that power FT sites including ft.com.'
    },
    {
      name: 'Polygon Hermez',
      image: '/assets/projects/hermez.jpg',
      link: 'https://hermez.io/',
      description: 'Led the frontend team that built all Web apps for Polygon Hermez including the crypto wallet.'
    },
    {
      name: 'Simbol Identity',
      image: '/assets/projects/simbol-identity.jpg',
      link: 'https://github.com/wearesimbol/simbol-identity-manager',
      description: 'Prototype of a VR identity system where people own their data.'
    },
    {
      name: 'Simbol World',
      image: 'assets/projects/simbol-world.jpg',
      link: 'https://github.com/wearesimbol/simbol-world',
      description: 'Prototype of a WebXR library to create multiuser virtual worlds with a self-sovereign identity system.'
    },
    {
      name: 'Holo Presentation',
      image: 'assets/projects/holo-presentation.jpg',
      link: 'https://holo-presentation.vercel.app/',
      description: 'A prototype to test out presentations native to 3D environments.'
    },
    {
      name: 'Solana Discord Bot',
      image: 'assets/projects/dao-verify.jpg',
      link: 'https://solanadaoverify.albertoelias.me/',
      description: 'Discord bot that verifies a Discord user has a Solana wallet with a valid NFT to join your Discord server.'
    }
  ]
}

function addLink (text, link) {
  const aEl = document.createElement('a')
  aEl.textContent = text
  aEl.href = link
  aEl.target = '_blank'
  aEl.rel = 'noopener noreferrer'
  return aEl.outerHTML
}

function init () {
  window.Person = Person
  window.fetchProjects = fetchProjects
  window.addLink = addLink
  const consoleEl = document.querySelector('.js-console')
  const myConsole = new JSConsole(consoleEl, {
    commandList: myCommandsList,
    autoplay: true,
    debug: debug
  })
}

init()

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/serviceworker.js', {
    scope: '/'
  })
}
