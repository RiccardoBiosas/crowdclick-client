import React from 'react'
import StyledImageButton from '../../styles/StyledImageButton'
import { metamaskIcon } from '../../../assets'
import ethereumHandler from '../../../services/blockchain/ethereumHandler'
import { WALLETS } from '../../../constants/blockchain'

const MetamaskConnector = ({ handleCallback }) => (
  <StyledImageButton
    srcImage={metamaskIcon}
    altAttribute='arrow-backward'
    styledMargin='0 1rem 0 0'
    styledWidth='2.6rem'
    style={{
      zIndex: 2
    }}
    onClick={() => handleCallback(WALLETS.METAMASK)}
  />
)

export default MetamaskConnector
