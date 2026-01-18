type CountDisplayProps = {
  count: number
}

export default function CountDisplay({ count }: CountDisplayProps) {
  return <span>{count}</span>
}
