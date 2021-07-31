export default {
  srcPath: 'src',

  outputPath: 'dist',

  tempPath: 'temp',

  manifestPath: 'manifest.json',

  entries: {},

  assetDirectories: [],

  transformManifest: () => {
    throw new Error('transformManifest must be implemented')
  }
}
