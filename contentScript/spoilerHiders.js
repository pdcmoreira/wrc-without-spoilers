function findTopBar() {
  return document.querySelector('.top-bar')
}

function buildSpoilerHider() {}

function hideSpoilers() {
  findTopBar().style.background = 'green'
}

function showSpoilers() {
  findTopBar().style.background = 'red'
}
