import legacy from '@vitejs/plugin-legacy'

export default () => {
  return legacy({
    targets: ['chrome 52'],
    additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    renderLegacyChunks: true,
    polyfills: [
      'es.symbol',
      'es.promise',
      'es.promise.finally',
      'es/map',
      'es/set',
      'es.array.filter',
      'es.array.for-each',
      'es.array.flat-map',
      'es.object.define-properties',
      'es.object.define-property',
      'es.object.get-own-property-descriptor',
      'es.object.get-own-property-descriptors',
      'es.object.keys',
      'es.object.to-string',
      'web.dom-collections.for-each',
      'esnext.global-this',
      'esnext.string.match-all',
    ],
  })
}
