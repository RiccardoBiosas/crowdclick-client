// theirs
import React, { useState } from 'react'
import { Redirect, useHistory, useLocation } from 'react-router'
// assets
import { ReactComponent as Placeholder } from '../../../assets/Iframe/ETH-Reward.svg'
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

const SignupFallback = () => {
  const [redirect, setRedirect] = useState(false)
  const history = useHistory()
  const location = useLocation()

  const login = async () => {
    await Promise.all([ethereumHandler.initWeb3(), ethereumHandler.login()])
      .then(response => {
        setRedirect(true)
        return response
      })
      .catch(err => console.error(err))
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
          <div>
            <StyledGeneralHeadingTwo>
              Connect with Metamask
            </StyledGeneralHeadingTwo>
          </div>
          <div>
            <Placeholder />
          </div>

          <StyledGeneralColumnWrapper
            columnHeight='100%'
            columnJustify='space-around'
          >
            <StyledGlobalButton
              buttonColor={'orange'}
              buttonTextColor={'#FFFFFF'}
              buttonWidth={240}
              onClick={login}
            >
              Connect with metamask
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
            <StyledGeneralParagraph
              paragraphColor='#636262'
              paragraphFontSize='1.4rem'
              paragraphFontWeight='500'
              paragraphLineHeight='1.6'
            >
              Step 1 of 2
            </StyledGeneralParagraph>
          </StyledGeneralColumnWrapper>
        </StyledGeneralCardWrapper>
      </StyledGeneralCardLayout>
      {redirect && (
        <Redirect
          to={
            location.state
              ? location.state.next_redirect === 'publisher'
                ? PUBLISHER_WIZARD_ROUTE
                : USER_TASKS_LIST_ROUTE
              : HOME_ROUTE
          }
        />
      )}
    </>
  )
}

export default SignupFallback
