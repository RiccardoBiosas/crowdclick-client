import React, { useState, div, } from 'react'
import VizSensor from 'react-visibility-sensor'
import default_landing_publisher_image from '../../../assets/homepage/img3.svg'
import aeternity_become_publisher_img from '../../../assets/images/aeternity_become_publisher.svg'
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

export const HomepageBecomeAPublisher = ({currencyTheme}) => {
  const [flipped, setFlipped] = useState(false)


  const slideAnimationFromLeft = useSpring({
    from: { left: '80%', opacity: 0, position: 'relative', width: '100%' },
    to: { width: '0%', left: '0%', height: '0%', opacity: 1 },
    config: { duration: 800 }
  })

  const slideAnimationFromRight = useSpring({
    from: { right: '80%', opacity: 0, position: 'relative', width: '100%' },
    to: { width: '0%', right: '0%', height: '0%', opacity: 1 },
    config: { duration: 800 }
  })


  const { transform, opacity, display } = useSpring({
    opacity: flipped ? 1 : 0,
    display: flipped ? 'none' : '',
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  })
  return (
    <VizSensor partialVisibility={true}>
      {({ isVisible }) => (
        <div>
          <animated.div
            style={{
              opacity: opacity.interpolate(value => 1 - value),
              transform,
              display
            }}
          >
            <CardLayout>
              <Spring
                from={{
                  left: !isVisible ? '80%' : '0%',
                  opacity: !isVisible ? 0 : 1,
                  position: 'relative',
                  width: '100%'
                }}
                to={{ left: isVisible ? '0%' : '80%', height: '0%', opacity: isVisible ? 1 : 0 }}
                config={{ duration: 800 }}
              >
                {/* <animated.div style={slideAnimationFromLeft}> */}
                {props => (
                  <CardContainer style={props}>
                    <CardMainHeading
                      type={'no-break-paragraph'}
                      mainHeadline={32}
                    >
                      Become a publisher
                    </CardMainHeading>

                    <Container>
                      <CardList
                        color={
                          currencyTheme === 'ethereumStyle'
                            ? '#206DFF'
                            : '#311B58'
                        }
                      >
                        <li>
                          Place your website URL, page title & description.
                        </li>
                        <li>Set reward per click</li>
                        <li>Set time duration to stay on your site</li>
                        <li>Place multiple choice question</li>
                      </CardList>
                    </Container>

                    <CardBtnContainer>
                      <GlobalButton
                        onClick={() => setFlipped(!flipped)}
                        buttonColor={
                          currencyTheme === 'ethereumStyle'
                            ? 'blue'
                            : 'darkBlue'
                        }
                        buttonTextColor={'#FFFFFF'}
                      >
                        Get answers
                      </GlobalButton>
                    </CardBtnContainer>
                  </CardContainer>
                )}

                {/* </animated.div> */}
              </Spring>

              <ImgContainer side={'right'}>
                <img
                  src={
                    currencyTheme === 'ethereumStyle'
                      ? default_landing_publisher_image
                      : aeternity_become_publisher_img
                  }
                  className='publisher-img'
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
              <div>
                <h1>hello world</h1>
                <button onClick={() => setFlipped(!flipped)}>
                  flip it back
                </button>
              </div>
            </CardLayout>
          </animated.div>
        </div>
      )}
    </VizSensor>
  )
}
