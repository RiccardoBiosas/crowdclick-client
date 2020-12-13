// theirs
import React, { useState, useEffect } from 'react'
// styles
import {
  StyledContactFormLayout,
  StyledContactHeading,
  StyledInputFormWrapper,
  StyledSpinnerWrapper,
  StyledContactFormWrapper
} from '../styles/HomepageContactFormStyles'
import StyledCheckmark from '../../../shared/styles/StyledCheckmark'
import { StyledCenteredColumn } from '../styles/HomepageStyles'
// assets
import { stayInTheLoop } from '../../../assets'
import { aeternityStayInTheLoop } from '../../../assets'
// import { SuccessNotification as ReactComponent  } from '../../../assets'
import { SuccessNotification, FailureNotification } from '../../../assets'
// utils
import crowdclickClient from '../../../services/api/crowdclickService'

export const SUCCESSFUL_RESPONSE = 'SUCCESS'
export const UNSUCCESSFUL_RESPONSE = 'UNSUCCESSFUL'

const HomepageContactForm = ({ currencyTheme }) => {
  const [userInput, setUserInput] = useState('')
  const [wasResponseSuccessful, setWasResponseSuccessful] = useState()

  const handleChange = e => {
    const text = e.target.value
    setUserInput(text)
  }

  const forwardEmail = async email => {
    try {
      const response = await crowdclickClient.subscribe({ email })
      setWasResponseSuccessful(response.status && SUCCESSFUL_RESPONSE)
    } catch (error) {
      setWasResponseSuccessful(UNSUCCESSFUL_RESPONSE)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    await forwardEmail(userInput)
    setUserInput('')
  }

  useEffect(() => {
    if (wasResponseSuccessful) {
      setTimeout(() => {
        setWasResponseSuccessful(null)
      }, 2200)
    }
  }, [wasResponseSuccessful])

  return (
    <StyledContactFormLayout currencyTheme={currencyTheme}>
      <StyledContactFormWrapper>
        <div className='logo-wrapper'>
          <img
            src={
              currencyTheme === 'ethereumStyle'
                ? stayInTheLoop
                : aeternityStayInTheLoop
            }
            alt='cryptocurrency-theme'
          />
        </div>

        <StyledCenteredColumn>
          <StyledContactHeading>
            <h3>Launch Coming Soon…</h3>
          </StyledContactHeading>

          {/* <StyledSpinnerWrapper>
            {wasResponseSuccessful && (
              <StyledCheckmark>
                {wasResponseSuccessful === SUCCESSFUL_RESPONSE ? (
                  <SvgSuccess />
                ) : (
                  <SvgFailure />
                )}
              </StyledCheckmark>
            )}
          </StyledSpinnerWrapper> */}

          <StyledInputFormWrapper
            currencyTheme={currencyTheme}
            svgAnimation={wasResponseSuccessful ? 'fadeIn' : null}
          >
            <form onSubmit={handleSubmit}>
              <label htmlFor='subscribeForm'>
                {'Get notified about the launch & updates'}
              </label>

              <div>
                <input
                  id='subscribeForm'
                  type='text'
                  placeholder='Your email'
                  onChange={handleChange}
                  value={userInput}
                  autoComplete='off'
                />

                <input type='submit' value='Get Started' />
              </div>
            </form>
            <div>
              {wasResponseSuccessful && (
                <div className='desktop-svgWrapper'>
                  <StyledCheckmark>
                    {wasResponseSuccessful &&
                    wasResponseSuccessful === SUCCESSFUL_RESPONSE ? (
                      <SuccessNotification />
                    ) : (
                     <FailureNotification />
                    )}
                  </StyledCheckmark>
                </div>
              )}
            </div>
          </StyledInputFormWrapper>
        </StyledCenteredColumn>
      </StyledContactFormWrapper>
    </StyledContactFormLayout>
  )
}

export default HomepageContactForm
