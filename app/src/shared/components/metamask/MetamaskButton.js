// theirs
import React from 'react'
// utils
import ethereumHandler from '../../../utils/blockchain/ethereumHandler'
// styles
import StyledGeneralButton from '../../styles/StyledGeneralButton'

const MetamaskButton = () => {
  const initializeWeb3AndLogin = async () => {
    await Promise.all([ethereumHandler.initWeb3(), ethereumHandler.login()])
      .then(response => response)
      .catch(err => console.error(err))
  }

  return (
    <StyledGeneralButton
      buttonTextColor={'#FFFFFF'}
      buttonColor={'green'}
      buttonWidth={140}
      onClick={initializeWeb3AndLogin}
    >
      connect
    </StyledGeneralButton>
  )
}

export default MetamaskButton
