import zipDirectory from './zipDirectory.js'
import merge from 'lodash/merge.js'
import path from 'path'
import fs from 'fs-extra'
import uglifyJs from 'uglify-js'
import CleanCSS from 'clean-css'
import htmlMinifier from 'html-minifier'
import releaseSetup from '../release-setup.js'
import defaultOptions from './defaultOptions.js'

const EOL = '\n'

const options = merge(defaultOptions, releaseSetup)

const cleanCss = new CleanCSS({})

function readFile(path) {
  return fs.readFileSync(path) + ''
}

function readSrcFile(filePath) {
  return readFile(path.resolve(options.srcPath, filePath))
}

function saveDistFile(filePath, content) {
  fs.writeFileSync(path.resolve(options.tempPath, filePath), content)
}

function concatSrcFiles(filePaths) {
  return filePaths.reduce((final, file) => {
    return final + EOL + readSrcFile(file)
  }, '')
}

function ensureDirectory(path) {
  try {
    fs.mkdirSync(path)
  } catch (error) {
    // Ignore 'directory already exists' error
    if (error.code !== 'EEXIST') {
      throw error
    }
  }
}

function removeDirectory(path) {
  fs.rmSync(path, { force: true, recursive: true })
}

function ensureCleanDirectory(path) {
  removeDirectory(path)

  ensureDirectory(path)
}

const minify = {
  js: js => uglifyJs.minify(js).code,

  css: css => cleanCss.minify(css).styles,

  html: html =>
    htmlMinifier.minify(html, {
      collapseWhitespace: true,
      removeComments: true
    })
}

async function buildProcess() {
  try {
    ensureCleanDirectory(options.tempPath)

    Object.keys(options.entries).forEach(entryName => {
      const filesByType = options.entries[entryName] || {}

      Object.keys(filesByType).forEach(type => {
        saveDistFile(
          `${entryName}.${type}`,
          minify[type](concatSrcFiles(filesByType[type]))
        )
      })
    })

    const originalManifest = JSON.parse(readSrcFile(options.manifestPath))

    const transformedManifest = options.transformManifest(originalManifest)

    const version = originalManifest.version

    transformedManifest.version = version

    saveDistFile('manifest.json', JSON.stringify(transformedManifest, null, 2))

    // Copy static files
    if (options.assetDirectories && options.assetDirectories.length) {
      options.assetDirectories.forEach(assetDirectory => {
        const targetPath = path.resolve(options.tempPath, assetDirectory)

        ensureCleanDirectory(targetPath)

        fs.copySync(path.resolve(options.srcPath, assetDirectory), targetPath)
      })
    }

    await zipDirectory(
      options.tempPath,
      path.resolve(options.outputPath, `build-${version}.zip`)
    )
  } catch (error) {
    throw error
  } finally {
    removeDirectory(options.tempPath)
  }
}

buildProcess()
