import { useCallback, useEffect, useState } from 'react'
import {
  fetchCount,
  incrementCount,
  resetCount,
} from '../services/counterApi'

export default function useCounter() {
  const [count, setCount] = useState(0)

  const loadCount = useCallback(async () => {
    try {
      const realCount = await fetchCount()
      setCount(realCount)
    } catch (err) {
      console.error('[count] fetch failed', err)
    }
  }, [])

  const handleIncrement = useCallback(async () => {
    try {
      await incrementCount()
      await loadCount()
    } catch (err) {
      console.error('[count] increment failed', err)
    }
  }, [loadCount])

  const handleReset = useCallback(async () => {
    try {
      await resetCount()
      await loadCount()
    } catch (err) {
      console.error('[count] reset failed', err)
    }
  }, [loadCount])

  useEffect(() => {
    void loadCount()
  }, [loadCount])

  return {
    count,
    reload: loadCount,
    increment: handleIncrement,
    reset: handleReset,
  }
}
