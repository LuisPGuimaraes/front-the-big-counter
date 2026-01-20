import type { Counter } from '../types/counter'

type CountersListProps = {
  counters: Counter[]
  selectedCounterId: number | null
  onSelectCounter: (counterId: number | null | undefined) => void
  onDeleteCounter: (counterId: number) => void
}

function CountersList({
  counters,
  selectedCounterId,
  onSelectCounter,
  onDeleteCounter,
}: CountersListProps) {
  return (
    <section className="counters-panel" aria-labelledby="counters-title">
      <h2 className="counters-title" id="counters-title">
        Counters Available
      </h2>
      <div className="counters-table">
        {counters.map((counter) => {
          const key = counter.id
          const isSelected = counter.id === selectedCounterId
          return (
            <div className="counters-row" key={key}>
              <button
                className="counters-item"
                onClick={() => onSelectCounter(counter.id)}
                type="button"
              >
                <span className="counters-status">
                  {isSelected && (
                    <span className="counters-selected-dot" aria-hidden="true" />
                  )}
                  {!isSelected && (
                    <span className="counters-unselected-dot" aria-hidden="true" />
                  )}
                  <span>{counter.name}</span>
                </span>
              </button>
              <button
                className="counters-delete"
                type="button"
                aria-label={`Delete ${counter.name}`}
                onClick={() => {
                  if (counter.id != null) {
                    onDeleteCounter(counter.id)
                  }
                }}
              >
                <span className="counters-delete-icon" aria-hidden="true">X</span>
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default CountersList
