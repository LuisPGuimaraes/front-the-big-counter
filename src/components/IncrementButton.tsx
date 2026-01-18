type IncrementButtonProps = {
  onIncrement: () => void
}

export default function IncrementButton({ onIncrement }: IncrementButtonProps) {
  return (
    <button type="button" onClick={onIncrement}>
      Increment
    </button>
  )
}
