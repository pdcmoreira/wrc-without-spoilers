chrome.storage.onChanged.addListener((changes) => {
  if (!changes.hideSpoilers) {
    return
  }

  updateState(changes.hideSpoilers.newValue)
})

chrome.storage.sync.get('hideSpoilers', ({ hideSpoilers }) => {
  updateState(hideSpoilers)
})
