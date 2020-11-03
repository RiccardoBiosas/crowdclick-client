import React from 'react'
import { RingLoader } from 'react-spinners'

const LoadingIcon = ({loadingIconCustomStyles}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        ...loadingIconCustomStyles
      }}
    >
      <RingLoader size={140} />
    </div>
  )
}

export default LoadingIcon
