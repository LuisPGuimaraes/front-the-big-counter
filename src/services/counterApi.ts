const API_BASE = 'http://localhost:3000'

function buildApiUrl(path: string) {
  return `${API_BASE.replace(/\/$/, '')}${path}`
}

type CountResponse = {
  count: number
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

export function fetchCount() {
  return requestCount('/count')
}

export function incrementCount() {
  return requestCount('/count/increment', { method: 'POST' })
}

export function resetCount() {
  return requestCount('/count/reset', { method: 'POST' })
}
