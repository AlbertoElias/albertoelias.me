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

  * projectGenerator (projects) {
    yield * projects
  }

  createProjectEl (project) {
    const projectEl = document.createElement('li')
    projectEl.classList.add('project')

    const linkEl = document.createElement('a')
    linkEl.classList.add('project__link')
    linkEl.href = project.link
    linkEl.target = '_blank'

    const projectInfoEl = document.createElement('div')
    projectInfoEl.classList.add('project__info')

    const nameEl = document.createElement('h3')
    nameEl.classList.add('project__name')
    nameEl.textContent = project.name

    const descriptionEl = document.createElement('p')
    descriptionEl.classList.add('project__description')
    descriptionEl.textContent = project.description

    const iconWrapperEl = document.createElement('div')
    iconWrapperEl.classList.add('project__icon-wrapper')
    const iconEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    iconEl.classList.add('project__icon')
    const useEl = document.createElementNS('http://www.w3.org/2000/svg', 'use')
    useEl.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#arrow-right')
    iconEl.appendChild(useEl)
    iconWrapperEl.appendChild(iconEl)

    projectInfoEl.appendChild(nameEl)
    projectInfoEl.appendChild(descriptionEl)
    linkEl.appendChild(projectInfoEl)
    linkEl.appendChild(iconWrapperEl)
    projectEl.appendChild(linkEl)
    return projectEl
  }

  iterateProjects (projectsEl, projectsIterator) {
    const interval = setInterval(() => {
      const project = projectsIterator.next()
      if (project.done) {
        clearInterval(interval)
        return
      }
      const projectEl = this.createProjectEl(project.value)
      projectsEl.appendChild(projectEl)
    }, 250)
  }

  showProjects (projects) {
    const projectsEl = document.createElement('ul')
    projectsEl.classList.add('projects')
    this.bioEl.appendChild(projectsEl)
    const projectsIterator = this.projectGenerator(projects)
    this.iterateProjects(projectsEl, projectsIterator)
  }
}

export { Person }
