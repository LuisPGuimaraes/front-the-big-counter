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
        inputMode="numeric"
        pattern="[0-9]*"
        onBeforeInput={(event) => {
          const data = event.data
          if (data && !/^\d+$/.test(data)) {
            event.preventDefault()
          }
        }}
        onPaste={(event) => {
          const pasted = event.clipboardData.getData('text')
          if (!pasted) return
          if (!/^\d+$/.test(pasted)) {
            event.preventDefault()
            const onlyDigits = pasted.replace(/\D/g, '')
            if (onlyDigits) {
              setValue(onlyDigits)
            }
          }
        }}
        onChange={(event) => {
          const nextValue = event.target.value
          if (/^\d*$/.test(nextValue)) {
            setValue(nextValue)
          }
        }}
        onBlur={() => {
          if (!value) {
            setValue('1')
          }
        }}
      />
      <button type="button" onClick={() => onIncrement(parsedValue)} disabled={!isValid}>
        Increment
      </button>
    </div>
  )
}
