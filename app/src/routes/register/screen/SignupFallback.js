// theirs
import React, { useState } from 'react'
import { Redirect, useHistory, useLocation } from 'react-router'
// assets
import { metamaskIcon, portisLogo } from '../../../assets'
// styes
import StyledGeneralColumnWrapper from '../../../shared/styles/StyledGeneralColumnWrapper'
import StyledGeneralParagraph from '../../../shared/styles/StyledGeneralParagraph'
import StyledGeneralCardLayout from '../../../shared/styles/StyledGeneralCardLayout'
import StyledGeneralCardWrapper from '../../../shared/styles/StyledGeneralCardWrapper'
import StyledGlobalButton from '../../../shared/styles/StyledGeneralButton'
import {
  StyledGeneralHeadingOne,
  StyledGeneralHeadingTwo
} from '../../../shared/styles/StyledGeneralHeadings'
// constants
import {
  USER_TASKS_LIST_ROUTE,
  PUBLISHER_WIZARD_ROUTE,
  HOME_ROUTE
} from '../../../config/routes-config'
import ethereumHandler from '../../../utils/blockchain/ethereumHandler'
import StyledGeneralRowWrapper from '../../../shared/styles/StyledGeneralRowWrapper'
import loginType from '../constants'

const SignupFallback = () => {
  const [redirect, setRedirect] = useState(false)
  const history = useHistory()
  const location = useLocation()

  const loginAndRedirect = async provider => {
    console.log('login redirect here !==== ', provider)
    switch (provider) {
      case loginType.METAMASK:
        console.log('metamask being called')
        await ethereumHandler.initWeb3AndLogin()
        setRedirect(true)
        break
      case loginType.PORTIS_ON_MUMBAI:
        console.log('portis mumbai being called')
        const response = await ethereumHandler.initPortisAndLogin('maticMumbai')
        console.log('connection attempt was ->', response)
        setRedirect(true)
        break
      case loginType.PORTIS_ON_GOERLI:
        console.log('portis goerli being called')
        const a = await ethereumHandler.initPortisAndLogin('goerli')
        setRedirect(true)
      default:
        return
    }
  }

  return (
    <>
      <StyledGeneralCardLayout>
        <div>
          <StyledGeneralHeadingOne>
            Click. Answer. Earn.
          </StyledGeneralHeadingOne>
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
          <StyledGeneralRowWrapper rowHeight='40%'>
            <div style={{ width: '40%' }}>
              <StyledGeneralHeadingTwo
                headingColor='#636262'
                headingFontSize='1.4rem'
              >
                Connect with Metamask
              </StyledGeneralHeadingTwo>
            </div>
            <StyledGeneralRowWrapper rowWidth='20%'>
              <img
                src={metamaskIcon}
                alt='metamask-logo'
                style={{ width: '6rem', height: '8rem' }}
              />
            </StyledGeneralRowWrapper>

            <StyledGeneralColumnWrapper
              columnHeight='80%'
              columnJustify='space-around'
            >
              <StyledGlobalButton
                buttonColor={'orange'}
                buttonTextColor={'#FFFFFF'}
                buttonWidth={240}
                onClick={() => loginAndRedirect(loginType.METAMASK)}
              >
                Connect with Metamask
              </StyledGlobalButton>

              <StyledGeneralParagraph
                paragraphColor='#636262'
                paragraphFontSize='1.2rem'
                paragraphFontWeight='500'
                paragraphLineHeight='1.6'
              >
                You can download metamask
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
          {/* #################### */}
          <StyledGeneralRowWrapper>
            <div style={{ width: '40%' }}>
              <StyledGeneralHeadingTwo
                headingColor='#636262'
                headingFontSize='1.4rem'
              >
                Connect with Portis
              </StyledGeneralHeadingTwo>
            </div>
            <StyledGeneralRowWrapper rowWidth='20%'>
              <img
                src={portisLogo}
                alt='portis-logo'
                style={{ width: '6rem', height: '8rem' }}
              />
            </StyledGeneralRowWrapper>

            <StyledGeneralColumnWrapper
              columnHeight='80%'
              columnJustify='space-around'
            >
              <StyledGlobalButton
                buttonColor={'linear-gradient(90deg, #b06aec 0%, #7839d5 100%)'}
                buttonTextColor={'#FFFFFF'}
                buttonWidth={240}
                onClick={() => loginAndRedirect(loginType.PORTIS_ON_MUMBAI)}
              >
                Connect to Matic with Portis
              </StyledGlobalButton>

              <StyledGeneralParagraph
                paragraphColor='#636262'
                paragraphFontSize='1.2rem'
                paragraphFontWeight='500'
                paragraphLineHeight='1.6'
              >
                ...Or don't install anything at all! <br />
                Easy onboarding with
                <a
                  href='https://www.portis.io/'
                  rel='noopener noreferrer'
                  target='_blank'
                  style={{ paddingLeft: '6px' }}
                >
                  portis
                </a>
              </StyledGeneralParagraph>
              <StyledGlobalButton
                buttonColor={'linear-gradient(90deg, #b06aec 0%, #7839d5 100%)'}
                buttonTextColor={'#FFFFFF'}
                buttonWidth={240}
                onClick={() => loginAndRedirect(loginType.PORTIS_ON_GOERLI)}
              >
                Connect to Goerli with Portis
              </StyledGlobalButton>
            </StyledGeneralColumnWrapper>
          </StyledGeneralRowWrapper>
        </StyledGeneralCardWrapper>
      </StyledGeneralCardLayout>
      {redirect && (
        <Redirect
          to={
            location.state
              ? location.state.next_redirect === 'publisher'
                ? PUBLISHER_WIZARD_ROUTE
                : USER_TASKS_LIST_ROUTE
              : location.pathname || HOME_ROUTE
          }
        />
      )}
    </>
  )
}

export default SignupFallback
