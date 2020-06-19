import React from 'react'


export const HomepageBecomeAUserFlipped = ({ setFlipped, flipped }) => {

  return (
    <button onClick={() => setFlipped(!flipped)}>
    flip it back
  </button>
  )
}

