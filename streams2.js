const { createReadStream } = require('fs')

const readStream = createReadStream('names.txt', { highWaterMark: 1 })
// 65536 (64k) is default chunk size for file system read streams

// readStream.pipe(process.stdout)

readStream.on('data', buffer => {
  readStream.pause()
  process.stdout.write(buffer.toString())
})

const timer = setInterval(() => readStream.resume(), 50)

readStream.on('end', () => {
  clearInterval(timer)
})
