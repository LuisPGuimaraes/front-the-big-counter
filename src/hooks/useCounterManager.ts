import { useCallback, useEffect, useState } from 'react'
import {
  createCounter as createCounterApi,
  fetchCounters,
  deleteCounter as deleteCounterApi,
} from '../services/counterApi'
import type { Counter } from '../types/counter'

type UseCountersListParams = {
  loadOnMount?: boolean
  updateCounter: (counterId: number) => Promise<void>
  clearCount: () => void
  setSelectedCounterId: (counterId: number | null) => void
}

export default function useCounterManager({
  loadOnMount,
  updateCounter,
  clearCount,
  setSelectedCounterId,
}: UseCountersListParams) {
  const [counters, setCounters] = useState<Counter[]>([])

  const handleListCounter = useCallback(async () => {
    try {
      const list = await fetchCounters()
      setCounters(list)
    } catch (err) {
      reportError('Falha ao listar contadores.', err)
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
        clearCount()
      }
    } catch (err) {
      reportError('Falha ao remover o contador.', err)
    }
  }, [clearCount, setSelectedCounterId, updateCounter])

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
      reportError('Falha ao criar o contador.', err)
    }
  }, [updateCounter])

  useEffect(() => {
    if (loadOnMount) {
      const loadInitialData = async () => {
        try {
          const list = await fetchCounters()
          setCounters(list)
          const firstId = list[0]?.id
          if (firstId != null) {
            await updateCounter(firstId)
          }
        } catch (err) {
          reportError('Falha ao carregar contadores.', err)
        }
      }

      void loadInitialData()
    }
  }, [loadOnMount, updateCounter])

  return {
    counters,
    handleListCounter,
    createCounter: handleCreateCounter,
    deleteCounter: handleDeleteCounter,
  }
}

function reportError(message: string, err: unknown) {
  console.error(message, err)
  window.alert(message)
}

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
