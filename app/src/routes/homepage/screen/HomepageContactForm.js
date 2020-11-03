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
import Stay_in_the_loop from '../../../assets/homepage/img4.svg'
import aeternity_stay_in_the_loop from '../../../assets/images/aeternity_stay_in_the_loop.svg'
import { ReactComponent as SvgSuccess } from '../../../assets/SVG/Success.svg'
import { ReactComponent as SvgFailure } from '../../../assets/SVG/Failure.svg'
// utils
import crowdclickClient from '../../../utils/api/crowdclick'

export const SUCCESSFUL_RESPONSE = 'SUCCESS'
export const UNSUCCESSFUL_RESPONSE = 'UNSUCCESSFUL'

const HomepageContactForm = ({ currencyTheme }) => {
  const [userInput, setUserInput] = useState('')
  const [wasResponseSuccessful, setWasResponseSuccessful] = useState(null)

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
                ? Stay_in_the_loop
                : aeternity_stay_in_the_loop
            }
            alt='cryptocurrency-theme'
          />
        </div>

        <StyledCenteredColumn>
          <StyledContactHeading>
            <h3>Launch Coming Soon…</h3>
          </StyledContactHeading>

          <StyledSpinnerWrapper>
            {wasResponseSuccessful && (
              <StyledCheckmark type={'block'}>
                {wasResponseSuccessful === SUCCESSFUL_RESPONSE ? (
                  <SvgSuccess />
                ) : (
                  <SvgFailure />
                )}
              </StyledCheckmark>
            )}
          </StyledSpinnerWrapper>

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
                  <StyledCheckmark type={'inline'}>
                    {wasResponseSuccessful &&
                    wasResponseSuccessful === SUCCESSFUL_RESPONSE ? (
                      <SvgSuccess />
                    ) : (
                      <SvgFailure />
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
