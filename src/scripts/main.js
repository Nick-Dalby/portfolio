const sections = document.querySelectorAll('section')
const navLink = document.querySelectorAll('nav a')

window.addEventListener('scroll', () => {
  let current = ''
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (scrollY >= sectionTop - sectionHeight / 3) {
      document.body.style.background = section.dataset.color

      current = section.getAttribute('id')
    }
  })

  navLink.forEach((link) => {
    link.classList.remove('active')
    if (link.classList.contains(current)) {
      link.classList.add('active')
    }
  })
})
