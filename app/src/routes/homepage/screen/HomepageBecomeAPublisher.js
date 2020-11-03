// theirs
import React, { useState } from 'react'
import VizSensor from 'react-visibility-sensor'
import { useSpring, animated } from 'react-spring'
import { Spring } from 'react-spring/renderprops'
// components
import HomepageCardSwipe from '../containers/HomepageCardSwipe'
// assets
import default_landing_publisher_image from '../../../assets/homepage/img3.svg'
import aeternity_become_publisher_img from '../../../assets/images/aeternity_become_publisher.svg'
// styles
import StyledSection from '../../../shared/styles/StyledSection'
import StyledGeneralButton from '../../../shared/styles/StyledGeneralButton'
import {
  StyledImgWrapper,
  StyledCardMainHeading,
  StyledCardList,
  StyledCardLayout,
  StyledCenteredColumnWithMediaQueries
} from '../styles/HomepageStyles'
// constants
import { becomePublisherSteps } from '../constants'

export const HomepageBecomeAPublisher = ({ currencyTheme }) => {
  const [flipped, setFlipped] = useState(false)
  const [isVizSensorActive, setIsVizSensorActive] = useState(true)
  const [visibilityCount, setVisibilityCount] = useState(0)

  const handleVisibility = isVisible => {
    if (isVisible < 1) {
      setVisibilityCount(visibilityCount + 1)
    }
    if (visibilityCount >= 1) {
      setIsVizSensorActive(false)
    }
  }

  const { transform, opacity, display } = useSpring({
    opacity: flipped ? 1 : 0,
    display: flipped ? 'none' : '',
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  })
  return (
    <VizSensor
      partialVisibility={true}
      minTopValue={120}
      active={isVizSensorActive}
      onChange={handleVisibility}
    >
      {({ isVisible }) => (
        <StyledSection styledHeight={flipped ? '30rem' : ''}>
          <animated.div
            style={{
              opacity: opacity.interpolate(value => 1 - value),
              transform,
              display
            }}
          >
            <StyledCardLayout>
              <Spring
                from={{
                  left: !isVisible ? '80%' : '0%',
                  opacity: !isVisible ? 0 : 1,
                  position: 'relative',
                  width: '100%'
                }}
                to={{
                  left: isVisible ? '0%' : '80%',
                  height: '0%',
                  opacity: isVisible ? 1 : 0
                }}
                config={{ duration: 800 }}
              >
                {props => (
                  <StyledCenteredColumnWithMediaQueries
                    containerMargin='0 0 48px 0'
                    style={props}
                  >
                    <StyledCardMainHeading
                      type={'no-break-paragraph'}
                      mainHeadline={32}
                    >
                      Become a publisher
                    </StyledCardMainHeading>

                    <div>
                      <StyledCardList
                        color={
                          currencyTheme === 'ethereumStyle'
                            ? '#206DFF'
                            : '#311B58'
                        }
                      >
                        <li>
                          {'Place your website URL, page title & description.'}
                        </li>
                        <li>Set reward per click</li>
                        <li>Set time duration to stay on your site</li>
                        <li>Place multiple choice question</li>
                      </StyledCardList>
                    </div>

                    <div>
                      <StyledGeneralButton
                        onClick={() => setFlipped(!flipped)}
                        buttonWidth='135'
                        buttonMargin='30px 0 0 0'
                        buttonColor={
                          currencyTheme === 'ethereumStyle'
                            ? 'blue'
                            : 'darkBlue'
                        }
                        buttonTextColor={'#FFFFFF'}
                      >
                        Learn more
                      </StyledGeneralButton>
                    </div>
                  </StyledCenteredColumnWithMediaQueries>
                )}
              </Spring>

              <StyledImgWrapper side={'right'}>
                <img
                  src={
                    currencyTheme === 'ethereumStyle'
                      ? default_landing_publisher_image
                      : aeternity_become_publisher_img
                  }
                  className='publisher-img'
                  alt='publisher-icon'
                />
              </StyledImgWrapper>
            </StyledCardLayout>
          </animated.div>

          <animated.div
            style={{
              opacity,
              transform: transform.interpolate(t => `${t} rotateX(180deg)`),
              display: display.interpolate(d => (d === '' ? 'none' : ''))
            }}
          >
            <StyledCardLayout>
              <HomepageCardSwipe
                setFlipped={setFlipped}
                flipped={flipped}
                cardsSteps={becomePublisherSteps}
              />
            </StyledCardLayout>
          </animated.div>
        </StyledSection>
      )}
    </VizSensor>
  )
}
