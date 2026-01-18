import { useCallback, useEffect, useState } from 'react'
import {
  fetchCount,
  fetchCounters,
  incrementCount,
  resetCount,
} from '../services/counterApi'
import type { Counter } from '../types/counter'

type UseCounterOptions = {
  loadOnMount?: boolean
}

export default function useCounter(options: UseCounterOptions = {}) {
  const [count, setCount] = useState(0)
  const [counters, setCounters] = useState<Counter[]>([])
  const [selectedCounterId, setSelectedCounterId] = useState<number | null>(null)

  const getCount = useCallback(async (counterId?: number | null) => {
    try {
      const targetId = counterId ?? selectedCounterId
      if (targetId == null) {
        return
      }

      if (counterId != null) {
        setSelectedCounterId(counterId)
      }

      const realCount = await fetchCount(targetId)
      setCount(realCount)
    } catch (err) {
      console.error('[count] fetch failed', err)
    }
  }, [selectedCounterId])

  const handleIncrement = useCallback(async () => {
    try {
      await incrementCount()
      await getCount()
    } catch (err) {
      console.error('[count] increment failed', err)
    }
  }, [getCount])

  const handleReset = useCallback(async () => {
    try {
      await resetCount()
      await getCount()
    } catch (err) {
      console.error('[count] reset failed', err)
    }
  }, [getCount])

  const handleListCounter = useCallback(async () => {
    try {
      const list = await fetchCounters()
      setCounters(list)
    } catch (err) {
      console.error('[count] list counters failed', err)
    }
  }, [])

  useEffect(() => {
    if (options.loadOnMount ?? true) {
      void getCount()
    }
  }, [getCount, options.loadOnMount])

  return {
    count,
    counters,
    getCount,
    increment: handleIncrement,
    reset: handleReset,
    handleListCounter,
  }
}
