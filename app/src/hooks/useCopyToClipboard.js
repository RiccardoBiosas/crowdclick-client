import { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const useCopyToClipboard = () => {
  const [clipboardText, setClipboardtext] = useState()
  const notify = (descriptionAndValue) => toast(descriptionAndValue)

  const saveToClipboard = value => {
    const temporaryInput = document.createElement('input')
    document.body.appendChild(temporaryInput)
    temporaryInput.setAttribute('value', value)
    temporaryInput.select()
    document.execCommand('copy')
    document.body.removeChild(temporaryInput)
  }

  const setValue = (value, notifyText) => {
    saveToClipboard(value)
    setClipboardtext(value)
    notify(notifyText || value)
  }

  return [clipboardText, setValue]
}

export default useCopyToClipboard
