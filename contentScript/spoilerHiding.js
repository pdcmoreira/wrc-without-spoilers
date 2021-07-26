// Array of { original, revealer }
let hiddenSpoilerMaps = []

function hideAllSpoilerElements() {
  spoilerElementsSelectors.forEach((selector) => {
    hideSpoilerElement(document.querySelector(selector))
  })
}

function revealAllSpoilerElements() {
  for (let i = hiddenSpoilerMaps.length - 1; i >= 0; i--) {
    revealSpoilerFromMapIndex(i)
  }
}

function hideSpoilerElement(original) {
  if (!original) {
    return
  }

  const revealer = buildSpoilerRevealer(original)

  original.classList.add(spoilerClass)

  document.body.appendChild(revealer)

  hiddenSpoilerMaps.push({ original, revealer })
}

function revealSpoiler(spoilerRevealer) {
  const index = hiddenSpoilerMaps.findIndex(
    (map) => map.revealer === spoilerRevealer
  )

  if (index >= 0) {
    revealSpoilerFromMapIndex(index)
  }
}

function revealSpoilerFromMapIndex(index) {
  document.body.removeChild(hiddenSpoilerMaps[index].revealer)

  hiddenSpoilerMaps[index].original.classList.remove(spoilerClass)

  hiddenSpoilerMaps.splice(index, 1)
}

function buildSpoilerRevealer(originalElement) {
  const spoilerRevealer = document.createElement('div')

  spoilerRevealer.classList.add('spoiler-revealer')

  // Set its and position size to the same as the original element
  const originalRect = originalElement.getBoundingClientRect()

  spoilerRevealer.style.width = originalRect.width + 'px'
  spoilerRevealer.style.height = originalRect.height + 'px'
  spoilerRevealer.style.left = originalRect.x + window.scrollX + 'px'
  spoilerRevealer.style.top = originalRect.y + window.scrollY + 'px'

  const spoilerRevealButton = document.createElement('button')

  spoilerRevealer.appendChild(spoilerRevealButton)

  spoilerRevealButton.appendChild(buildSpoilerIcon())
  spoilerRevealButton.append('Spoiler!')

  spoilerRevealButton.classList.add('spoiler-reveal-button')

  spoilerRevealButton.addEventListener('click', () => {
    revealSpoiler(spoilerRevealer)
  })

  return spoilerRevealer
}

function buildSpoilerIcon() {
  const spoilerIcon = document.createElement('span')

  spoilerIcon.innerHTML = spoilerIconSvg

  spoilerIcon.classList.add('spoiler-icon')

  return spoilerIcon
}
