import { useState } from 'react'

export const useCopyToClipboard = txt => {
  const [clipboardState, setClipboardState] = useState()

  const setState = () => {
    const temporaryInput = document.createElement('input')
    document.body.appendChild(temporaryInput)
    temporaryInput.setAttribute('value', txt)
    temporaryInput.select()
    const copied = document.execCommand('copy')
    document.body.removeChild(temporaryInput)
    setClipboardState(copied)
  }

  return [clipboardState, setState]
}
