let replacements = []

function hideAllSpoilerElements() {
  spoilerElementsSelectors.forEach((selector) => {
    hideSpoilerElement(
      document.querySelector(selector),
      spoilerElementsOptions[selector] || {}
    )
  })
}

function revealAllSpoilerElements() {
  replacements.forEach(({ original, replacement }) => {
    replacement.replaceWith(original)
  })

  replacements = []
}

function hideSpoilerElement(original, options) {
  if (!original) {
    return
  }

  const replacement = buildSpoilerRevealer(original, options)

  original.replaceWith(replacement)

  replacements.push({ original, replacement })
}

function revealSpoilerElement(replacement) {
  const index = replacements.findIndex(replacement)

  if (index >= 0) {
    replacement.replaceWith(replacements[index].original)

    replacements.splice(index, 1)
  }
}

function buildSpoilerRevealer(originalElement, options = {}) {
  const spoilerRevealer = document.createElement('div')

  spoilerRevealer.classList.add('spoiler-revealer')

  if (options.classes && options.classes.length) {
    spoilerRevealer.classList.add(...options.classes)
  }

  // Set its size to the same as the original element's
  spoilerRevealer.style.width = originalElement.offsetWidth + 'px'
  spoilerRevealer.style.height = originalElement.offsetHeight + 'px'

  const spoilerRevealButton = document.createElement('button')

  spoilerRevealer.appendChild(spoilerRevealButton)

  spoilerRevealButton.appendChild(buildSpoilerIcon())
  spoilerRevealButton.append('Spoiler! Click to reveal')

  spoilerRevealButton.classList.add('spoiler-reveal-button')

  spoilerRevealButton.addEventListener('click', () => {
    spoilerRevealer.replaceWith(originalElement)
  })

  return spoilerRevealer
}

function buildSpoilerIcon() {
  const spoilerIcon = document.createElement('span')

  spoilerIcon.innerHTML = spoilerIconSvg

  spoilerIcon.classList.add('spoiler-icon')

  return spoilerIcon
}
