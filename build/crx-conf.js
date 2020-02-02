const {
  resolve
} = require('./util')

module.exports = {
  name: 'bee-devtools',
  outputPath: resolve(),
  keyPath: resolve('key.pem'),
  contentPath: resolve('dist')
}
