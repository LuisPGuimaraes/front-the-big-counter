import { useState } from 'react'

type IncrementButtonProps = {
  onIncrement: (value: number) => void
}

export default function IncrementButton({ onIncrement }: IncrementButtonProps) {
  const [value, setValue] = useState('1')
  const parsedValue = Number(value)
  const isValid = Number.isFinite(parsedValue) && parsedValue > 0

  return (
    <div className="increment-control">
      <input
        id="increment-value"
        className="increment-input"
        type="number"
        min={1}
        step={1}
        value={value}
        onChange={(event) => {
          const nextValue = event.target.value
          if (/^\d*$/.test(nextValue)) {
            setValue(nextValue)
          }
        }}
      />
      <button type="button" onClick={() => onIncrement(parsedValue)} disabled={!isValid}>
        Increment
      </button>
    </div>
  )
}
