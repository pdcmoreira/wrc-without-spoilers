let replacements = []

function hideAllSpoilerElements() {
  spoilerElementsSelectors.forEach((selector) => {
    hideSpoilerElement(document.querySelector(selector))
  })
}

function revealAllSpoilerElements() {
  replacements.forEach(({ original, replacement }) => {
    replacement.replaceWith(original)
  })

  replacements = []
}

function hideSpoilerElement(original) {
  const replacement = buildSpoilerRevealer((spoilerRevealer) => {
    spoilerRevealer.replaceWith(original)
  })

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

function buildSpoilerRevealer(onClick) {
  const spoilerRevealer = document.createElement('button')

  spoilerRevealer.appendChild(buildSpoilerIcon())
  spoilerRevealer.append('Spoiler! Click to reveal')

  spoilerRevealer.classList.add('spoiler-reveal-button')

  spoilerRevealer.addEventListener('click', () => {
    onClick(spoilerRevealer)
  })

  return spoilerRevealer
}

function buildSpoilerIcon() {
  const spoilerIcon = document.createElement('span')

  spoilerIcon.innerHTML = spoilerIconSvg

  spoilerIcon.classList.add('spoiler-icon')

  return spoilerIcon
}
