import {useState,useEffect} from 'react'


export const useWindowSize = () => {
  // const {innerWidth: width, innerHeight: height} = window;
  const [screenDimensions, setScreenDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  useEffect(() => {
    const handleResize = () =>
      setScreenDimensions({
        ...screenDimensions,
        width: window.innerWidth,
        height: window.innerHeight
      })
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })
  return screenDimensions
}