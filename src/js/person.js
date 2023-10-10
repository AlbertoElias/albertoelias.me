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

      const linkEl = document.createElement('a')
      linkEl.classList.add('project__link')
      linkEl.href = project.link
      linkEl.target = '_blank'

      const imageEl = document.createElement('img')
      imageEl.classList.add('project__image')
      imageEl.src = project.image

      const nameEl = document.createElement('h3')
      nameEl.classList.add('project__name')
      nameEl.textContent = project.name

      const descriptionEl = document.createElement('p')
      descriptionEl.classList.add('project__description')
      descriptionEl.textContent = project.description

      const informationEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      informationEl.classList.add('project__information')
      const useEl = document.createElementNS('http://www.w3.org/2000/svg', 'use')
      useEl.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#info-circle')
      informationEl.addEventListener('click', function (event) {
        event.preventDefault()
        this.parentElement.classList.toggle('project--show-desc')
      })
      informationEl.appendChild(useEl)

      projectEl.appendChild(linkEl)
      linkEl.appendChild(imageEl)
      linkEl.appendChild(nameEl)
      linkEl.appendChild(descriptionEl)
      linkEl.appendChild(informationEl)
      projectsEl.appendChild(projectEl)
    }
    this.bioEl.appendChild(projectsEl)
  }
}

export { Person }
