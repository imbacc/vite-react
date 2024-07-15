interface Test1Props_DTYPE { tag: string }
export const Test1 = (props: Test1Props_DTYPE) => {
  const [tag, setTag] = useState(props.tag)
  const [date, setDate] = useState<Date | null>(new Date())
  const timeRef = useRef<NodeJS.Timeout>()

  const clearTimer = () => {
    clearInterval(timeRef.current)
    setDate(null)
  }

  const startTimer = () => {
    setDate(new Date())
    const timer = setInterval(() => {
      setDate(new Date())
    }, 1000)
    timeRef.current = timer
  }

  onMounted(() => {
    setTag(props.tag)
    return () => {
      timeRef.current && clearInterval(timeRef.current)
    }
  })

  onUnmounted(() => {
    console.log('爱情没发倒带')
  })

  return (
    <div>
      <div>测试组件Test1</div>
      {!date ? <button onClick={startTimer}>重新开启计时器</button> : <button onClick={clearTimer}>清除计时器</button>}
      <h3>
        组件传入变更值：
        {tag}
      </h3>
      <p>
        组件每秒更新值：
        {date?.toLocaleString() || '已清除时间'}
      </p>
    </div>
  )
}

interface Test2Props_DTYPE { isPacked: boolean, name: string }
export const Test2 = ({ isPacked, name }: Test2Props_DTYPE) => {
  return (
    <>
      <div className="absolute left-0 right-0">测试组件Test2</div>
      <li className="-ml-200px">
        {isPacked
          ? (
              <del>
                {`${name} ✔`}
              </del>
            )
          : (
              name
            )}
      </li>
    </>
  )
}
