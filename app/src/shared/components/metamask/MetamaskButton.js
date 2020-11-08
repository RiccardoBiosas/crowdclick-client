// theirs
import React from 'react'
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError
} from '@web3-react/core'

// utils
import ethereumHandler from '../../../utils/blockchain/ethereumHandler'
// styles
import StyledGeneralButton from '../../styles/StyledGeneralButton'
// import { InjectedConnector } from '@web3-react/injected-connector';
// export const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] });

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
