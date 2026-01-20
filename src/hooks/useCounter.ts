import { useCallback, useEffect, useState } from 'react'
import {
  createCounter as createCounterApi,
  fetchCount,
  fetchCounters,
  deleteCounter as deleteCounterApi,
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
      if (targetId == null) return
      if (counterId != null) setSelectedCounterId(counterId)

      const realCount = await fetchCount(targetId)
      setCount(realCount)
    } catch (err) {
      console.error('[count] fetch failed', err)
    }
  }, [selectedCounterId])

  const updateCounter = useCallback(async (counterId: number) => {
    setSelectedCounterId(counterId)
    const realCount = await fetchCount(counterId)
    setCount(realCount)
  }, [])

  const handleIncrement = useCallback(async () => {
    try {
      if (selectedCounterId == null) return

      await incrementCount(selectedCounterId)
      await getCount()
    } catch (err) {
      console.error('[count] increment failed', err)
    }
  }, [getCount, selectedCounterId])

  const handleReset = useCallback(async () => {
    try {
      if (selectedCounterId == null) return

      await resetCount(selectedCounterId)
      await getCount()
    } catch (err) {
      console.error('[count] reset failed', err)
    }
  }, [getCount, selectedCounterId])

  const handleListCounter = useCallback(async () => {
    try {
      const list = await fetchCounters()
      setCounters(list)
    } catch (err) {
      console.error('[count] list counters failed', err)
    }
  }, [])

  const handleDeleteCounter = useCallback(async (counterId: number) => {
    try {
      await deleteCounterApi(counterId)
      const list = await fetchCounters()
      setCounters(list)

      const nextId = list[0]?.id
      if (nextId != null) {
        await updateCounter(nextId)
      } else {
        setSelectedCounterId(null)
        setCount(0)
      }

    } catch (err) {
      console.error('[count] delete counter failed', err)
    }
  }, [updateCounter])

  const handleCreateCounter = useCallback(async (name: string) => {
    const trimmedName = name.trim()
    if (!trimmedName) {
      return
    }

    try {
      const created = await createCounterApi(trimmedName)
      const list = await fetchCounters()
      setCounters(list)

      const createdId = resolveCreatedCounterId(created, list, trimmedName)

      if (createdId != null) {
        await updateCounter(createdId)
      }
    } catch (err) {
      console.error('[count] create counter failed', err)
    }
  }, [updateCounter])

  function resolveCreatedCounterId(
    created: Counter | null | undefined,
    list: Counter[],
    name: string,
  ) {
    if (typeof created?.id === 'number') {
      return created.id
    }

    const matchId = list.find((counter) => counter.name === name)?.id
    return matchId ?? list[list.length - 1]?.id
  }

  useEffect(() => {
    if (options.loadOnMount) {
      const loadInitialData = async () => {
        try {
          const list = await fetchCounters()
          setCounters(list)
          const firstId = list[0]?.id
          if (firstId != null) {
            await updateCounter(firstId)
          }
        } catch (err) {
          console.error('[count] initial load failed', err)
        }
      }

      void loadInitialData()
    }
  }, [options.loadOnMount, updateCounter])

  return {
    count,
    counters,
    selectedCounterId,
    getCount,
    increment: handleIncrement,
    reset: handleReset,
    handleListCounter,
    createCounter: handleCreateCounter,
    deleteCounter: handleDeleteCounter,
  }
}
