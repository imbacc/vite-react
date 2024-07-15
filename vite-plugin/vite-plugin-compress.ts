import viteCompressionPlugin from 'vite-plugin-compression'

// https://github.com/vbenjs/vite-plugin-compression
export default (compress: 'gzip' | 'brotli' | 'none', deleteOriginFile = false) => {
  const compressList = compress.split(',')

  if (compressList.includes('gzip')) {
    return viteCompressionPlugin({
      ext: '.gz',
      deleteOriginFile,
    })
  }

  if (compressList.includes('brotli')) {
    return viteCompressionPlugin({
      ext: '.br',
      algorithm: 'brotliCompress',
      deleteOriginFile,
    })
  }

  return viteCompressionPlugin()
}
