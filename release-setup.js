export default {
  entries: {
    contentScript: {
      js: [
        'contentScript/constants.js',
        'contentScript/spoilerHiding.js',
        'contentScript/updateState.js',
        'contentScript/main.js'
      ],

      css: ['contentScript/styles.css']
    },

    popup: {
      js: ['popup/popup.js'],
      css: ['popup/popup.css'],
      html: ['popup/popup.html']
    },

    background: {
      js: ['background.js']
    }
  },

  assetDirectories: ['icons'],

  // TODO: do I need the ./ ?
  transformManifest: manifest => {
    manifest.content_scripts[0].js = './contentScript.js'
    manifest.content_scripts[0].css = './contentScript.css'

    manifest.action.default_popup = './popup.html'

    manifest.background.service_worker = './background.js'

    return manifest
  }
}
