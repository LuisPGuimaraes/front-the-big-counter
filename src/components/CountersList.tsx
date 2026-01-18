import { useEffect } from 'react'
import type { Counter } from '../types/counter'

type CountersListProps = {
  counters: Counter[]
  onLoadCounters: () => void
  onSelectCounter: (counterId: number | null | undefined) => void
}

function CountersList({
  counters,
  onLoadCounters,
  onSelectCounter,
}: CountersListProps) {
  useEffect(() => {
    void onLoadCounters()
  }, [onLoadCounters])

  return (
    <section className="counters-panel" aria-labelledby="counters-title">
      <h2 className="counters-title" id="counters-title">
        Counters Available
      </h2>
      <div className="counters-table">
        {counters.map((counter) => {
          const key = counter.id
          return (
            <button
              className="counters-row counters-item"
              key={key}
              onClick={() => onSelectCounter(counter.id)}
              type="button"
            >
              <span>{counter.name}</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default CountersList
