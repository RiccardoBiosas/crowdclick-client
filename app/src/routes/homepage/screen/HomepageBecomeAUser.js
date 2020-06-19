import React, { useState, div } from 'react'
import VizSensor from 'react-visibility-sensor'
import default_landing_user_image from '../../../assets/homepage/img2.svg'
import aeternity_become_user_img from '../../../assets/images/aeternity_become_user.svg'
import { GlobalButton } from '../../../shared/GlobalButton'

import {
  ImgContainer,
  Container,
  CardMainHeading,
  CardList,
  CardContainer,
  CardBtnContainer,
  CardLayout,
} from '../styles/HomepageStyles'
import { useSpring, animated } from 'react-spring'
import { Spring } from 'react-spring/renderprops'
import { HomepageBecomeAUserFlipped } from './HomepageBecomeAUserFlipped'

export const HomepageBecomeAUser = ({currencyTheme}) => {
  const [flipped, setFlipped] = useState(false)
  const [visibilityTriggered, setVisibilityTriggered] = useState(false)

  const slideAnimationFromRight = useSpring({
    from: { right: '80%', opacity: 0, position: 'relative', width: '100%' },
    to: { width: '0%', right: '0%', height: '0%', opacity: 1 },
    config: { duration: 800 }
  })
  const slideAnimationFromLeft = useSpring({
    from: { left: '80%', opacity: 0, position: 'relative', width: '100%' },
    to: { width: '0%', left: '0%', height: '0%', opacity: 1 },
    config: { duration: 800 }
  })


  const { transform, opacity, display } = useSpring({
    opacity: flipped ? 1 : 0,
    display: flipped ? 'none' : '',
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  })
  return (
    <VizSensor 
    partialVisibility={true}
    once 
   
    onChange={(isVisible) => !visibilityTriggered && isVisible && setVisibilityTriggered(true)}    
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
            <CardLayout>
              <ImgContainer style={{width: '100%'}} type={'disappearing'}>
                <img
                  src={
                    currencyTheme === 'ethereumStyle'
                      ? default_landing_user_image
                      : aeternity_become_user_img
                  }
                  className='user-img'
                  alt='user_image'
                />
              </ImgContainer>

              {/* <animated.div style={slideAnimationFromRight}> */}
              <Spring
                from={{
                  right: !isVisible ? '80%' : '0%',
                  opacity: !isVisible ? 0 : 1,
                  position: 'relative',
                  width: '100%'
                }}
                to={{right: isVisible ? '0%' : '80%', height: '0%', opacity: isVisible ? 1 : 0 }}
                config={{ duration: 800 }}
              >
                {props => (
                  <CardContainer style={props} side={'left'}>
                    <CardMainHeading
                      type={'no-break-paragraph'}
                      mainHeadline={32}
                    >
                      Become a user
                    </CardMainHeading>

                    <Container>
                      <CardList
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
                      </CardList>
                    </Container>

                    <CardBtnContainer>
                      <GlobalButton
                        onClick={() => setFlipped(!flipped)}
                        buttonColor={
                          currencyTheme === 'ethereumStyle' ? 'green' : 'purple'
                        }
                        buttonTextColor={'#FFFFFF'}
                      >
                        {currencyTheme === 'ethereumStyle'
                          ? 'Earn ETH'
                          : 'Earn AE'}
                      </GlobalButton>
                    </CardBtnContainer>
                  </CardContainer>
                )}
              </Spring>

              {/* </animated.div> */}

              <ImgContainer type={'appearing'}>
                <img
                  src={
                    currencyTheme === 'ethereumStyle'
                      ? default_landing_user_image
                      : aeternity_become_user_img
                  }
                  alt='publisher_image'
                />
              </ImgContainer>
            </CardLayout>
          </animated.div>
          <animated.div
            style={{
              opacity,
              transform: transform.interpolate(t => `${t} rotateX(180deg)`),
              display: display.interpolate(d => (d === '' ? 'none' : ''))
            }}
          >
            <CardLayout>
              {/* <div>
                <h1>hello world</h1>
                <button onClick={() => setFlipped(!flipped)}>
                  flip it back
                </button>
              </div> */}
              <HomepageBecomeAUserFlipped setFlipped={setFlipped} flipped={flipped}/>
            </CardLayout>
          </animated.div>
        </div>
      )}
    </VizSensor>
  )
}
