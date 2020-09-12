import React, { useState } from 'react'
import VizSensor from 'react-visibility-sensor'
import { useSpring, animated } from 'react-spring'
import { Spring } from 'react-spring/renderprops'

//Components
import HomepageCardSwipe from '../containers/HomepageCardSwipe'

//Constants
import {becomeUserSteps} from '../constants'

//Styled
import StyledGeneralButton  from '../../../shared/styles/StyledGeneralButton'
import {
  StyledImgWrapper,
  StyledCardMainHeading,
  StyledCardList,
  StyledCardLayout,
  StyledCenteredColumnWithMediaQueries
} from '../styles/HomepageStyles'

//Assets
import default_landing_user_image from '../../../assets/homepage/img2.svg'
import aeternity_become_user_img from '../../../assets/images/aeternity_become_user.svg'

export const HomepageBecomeAUser = ({currencyTheme}) => {
  const [flipped, setFlipped] = useState(false)
  const [isVizSensorActive, setIsVizSensorActive] = useState(true)
  const [visibilityCount, setVisibilityCount] = useState(0)


  const handleVisibility = (isVisible) => {
    if(isVisible < 1) {
      setVisibilityCount(visibilityCount+1)
    }
    if(visibilityCount >= 1) {
      setIsVizSensorActive(false)
      
    }
  }


  // const slideAnimationFromRight = useSpring({
  //   from: { right: '80%', opacity: 0, position: 'relative', width: '100%' },
  //   to: { width: '0%', right: '0%', height: '0%', opacity: 1 },
  //   config: { duration: 800 }
  // })
  // const slideAnimationFromLeft = useSpring({
  //   from: { left: '80%', opacity: 0, position: 'relative', width: '100%' },
  //   to: { width: '0%', left: '0%', height: '0%', opacity: 1 },
  //   config: { duration: 800 }
  // })


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
      {({isVisible}) => (
        <div>
          <animated.div
            style={{
              opacity: opacity.interpolate(value => 1 - value),
              transform,
              display
            }}
          >
            <StyledCardLayout>
              <StyledImgWrapper style={{width: '100%'}} type={'disappearing'}>
                <img
                  src={
                    currencyTheme === 'ethereumStyle'
                      ? default_landing_user_image
                      : aeternity_become_user_img
                  }
                  className='user-img'
                  alt='user_image'
                />
              </StyledImgWrapper>

              {/* <animated.div style={slideAnimationFromRight}> */}
              <Spring
                from={{
                  right: !isVisible ? '80%' : '0%',
                  opacity: !isVisible ? 0 : 1,
                  position: 'relative',
                  
                }}
                to={{right: isVisible ? '0%' : '80%', height: '0%', opacity: isVisible ? 1 : 0 }}
                config={{ duration: 800 }}
              >
                {props => (
                  <StyledCenteredColumnWithMediaQueries containerMargin="0 0 48px 0" style={props} side={'left'}>
                    <StyledCardMainHeading
                      type={'no-break-paragraph'}
                      mainHeadline={32}
                    >
                      Become a user
                    </StyledCardMainHeading>

                    <div>
                      <StyledCardList
                        color={
                          currencyTheme === 'ethereumStyle'
                            ? '#00E15D'
                            : '#F7296E'
                        }
                      >
                        <li>Click website</li>
                        <li>Stay on for a time duration count down</li>
                        <li>Answer multiple choice question</li>
                        <li>
                          {currencyTheme === 'ethereumStyle'
                            ? 'Receive ETH'
                            : 'Receive AE'}{' '}
                          as the reward
                        </li>
                      </StyledCardList>
                    </div>

                    <div>
                      <StyledGeneralButton
                        onClick={() => setFlipped(!flipped)}
                        buttonWidth='135'
                        buttonMargin='30px 0 0 0'
                        buttonColor={
                          currencyTheme === 'ethereumStyle' ? 'green' : 'purple'
                        }
                        buttonTextColor={'#FFFFFF'}
                      >
                        {currencyTheme === 'ethereumStyle'
                          ? 'Earn ETH'
                          : 'Earn AE'}
                      </StyledGeneralButton>
                    </div>
                  </StyledCenteredColumnWithMediaQueries>
                )}
              </Spring>

              {/* </animated.div> */}

              <StyledImgWrapper type={'appearing'}>
                <img
                  src={
                    currencyTheme === 'ethereumStyle'
                      ? default_landing_user_image
                      : aeternity_become_user_img
                  }
                  alt='publisher_image'
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
              {/* <HomepageBecomeAUserFlipped setFlipped={setFlipped} flipped={flipped}/> */}
            <HomepageCardSwipe setFlipped={setFlipped} flipped={flipped} cardsSteps={becomeUserSteps}  />
            </StyledCardLayout>
          </animated.div>
        </div>
      )}
    </VizSensor>
  )
}
