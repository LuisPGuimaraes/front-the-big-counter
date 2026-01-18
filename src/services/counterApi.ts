import type { CountResponse, Counter } from '../types/counter'

const API_BASE = 'http://localhost:3000'

function buildApiUrl(path: string) {
  return `${API_BASE.replace(/\/$/, '')}${path}`
}

async function parseCountResponse(response: Response) {
  const data: CountResponse = await response.json()

  if (data && typeof data.count === 'number') {
    return data.count
  }

  throw new Error('Unexpected count response')
}

async function requestCount(path: string, options?: RequestInit) {
  const url = buildApiUrl(path)

  const response = await fetch(url, options)

  if (!response.ok) {
    throw new Error(`Failed to request ${path}`)
  }

  const count = await parseCountResponse(response)
  return count
}

export function fetchCount(counterId: number) {
  return requestCount(`/count/${counterId}`)
}

export function incrementCount() {
  return requestCount('/count/increment', { method: 'POST' })
}

export function resetCount() {
  return requestCount('/count/reset', { method: 'POST' })
}

export async function fetchCounters() {
  const url = buildApiUrl('/counter')

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Failed to request /counts')
  }

  const data = await response.json()
  if (Array.isArray(data)) {
    return data as Counter[]
  }

  if (data && typeof data === 'object' && Array.isArray((data as { counters?: unknown }).counters)) {
    return (data as { counters: Counter[] }).counters
  }

  return []
}

export function createCounter(name: string) {
  const body = JSON.stringify({ name })
  return requestCount('/count/create', { method: 'POST', body, headers: { 'Content-Type': 'application/json' } })
}

export function deleteCounter(id: number) {
  return requestCount(`/count/${id}`, { method: 'DELETE' })
}
