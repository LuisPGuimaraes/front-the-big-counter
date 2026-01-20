import { useCallback, useState } from 'react'
import { fetchCount, incrementCount, resetCount } from '../services/counterApi'

type UseCounterValueParams = {
  selectedCounterId: number | null
  setSelectedCounterId: (counterId: number | null) => void
}

export default function useCounterValue({
  selectedCounterId,
  setSelectedCounterId,
}: UseCounterValueParams) {
  const [count, setCount] = useState(0)

  const getCount = useCallback(async (counterId?: number | null) => {
    try {
      const targetId = counterId ?? selectedCounterId
      if (targetId == null) return
      if (counterId != null) setSelectedCounterId(counterId)

      const realCount = await fetchCount(targetId)
      setCount(realCount)
    } catch (err) {
      reportError('Falha ao buscar o contador.', err)
    }
  }, [selectedCounterId, setSelectedCounterId])

  const updateCounter = useCallback(async (counterId: number) => {
    setSelectedCounterId(counterId)
    const realCount = await fetchCount(counterId)
    setCount(realCount)
  }, [setSelectedCounterId])

  const clearCount = useCallback(() => {
    setCount(0)
  }, [])

  const handleIncrement = useCallback(async (incrementValue = 1) => {
    try {
      if (selectedCounterId == null) return
      if (!Number.isFinite(incrementValue) || incrementValue <= 0) return

      await incrementCount(selectedCounterId, incrementValue)
      await getCount()
    } catch (err) {
      reportError('Falha ao incrementar o contador.', err)
    }
  }, [getCount, selectedCounterId])

  const handleReset = useCallback(async () => {
    try {
      if (selectedCounterId == null) return

      await resetCount(selectedCounterId)
      await getCount()
    } catch (err) {
      reportError('Falha ao resetar o contador.', err)
    }
  }, [getCount, selectedCounterId])

  return {
    count,
    getCount,
    increment: handleIncrement,
    reset: handleReset,
    updateCounter,
    clearCount,
  }
}

function reportError(message: string, err: unknown) {
  console.error(message, err)
  window.alert(message)
}
