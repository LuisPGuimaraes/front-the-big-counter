import './App.css'
import CountDisplay from './components/CountDisplay'
import IncrementButton from './components/IncrementButton'
import ResetButton from './components/ResetButton'
import useCounter from './hooks/useCounter'

function App() {
  const { count, error, increment, reset } = useCounter()

  return (
    <div className="app">
      <h1 className="title">The Big Counter</h1>
      <div className="counter-area">
        <CountDisplay count={count} />
      </div>
      <div className="controls">
        <ResetButton onReset={reset} />
        <IncrementButton onIncrement={increment} />
      </div>
    </div>
  )
}

export default App
