import App1 from '@/components/App'
import { Test1, Test2 } from '@/components/Test'

function App() {
  const [count, setCount] = useState(0)
  const list = Array.from({ length: 10 }, (_, index) => index + 1)
  return (
    <>
      <App1></App1>
      <Test1 tag="随声听2000"></Test1>
      <section>
        <h1>
          ul li清单
          {count}
        </h1>
        <ul>
          {
            list.map((item) => {
              const key = `li${item}`
              // setCount(count + 1)
              console.log('%c [ key ]-15', 'font-size:14px; background:#41b883; color:#ffffff;', key)
              return (
                <Test2
                  key={key}
                  isPacked={true}
                  name={key}
                />
              )
            })
          }
        </ul>
      </section>
    </>
  )
}

export default App
