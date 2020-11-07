// theirs
import React from 'react'
// utils
import ethereumHandler from '../../../utils/blockchain/ethereumHandler'
// styles
import StyledGeneralButton from '../../styles/StyledGeneralButton'

const MetamaskButton = () => {
  const initializeWeb3AndLogin = async () => {
    // Promise.all([ethereumHandler.initWeb3(), ethereumHandler.login()])
    //   .then(response => console.log(response))
    //   .catch(err => console.error(err))
    // await ethereumHandler.login()

    await ethereumHandler.initWeb3AndLogin()
    // await ethereumHandler.initPortisAndLogin()
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
