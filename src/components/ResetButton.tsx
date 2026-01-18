type ResetButtonProps = {
  onReset: () => void
}

export default function ResetButton({ onReset }: ResetButtonProps) {
  return (
    <button type="button" onClick={onReset}>
      Reset
    </button>
  )
}
