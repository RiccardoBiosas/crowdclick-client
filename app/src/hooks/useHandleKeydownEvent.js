import { useEffect } from 'react'

export const useHandleKeydownEvent = (
  key,
  callbackFunc,
  optionalInitialState
) => {
  const keyEventHandler = event => {
    if (event.key === key) {
      callbackFunc()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', keyEventHandler)

    return () => {
      window.removeEventListener('keydown', keyEventHandler)
    }
  }, [keyEventHandler, optionalInitialState])
}

