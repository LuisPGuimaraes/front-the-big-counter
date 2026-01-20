import { useState } from 'react'
import type { FormEvent } from 'react'

type CreateCounterPanelProps = {
  onCreate: (name: string) => void
}

function CreateCounterPanel({ onCreate }: CreateCounterPanelProps) {
  const [name, setName] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedName = name.trim()
    if (!trimmedName) {
      return
    }

    onCreate(trimmedName)
    setName('')
  }

  return (
    <section className="counters-panel counters-panel-create" aria-labelledby="create-counter-title">
      <h2 className="counters-title" id="create-counter-title">
        Create Counter
      </h2>
      <form className="counters-form" onSubmit={handleSubmit}>
        <input
          className="counters-input"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Counter name"
          aria-label="Counter name"
        />
        <button className="counters-action" type="submit">
          Name
        </button>
      </form>
    </section>
  )
}

export default CreateCounterPanel
