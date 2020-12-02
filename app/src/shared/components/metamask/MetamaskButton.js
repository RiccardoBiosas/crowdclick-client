// theirs
import React from 'react'
// utils
import ethereumHandler from '../../../utils/blockchain/ethereumHandler'
// styles
import StyledGeneralButton from '../../styles/StyledGeneralButton'

const MetamaskButton = () => {
  const initializeWeb3AndLogin = async () => {
    await ethereumHandler.initWeb3AndLogin()
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
