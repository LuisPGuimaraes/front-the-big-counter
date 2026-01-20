import { useState } from 'react'
import useCounterValue from './useCounterValue'
import useCounterManager from './useCounterManager'

type UseCounterOptions = {
  loadOnMount?: boolean
}

export default function useCounter(options: UseCounterOptions = {}) {
  const [selectedCounterId, setSelectedCounterId] = useState<number | null>(null)

  const {
    count,
    getCount,
    increment,
    reset,
    updateCounter,
    clearCount,
  } = useCounterValue({ selectedCounterId, setSelectedCounterId })

  const {
    counters,
    handleListCounter,
    createCounter,
    deleteCounter,
  } = useCounterManager({
    loadOnMount: options.loadOnMount,
    updateCounter,
    clearCount,
    setSelectedCounterId,
  })

  return {
    count,
    counters,
    selectedCounterId,
    getCount,
    increment,
    reset,
    handleListCounter,
    createCounter,
    deleteCounter,
  }
}
