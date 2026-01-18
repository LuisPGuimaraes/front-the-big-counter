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
  console.log(`[count-api] request -> ${url}`)

  const response = await fetch(url, options)
  console.log(`[count-api] response <- ${response.status}`)

  if (!response.ok) {
    throw new Error(`Failed to request ${path}`)
  }

  const count = await parseCountResponse(response)
  console.log(`[count-api] count: ${count} | status: ${response.status}`)
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
  console.log(`[count-api] request -> ${url}`)

  const response = await fetch(url)
  console.log(response)
  console.log(`[count-api] response <- ${response.status}`)

  if (!response.ok) {
    throw new Error('Failed to request /counts')
  }

  const counters = (await response.json()) as Counter[]
  console.log(`[count-api] counters: ${counters.length} | status: ${response.status}`)
  return counters
}

export function createCounter(name: string) {
  const body = JSON.stringify({ name })
  return requestCount('/count/create', { method: 'POST', body, headers: { 'Content-Type': 'application/json' } })
}

export function deleteCounter(id: number) {
  return requestCount(`/count/${id}`, { method: 'DELETE' })
}
