import { useState } from 'react'
import './App.css'
import CountDisplay from './components/CountDisplay'
import IncrementButton from './components/IncrementButton'
import ResetButton from './components/ResetButton'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <h1 className="title">The Big Counter</h1>
      <div className="counter-area">
        <CountDisplay count={count} />
      </div>
      <div className="controls">
        <ResetButton onReset={() => setCount(0)} />
        <IncrementButton onIncrement={() => setCount((value) => value + 1)} />
      </div>
    </div>
  )
}

export default App
