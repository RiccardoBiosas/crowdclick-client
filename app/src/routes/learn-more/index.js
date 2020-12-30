// theirs
import React from 'react'
import { useHistory } from 'react-router'
// assets
import { metamaskIcon, portisLogo, walletConnectLogo } from '../../assets'
// styes
import StyledGeneralColumnWrapper from '../../shared/styles/StyledGeneralColumnWrapper'
import StyledGeneralParagraph from '../../shared/styles/StyledGeneralParagraph'
import StyledGeneralCardLayout from '../../shared/styles/StyledGeneralCardLayout'
import StyledGeneralCardWrapper from '../../shared/styles/StyledGeneralCardWrapper'
import StyledGlobalButton from '../../shared/styles/StyledGeneralButton'
import {
  StyledGeneralHeadingOne,
  StyledGeneralHeadingTwo
} from '../../shared/styles/StyledGeneralHeadings'
// constants
import StyledGeneralRowWrapper from '../../shared/styles/StyledGeneralRowWrapper'

const LearnMore = () => {
  const history = useHistory()

  return (
    <StyledGeneralCardLayout>
      <div>
        <StyledGeneralHeadingOne>Click. Answer. Earn.</StyledGeneralHeadingOne>
      </div>
      <StyledGeneralCardWrapper>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <div>
            <button
              type='button'
              style={{
                paddingRight: '20px',
                paddingTop: '14px',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer'
              }}
              onClick={() => history.push('/')}
            >
              x
            </button>
          </div>
        </div>

        <StyledGeneralColumnWrapper
          columnHeight='100%'
          columnJustify='space-around'
        >
          {/* METAMASK */}
          <StyledGeneralRowWrapper rowWidth={'80%'}>
            <img
              style={{ width: '4rem' }}
              src={metamaskIcon}
              alt='metamask-logo'
            />

            <StyledGeneralColumnWrapper>
              <StyledGlobalButton
                buttonColor={'orange'}
                buttonTextColor={'#FFFFFF'}
                buttonWidth={240}
                // onClick={() => loginAndRedirect(loginType.METAMASK)}
              >
                Check out Metamask
              </StyledGlobalButton>

              <StyledGeneralParagraph
                paragraphColor='#636262'
                // paragraphFontSize='1.2rem'
                paragraphFontWeight='500'
                paragraphLineHeight='1.6'
              >
                The most popular cryptowallet in the web3 space.
                <br />
                follow the steps, secure your account and then welcome to the
                world of DApps!
                <a
                  href='https://metamask.io/'
                  rel='noopener noreferrer'
                  target='_blank'
                  style={{ paddingLeft: '6px' }}
                >
                  here
                </a>
              </StyledGeneralParagraph>
            </StyledGeneralColumnWrapper>
          </StyledGeneralRowWrapper>

          {/* WALLETCONNECT */}
          <StyledGeneralRowWrapper rowWidth={'80%'}>
            <img
              style={{ width: '4rem' }}
              src={walletConnectLogo}
              alt='wallet-connect-logo'
            />
            <StyledGeneralColumnWrapper>
              <StyledGlobalButton
                buttonColor={'#3C97F8'}
                buttonTextColor={'#FFFFFF'}
                buttonWidth={240}
                onClick={() =>
                  window.open('https://walletconnect.org/', '_blank')
                }
              >
                Check out WalletConnect
              </StyledGlobalButton>
              <StyledGeneralParagraph
                paragraphColor='#636262'
                // paragraphFontSize='1.2rem'
                paragraphFontWeight='500'
                paragraphLineHeight='1.6'
              >
                The most popular mobile-wallet in the web3 space.
                <br />
                Want to use web3 on your mobile phone? <br /> Just scan a QR
                code with one of the WalletConnect-supported wallets and you're
                good to go!
              </StyledGeneralParagraph>
            </StyledGeneralColumnWrapper>
          </StyledGeneralRowWrapper>

          {/* PORTIS */}
          <StyledGeneralRowWrapper rowWidth={'80%'}>
            <img src={portisLogo} alt='portis-logo' style={{ width: '4rem' }} />
            <StyledGeneralColumnWrapper>
              <StyledGlobalButton
                buttonColor={'linear-gradient(90deg, #b06aec 0%, #7839d5 100%)'}
                buttonTextColor={'#FFFFFF'}
                buttonWidth={240}
                onClick={() => window.open('https://www.portis.io/', '_blank')}
              >
                Check out Portis
              </StyledGlobalButton>
              <StyledGeneralParagraph
                paragraphColor='#636262'
                // paragraphFontSize='1.2rem'
                paragraphFontWeight='500'
                paragraphLineHeight='1.6'
              >
                Enjoy the easiest onboarding process with Portis.
              </StyledGeneralParagraph>{' '}
            </StyledGeneralColumnWrapper>
          </StyledGeneralRowWrapper>
        </StyledGeneralColumnWrapper>
      </StyledGeneralCardWrapper>
    </StyledGeneralCardLayout>
  )
}

export default LearnMore
