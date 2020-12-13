import React from 'react'
import StyledImageButton from '../../styles/StyledImageButton'
import { portisLogo } from '../../../assets'
import { WALLETS } from '../../../constants/blockchain'

const PortisConnector = ({ handleCallback }) => (
  <StyledImageButton
    srcImage={portisLogo}
    altAttribute='arrow-backward'
    styledMargin='0 1rem 0 0'
    styledWidth='2.6rem'
    style={{
      zIndex: 2
    }}
    onClick={() => handleCallback(WALLETS.PORTIS)}
  />
)

export default PortisConnector
