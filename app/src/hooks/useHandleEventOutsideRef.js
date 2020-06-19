import { useEffect } from 'react'

export const useHandleEventOutsideRef = (ref, cb_function) => {

  useEffect(() => {
    const listener = event => {
      if (!ref || ref.current.contains(event.target)) {
        return
      } else {
        cb_function()
      }
    }
    document.addEventListener('mousedown', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
    }
  })
}
