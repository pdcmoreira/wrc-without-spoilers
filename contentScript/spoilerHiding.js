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

  original.classList.add(spoilerClass)

  const revealer = buildSpoilerRevealer(original)

  revealer.mount()

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
  hiddenSpoilerMaps[index].revealer.unmount()

  hiddenSpoilerMaps[index].original.classList.remove(spoilerClass)

  hiddenSpoilerMaps.splice(index, 1)
}

function buildSpoilerRevealer(originalElement) {
  const revealerElement = document.createElement('div')

  revealerElement.classList.add('spoiler-revealer')

  // Observe the original element and update the revealer's size and position
  // to match it

  function updateSizeAndPosition(rect) {
    revealerElement.style.width = rect.width + 'px'
    revealerElement.style.height = rect.height + 'px'
    revealerElement.style.left = rect.x + window.scrollX + 'px'
    revealerElement.style.top = rect.y + window.scrollY + 'px'
  }

  const resizeObserver = new ResizeObserver((entries) => {
    // Can't use entries[0].contentRect because the position is not calculated
    // correctly, maybe because of margin and padding

    updateSizeAndPosition(entries[0].target.getBoundingClientRect())
  })

  updateSizeAndPosition(originalElement.getBoundingClientRect())

  const spoilerRevealButton = document.createElement('button')

  revealerElement.appendChild(spoilerRevealButton)

  spoilerRevealButton.appendChild(buildSpoilerIcon())
  spoilerRevealButton.append('Spoiler!')

  spoilerRevealButton.classList.add('spoiler-reveal-button')

  function mount() {
    document.body.appendChild(revealerElement)

    resizeObserver.observe(originalElement)
  }

  function unmount() {
    resizeObserver.disconnect()

    document.body.removeChild(revealerElement)
  }

  const revealer = {
    element: revealerElement,
    mount,
    unmount
  }

  spoilerRevealButton.addEventListener('click', () => {
    revealSpoiler(revealer)
  })

  return revealer
}

function buildSpoilerIcon() {
  const spoilerIcon = document.createElement('span')

  spoilerIcon.innerHTML = spoilerIconSvg

  spoilerIcon.classList.add('spoiler-icon')

  return spoilerIcon
}
