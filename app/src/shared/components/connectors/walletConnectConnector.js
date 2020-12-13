import React from 'react'
import StyledImageButton from '../../styles/StyledImageButton'
import { walletConnectLogo } from '../../../assets'
import { WALLETS } from '../../../constants/blockchain'

const WalletConnectConnector = ({ handleCallback }) => (
  <StyledImageButton
    srcImage={walletConnectLogo}
    altAttribute='arrow-backward'
    styledMargin='0 1rem 0 0'
    styledWidth='2.6rem'
    style={{
      zIndex: 2
    }}
    onClick={() => handleCallback(WALLETS.WALLETCONNECT)}
  />
)

export default WalletConnectConnector
