import { useEffect } from 'react'

export const useHandleEventOutsideRef = (ref, cbFunction) => {

  useEffect(() => {
    const listener = event => {
      if (!ref || ref.current.contains(event.target)) {
        return
      } else {
        cbFunction()
      }
    }
    document.addEventListener('mousedown', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
    }
  })
}
