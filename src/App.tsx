import './App.css'
import CountDisplay from './components/CountDisplay'
import CreateCounterPanel from './components/CreateCounterPanel'
import CountersTable from './components/CountersList'
import IncrementButton from './components/IncrementButton'
import ResetButton from './components/ResetButton'
import useCounter from './hooks/useCounter'

function App() {
  const {
    count,
    counters,
    selectedCounterId,
    getCount,
    increment,
    reset,
    createCounter,
    deleteCounter,
  } = useCounter({ loadOnMount: true })

  return (
    <div className="app">
      <CountersTable
        counters={counters}
        selectedCounterId={selectedCounterId}
        onSelectCounter={getCount}
        onDeleteCounter={deleteCounter}
      />
      <CreateCounterPanel onCreate={createCounter} />
      <h1 className="title">The Big Counter</h1>
      <div className="counter-area">
        <CountDisplay count={count} />
      </div>
      <div className="controls">
        <div className="controls-increment">
          <IncrementButton onIncrement={increment} />
          <ResetButton onReset={reset} />
        </div>
      </div>
    </div>
  )
}

export default App
