// theirs
import React, { useState, useEffect } from 'react'
import { DrizzleContext } from '@drizzle/react-plugin'
// components
import NetworkFallback from '../routes/network-fallback'
import LoadingIcon from '../shared/components/loadingIcons/LoadingIcon'

const WaitForDrizzleOrFail = () => {
  const [waitingTimeExpired, setWaitingTimeExpired] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      setWaitingTimeExpired(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [waitingTimeExpired])

  if (waitingTimeExpired) {
    return <NetworkFallback />
  }
  return <LoadingIcon />
}

const withDrizzleInitializer = ComposedComponent => {
  return (
    <DrizzleContext.Consumer>
      {drizzleContext => {
        console.log('DRIZZLE CONTEXT IS ############### ', drizzleContext)
        const { drizzle, drizzleState, initialized } = drizzleContext

        if (!initialized) {
          return <WaitForDrizzleOrFail />
        }

        return (
          <ComposedComponent drizzle={drizzle} drizzleState={drizzleState} />
        )
      }}
    </DrizzleContext.Consumer>
  )
}

export default withDrizzleInitializer
