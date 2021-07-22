chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ hideSpoilers: true })

  // Extension installed and started up as enabled
})
