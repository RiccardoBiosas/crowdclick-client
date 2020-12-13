// theirs
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
// components
import { ProgressBar } from '../../ProgressBar'
// styles
import StyledGeneralCardLayout from '../../../styles/StyledGeneralCardLayout'
import StyledGeneralCardWrapper from '../../../styles/StyledGeneralCardWrapper'
import StyledImageButton from '../../../styles/StyledImageButton'
import { StyledGeneralHeadingOne } from '../../../styles/StyledGeneralHeadings'
import StyledGeneralRowWrapper from '../../../styles/StyledGeneralRowWrapper'
import StyledGeneralColumnWrapper from '../../../styles/StyledGeneralColumnWrapper'
import StyledGeneralParagraph from '../../../styles/StyledGeneralParagraph'
import StyledGlobalButton from '../../../styles/StyledGeneralButton'
// assets
import { arrowForward, kittenSuccess } from '../../../../assets'
import { arrowBackward } from '../../../../assets'
// constants
import { maticWithEthereumSteps } from '../constants'
import {
  PUBLISHER_DASHBOARD_ROUTE,
  USER_TASKS_LIST_ROUTE
} from '../../../../constants/config/routes-config'

const Tutorial = () => {
  const totalSteps = maticWithEthereumSteps.length
  const [step, setStep] = useState(0)
  const history = useHistory()
  return (
    <StyledGeneralCardLayout>
      <ProgressBar totalSteps={totalSteps} step={step} />

      <StyledGeneralCardWrapper>
        <div style={{ width: '100%' }}>
          <StyledGeneralHeadingOne
            headingColor='#767676'
            headingTextAlign='left'
            headingMargin='1rem 0 0 1.6rem'
            headingFontSize='1.6rem'
          >
            Tutorial
          </StyledGeneralHeadingOne>
        </div>
        <div style={{ width: '100%' }}>
          {step < totalSteps ? (
            <>
              <div>{maticWithEthereumSteps[step].text}</div>
              <StyledGeneralRowWrapper
                rowWidth='100%'
                rowJustify='space-around'
              >
                {step > 0 ? (
                  <StyledImageButton
                    styledHeight='1.6rem'
                    srcImage={arrowBackward}
                    altAttribute='move-forward'
                    onClick={() =>
                      step > 0 ? setStep(step - 1) : setStep(step)
                    }
                  />
                ) : (
                  <div />
                )}

                <video
                  width='600px'
                  height='380px'
                  src={maticWithEthereumSteps[step].video}
                  autoPlay
                  loop
                  controls
                />
                {step < totalSteps ? (
                  <StyledImageButton
                    styledHeight='1.6rem'
                    srcImage={arrowForward}
                    altAttribute='move-forward'
                    onClick={() =>
                      step < totalSteps ? setStep(step + 1) : setStep(step)
                    }
                  />
                ) : (
                  <div />
                )}
              </StyledGeneralRowWrapper>
            </>
          ) : (
            <StyledGeneralColumnWrapper>
              <img
                style={{ width: '20rem' }}
                alt='tutorial-completion-icon'
                src={kittenSuccess}
              />
              <StyledGeneralParagraph
                paragraphColor='#636262'
                paragraphFontSize='1.2rem'
                paragraphFontWeight='500'
                paragraphLineHeight='1.6'
              >
                Congratulations, you are officially a CrowdClicker! <br />
                Start creating and completing tasks, earn crypto and increase
                your brand awareness!
              </StyledGeneralParagraph>
              <StyledGeneralRowWrapper>
                <StyledGlobalButton
                  buttonWidth='190'
                  buttonMargin='0 10px 0 0'
                  buttonColor='green'
                  buttonTextColor='#FFFFFF'
                  onClick={() => history.push(USER_TASKS_LIST_ROUTE)}
                >
                  User Dashboard
                </StyledGlobalButton>
                <StyledGlobalButton
                  buttonWidth='190'
                  buttonMargin='0 0 0 10px'
                  buttonColor='blue'
                  buttonTextColor='#FFFFFF'
                  onClick={() => history.push(PUBLISHER_DASHBOARD_ROUTE)}
                >
                  Publisher Dashboard
                </StyledGlobalButton>
              </StyledGeneralRowWrapper>
            </StyledGeneralColumnWrapper>
          )}
        </div>
      </StyledGeneralCardWrapper>
    </StyledGeneralCardLayout>
  )
}

export default Tutorial
