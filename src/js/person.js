class Person {
  constructor (bioEl) {
    this.bioEl = bioEl
  }

  announce (words) {
    const textEl = document.createElement('h1')
    textEl.classList.add('shout')
    textEl.innerHTML = words
    this.bioEl.appendChild(textEl)
  }

  emphasize (words) {
    const textEl = document.createElement('h2')
    textEl.classList.add('emphasize')
    textEl.innerHTML = words
    this.bioEl.appendChild(textEl)
  }

  say (words) {
    const textEl = document.createElement('p')
    textEl.classList.add('say')
    textEl.innerHTML = words
    this.bioEl.appendChild(textEl)
  }

  showProjects (projects) {
    const projectsEl = document.createElement('ul')
    projectsEl.classList.add('projects')
    for (const project of projects) {
      const projectEl = document.createElement('li')
      projectEl.classList.add('project')

      const projectInfoEl = document.createElement('div')
      projectInfoEl.classList.add('project__info')

      const nameEl = document.createElement('h3')
      nameEl.classList.add('project__name')
      nameEl.textContent = project.name

      const descriptionEl = document.createElement('p')
      descriptionEl.classList.add('project__description')
      descriptionEl.textContent = project.description

      const linkEl = document.createElement('a')
      linkEl.classList.add('project__link')
      linkEl.href = project.link
      linkEl.target = '_blank'

      const linkIconEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      linkIconEl.classList.add('project__link-icon')
      const useEl = document.createElementNS('http://www.w3.org/2000/svg', 'use')
      useEl.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#caret-right')
      linkIconEl.appendChild(useEl)
      linkEl.appendChild(linkIconEl)

      projectInfoEl.appendChild(nameEl)
      projectInfoEl.appendChild(descriptionEl)
      projectEl.appendChild(projectInfoEl)
      projectEl.appendChild(linkEl)
      projectsEl.appendChild(projectEl)
    }
    this.bioEl.appendChild(projectsEl)
  }
}

export { Person }
