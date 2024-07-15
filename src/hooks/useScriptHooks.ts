export function useScript(src: string) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const script: HTMLScriptElement = document.createElement('script')

  const promise = new Promise((resolve, reject) => {
    useEffect(() => {
      script.type = 'text/javascript'
      script.onload = function () {
        setLoading(true)
        setSuccess(true)
        resolve('')
      }

      script.onerror = function (err) {
        setLoading(false)
        setSuccess(false)
        reject(err)
      }

      script.src = src
      document.head.appendChild(script)
    })
  })

  useEffect(() => {
    script && script.remove()
  })

  return {
    loading,
    success,
    loadScript: () => promise,
  }
}
