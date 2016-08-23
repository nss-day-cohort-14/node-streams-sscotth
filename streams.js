const { Readable, Writable, Transform } = require('stream')

const readStream = Readable()

// readStream.push('abc')
// readStream.push('def')
// readStream.push('ghi')
// readStream.push(null)

let i = 0

readStream._read = () => {
  if (i > 100) {
    readStream.push(null)
  } else {
    setTimeout(() => readStream.push(`${i++}`), 50)
  }
}

const transformStream = Transform()

transformStream._transform = (buffer, encoding, cb) => {
  setTimeout(() => cb(null, `${(Number(buffer) * 2)}`), 1000)
}

const writeStream = Writable()

writeStream._write = (buffer, encoding, cb) => {
  process.stdout.write(`${buffer}\n`)
  setTimeout(cb, 500)
}

readStream.pipe(transformStream).pipe(writeStream)
