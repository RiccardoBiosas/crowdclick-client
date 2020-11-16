// theirs
import React from 'react'
import { useHistory } from 'react-router-dom'
// styles
import StyledGeneralCardLayout from '../../../shared/styles/StyledGeneralCardLayout'
import StyledGeneralCardWrapper from '../../../shared/styles/StyledGeneralCardWrapper'
import StyledGlobalButton from '../../../shared/styles/StyledGeneralButton'
import StyledGeneralParagraph from '../../../shared/styles/StyledGeneralParagraph'
// assets
import { metamaskIcon } from '../../../assets'
// contants
import { HOME_ROUTE } from '../../../config/routes-config'

const InstallMetamaskWarning = () => {
  const history = useHistory()
  return (
    <StyledGeneralCardLayout>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img alt='metamask-icon' src={metamaskIcon} />
        <h1 style={{ marginLeft: '18px' }}>
          <span style={{ color: '#F1853B' }}>MetaMask</span> extension needed
        </h1>
      </div>
      <StyledGeneralCardWrapper cardJustify='space-around'>
        <div>
          <StyledGeneralParagraph
            paragraphColor='#000000'
            paragraphFontSize='20px'
          >
            To be a user please{' '}
            <a
              style={{ color: '#F1853B' }}
              href='https://metamask.io/'
              target='_blank'
              rel='noopener noreferrer'
            >
              install
            </a>{' '}
            Metamask browser extension to continue.
          </StyledGeneralParagraph>
        </div>
        <div>
          <StyledGeneralParagraph
            paragraphColor='#000000'
            paragraphFontSize='20px'
          >
            Our Web 3.0 application doesn’t collect any user data and we strive to respect our users' privacy.
          </StyledGeneralParagraph>
        </div>
        <div>
          <StyledGeneralParagraph
            paragraphColor='#000000'
            paragraphFontSize='20px'
          >
            MetaMask is compatible with{' '}
            <span style={{ fontWeight: 900 }}>{'Chrome, Brave & Firefox'}</span>
          </StyledGeneralParagraph>
        </div>
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

export default InstallMetamaskWarning
