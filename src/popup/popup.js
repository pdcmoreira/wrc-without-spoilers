let hideSpoilersCheckbox = document.getElementById('hide-spoilers')

// Load stored state into the checkbox
chrome.storage.sync.get('hideSpoilers', ({ hideSpoilers }) => {
  hideSpoilersCheckbox.checked = hideSpoilers
})

hideSpoilersCheckbox.addEventListener('click', () => {
  chrome.storage.sync.set({ hideSpoilers: hideSpoilersCheckbox.checked })
})
