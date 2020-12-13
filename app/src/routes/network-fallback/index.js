// theirs
import React from 'react'
import { useHistory, Link } from 'react-router-dom'
// styles
import StyledGeneralCardLayout from '../../shared/styles/StyledGeneralCardLayout'
import StyledGeneralCardWrapper from '../../shared/styles/StyledGeneralCardWrapper'
import StyledGlobalButton from '../../shared/styles/StyledGeneralButton'
import StyledGeneralParagraph from '../../shared/styles/StyledGeneralParagraph'
// constants
import {
  HOME_ROUTE,
  TUTORIAL_ROUTE
} from '../../constants/config/routes-config'
import config from '../../constants/config/env-config'

const NetworkFallback = ({ currentNetwork }) => {
  const history = useHistory()
  return (
    <StyledGeneralCardLayout>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h1 style={{ marginLeft: '18px' }}>Something went wrong!</h1>
      </div>
      <StyledGeneralCardWrapper cardJustify='space-around'>
        <StyledGeneralParagraph
          paragraphColor='#000000'
          paragraphFontSize='20px'
          paragraphLineHeight='1.6'
        >
          Please check your{' '}
          <a
            style={{ color: '#F1853B' }}
            href='https://metamask.io/'
            target='_blank'
            rel='noopener noreferrer'
          >
            MetaMask
          </a>{' '}
          configuration
        </StyledGeneralParagraph>
        <StyledGeneralParagraph
          paragraphColor='#000000'
          paragraphFontSize='20px'
          paragraphLineHeight='1.6'
        >
          It seems that your metamask is currently on the <br /> Ethereum{' '}
          <a
            style={{ color: '#F1853B' }}
            href='https://metamask.io/'
            target='_blank'
            rel='noopener noreferrer'
          >
            {config.blockchain[currentNetwork].chainName} chain
          </a>
          <br />
        </StyledGeneralParagraph>
        <StyledGeneralParagraph
          paragraphColor='#000000'
          paragraphFontSize='20px'
          paragraphLineHeight='1.6'
        >
          Our contract is currently deployed on Matic Mumbai and Goerli, <br />
          so make sure that your MetaMask is too!
        </StyledGeneralParagraph>
        <StyledGeneralParagraph
          paragraphColor='#000000'
          paragraphFontSize='20px'
          paragraphLineHeight='1.6'
        >
          Click to see how via our tutorial{' '}
          <Link to={TUTORIAL_ROUTE}>here</Link>
        </StyledGeneralParagraph>
        <div>
          <StyledGlobalButton
            type='button'
            buttonColor='blue'
            buttonTextColor='white'
            buttonWidth='180'
            onClick={() => history.push(HOME_ROUTE)}
          >
            Close
          </StyledGlobalButton>
        </div>
      </StyledGeneralCardWrapper>
    </StyledGeneralCardLayout>
  )
}

export default NetworkFallback
