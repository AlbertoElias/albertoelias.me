'use strict' // eslint-disable-line strict

import { JSConsole } from './jsconsole.js'
import { Person } from './person.js'

/** Debug mode for the app. (Default: false) */
const debug = false

const myCommandsList = [
  'const bioEl = document.querySelector(".bio")',
  'const me = new Person(bioEl)',
  'me.name = "Alberto Elias"',
  'me.announce(`Hey!👋🏻 I\'m ${me.name}`)',
  'me.say("I\'m a senior Web developer with experience leading teams")',
  'me.say("My side-projects revolve around spatial and decentralized technologies.")',
  'me.say(`Lately, I\'ve been writing about tech, VR, decentralization and my life learnings in my ${addLink("Substack", "https://albertoelias.substack.com/")}.`)',
  'me.say(`Find me on ${addLink("Twitter", "https://twitter.com/aeliasnet")}, ${addLink("Github", "https://github.com/AlbertoElias")}, ${addLink("Linkedin", "https://www.linkedin.com/in/albertoelias")}`)',
  'me.say(addLink("Let\'s collaborate! 🔥", "mailto:hi@albertoelias.me"))',
  'const myProjects = fetchProjects()',
  'me.showProjects(myProjects)'
]

function fetchProjects () {
  return [
    {
      name: 'Financial Times',
      image: '/assets/projects/ft.jpg',
      link: 'https://ft.com',
      description: 'Worked on the Origami team where we built a UI component system for all the different FT products making it easier to build and upgrade these products, and also to unify the brand.'
    },
    {
      name: 'Polygon Hermez',
      image: '/assets/projects/hermez.jpg',
      link: 'https://hermez.io/',
      description: 'Led the Web development of crypto wallets, identity solutions and other tooling. I built the Frontend team and helped with Project Management.'
    },
    {
      name: 'Simbol Identity',
      image: '/assets/projects/simbol-identity.jpg',
      link: 'https://github.com/wearesimbol/simbol-identity-manager',
      description: 'Self-sovereign identity system for VR/AR. Easy to use avatar and identity that can transition between sites while keeping complete control of their data.'
    },
    {
      name: 'Simbol World',
      image: 'assets/projects/simbol-world.jpg',
      link: 'https://github.com/wearesimbol/simbol-world',
      description: 'WebXR library to create multiuser virtual worlds with self-sovereign identity and locomotion systems.'
    },
    {
      name: 'Holo Presentation',
      image: 'assets/projects/holo-presentation.jpg',
      link: 'https://holo-presentation.vercel.app/',
      description: 'A prototype to test out presentations native to 3D environments. Like PowerPoint but in VR.'
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
