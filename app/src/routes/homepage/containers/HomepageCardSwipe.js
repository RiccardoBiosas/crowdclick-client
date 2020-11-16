// theirs
import React, { useState } from 'react'
import { Spring } from 'react-spring/renderprops'
// styles
import StyledGeneralColumnWrapper from '../../../shared/styles/StyledGeneralColumnWrapper'
import StyledGeneralRowWrapper from '../../../shared/styles/StyledGeneralRowWrapper'
import StyledImageButton from '../../../shared/styles/StyledImageButton'
import StyledGlobalButton from '../../../shared/styles/StyledGeneralButton'
import {
  StyledGeneralHeadingTwoWithDarkMode,
  StyledGeneralParagraphWithDarkMode
} from '../../../shared/styles/StyledWithDarkMode'
import { StyledHomepageCardSwipeWrapper } from '../styles/HomepageStyles'
//assets
import { arrowBackward, arrowForward } from '../../../assets'

const HomepageCardSwipe = ({ setFlipped, flipped, cardsSteps }) => {
  const [step, setStep] = useState(0)

  const reversedText = cardsSteps.reversed
    ? {
        right: '60%'
      }
    : {
        left: '60%'
      }

  return (
    <StyledHomepageCardSwipeWrapper>
      <div>
        {cardsSteps.data.map((_, i) => {
          const isReversedFrom = cardsSteps.reversed
            ? {
                right: step <= i ? '0%' : '80%'
              }
            : {
                left: step <= i ? '0%' : '80%'
              }
          const isReversedTo = cardsSteps.reversed
            ? {
                right: step > i ? '120%' : '0%'
              }
            : {
                left: step > i ? '120%' : '0%'
              }
          return (
            <Spring
              from={{
                opacity: step <= i ? 1 : 0,
                transform: `rotate(${24 - i * 6}deg)`,
                ...isReversedFrom
              }}
              to={{
                width: '0%',
                height: '0%',
                opacity: step > i ? 0 : 1,
                transform:
                  step > i ? `rotate(-180deg)` : `rotate(${16 - i * 6}deg)`,
                ...isReversedTo
              }}
              config={{ duration: 800, delay: 200 }}
              key={`card_${cardsSteps.item}_${i}`}
            >
              {props => (
                <img
                  src={cardsSteps.data[i].src}
                  alt={cardsSteps.data[i].altCaption}
                  className='homepage__flippableCards'
                  style={{
                    ...props,
                    position: 'absolute',
                    width: '17rem',
                    height: '17rem',
                    marginLeft: `${4 - i * 1.8}rem`,
                    zIndex: `${cardsSteps.data.length - i}`
                  }}
                />
              )}
            </Spring>
          )
        })}
      </div>
      <div
        className='homepage__flippableCards-descriptions'
        style={{
          display: 'flex',
          position: 'absolute',
          alignItems: 'center',
          ...reversedText
        }}
      >
        <StyledGeneralColumnWrapper>
          <StyledGeneralHeadingTwoWithDarkMode headingFontSize='1.6rem'>
            {cardsSteps.data[step].content.title}
          </StyledGeneralHeadingTwoWithDarkMode>
          <StyledGeneralRowWrapper>
            {step >= 1 && (
              <StyledImageButton
                srcImage={arrowBackward}
                altAttribute='arrow-backward'
                styledMargin='0 1rem 0 0'
                styledWidth='2.6rem'
                onClick={() => setStep(step - 1)}
              />
            )}
            <StyledGeneralParagraphWithDarkMode paragraphLineHeight='1.8'>
              {cardsSteps.data[step].content.text}
            </StyledGeneralParagraphWithDarkMode>
            {step < cardsSteps.data.length - 1 && (
              <StyledImageButton
                srcImage={arrowForward}
                altAttribute='arrow-forward'
                styledMargin='0 0 0 1rem'
                styledWidth='2.6rem'
                onClick={() => setStep(step + 1)}
              />
            )}
          </StyledGeneralRowWrapper>
          {step === cardsSteps.data.length - 1 && (
            <StyledGlobalButton
              buttonWidth='148'
              buttonMargin='30px 0 0 0'
              buttonColor={'green'}
              buttonTextColor={'#FFFFFF'}
              onClick={() => {
                setStep(0)
                setFlipped(!flipped)
              }}
            >
              flip it back
            </StyledGlobalButton>
          )}
        </StyledGeneralColumnWrapper>
      </div>
    </StyledHomepageCardSwipeWrapper>
  )
}

export default HomepageCardSwipe
