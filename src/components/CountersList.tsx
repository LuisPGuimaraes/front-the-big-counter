import type { Counter } from '../types/counter'

type CountersListProps = {
  counters: Counter[]
  selectedCounterId: number | null
  onSelectCounter: (counterId: number | null | undefined) => void
}

function CountersList({
  counters,
  selectedCounterId,
  onSelectCounter,
}: CountersListProps) {
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
              {counter.id === selectedCounterId ? (
                <span className="counters-selected-dot" aria-hidden="true" />
              ) : null}
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default CountersList
