import React from 'react'
import { RingLoader } from 'react-spinners'

const LoadingIcon = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh'
      }}
    >
      <RingLoader size={140} />
    </div>
  )
}

export default LoadingIcon;