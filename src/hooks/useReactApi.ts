/**
 * 标注渲染时生命周期
 * @param callback
 */
export const onMounted = (callback: () => void) => {
  useEffect(callback, [])
}

export const onUnmounted = (callback: () => void) => {
  useEffect(() => {
    return () => callback?.()
  }, [])
}
