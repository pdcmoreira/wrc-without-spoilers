import fs from 'fs-extra'
import path from 'path'
import archiver from 'archiver'

const tempFolder = '/temp'

export default async function (directoryPath, targetFilePath) {
  // const zipFileStream = fs.createWriteStream(targetFilePath)

  // const archive = archiver('zip', {
  //   zlib: { level: 9 } // Sets the compression level.
  // })

  // zipFileStream.on('close', () => {
  //   console.log(archive.pointer() + ' total bytes')
  //   console.log(
  //     'archiver has been finalized and the output file descriptor has closed.'
  //   )
  // })

  // archive.on('warning', error => {
  //   if (error.code === 'ENOENT') {
  //     console.warn(error)
  //   } else {
  //     throw error
  //   }
  // })

  // archive.on('error', error => {
  //   throw error
  // })

  // archive.pipe(zipFileStream)

  const archive = archiver('zip', { zlib: { level: 9 } })

  const stream = fs.createWriteStream(targetFilePath)

  return new Promise((resolve, reject) => {
    archive
      .directory(directoryPath, false)
      .on('error', error => reject(error))
      .pipe(stream)

    stream.on('close', () => resolve())

    archive.finalize()
  })
}
