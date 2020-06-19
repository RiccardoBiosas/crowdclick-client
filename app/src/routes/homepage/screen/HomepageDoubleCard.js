import React from 'react'
import VizSensor from 'react-visibility-sensor'
import default_landing_double_image from '../../../assets/homepage/img1.svg'
import aeternity_landing_img from '../../../assets/images/aeternity_landing-page.svg'
import { GlobalButton } from '../../../shared/GlobalButton'

import {
  ImgContainer,
  Container,
  CardMainHeading,
  CardContainer,
  CardBtnContainer,
  CardLayout
} from '../styles/HomepageStyles'
import { Spring } from 'react-spring/renderprops'
import { useHistory } from 'react-router-dom'
import {
  REGISTER_FALLBACK_ROUTE,
  PUBLISHER_WIZARD_ROUTE,
  USER_TASKS_ROUTE,
  
} from '../../../config/routes-config'

export const HomepageDoubleCard = ({ currencyTheme }) => {
  const history = useHistory()

  const handleRedirect = redirectRoute => {
    if (!window.localStorage.getItem('userPubKey')) {
      history.push({
        pathname: REGISTER_FALLBACK_ROUTE,
        state: { next_redirect: redirectRoute }
      })
    } else {
      if (redirectRoute === 'publisher') {
        history.push(PUBLISHER_WIZARD_ROUTE)
      }
      if (redirectRoute === 'user') {
        history.push(USER_TASKS_ROUTE)
      }
    }
  }
  return (
    <VizSensor partialVisibility={true}>
      {({ isVisible }) => (
        <CardLayout>
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
              <CardContainer style={props}>
                <Container type={'double-card-first'}>
                  <CardMainHeading type={'break-paragraph'} mainHeadline={40}>
                    Click. Answer. Earn.
                  </CardMainHeading>
                  <p>
                    Go on interesting sites, click to answer
                    {currencyTheme === 'ethereumStyle'
                      ? ' & earn ETH'
                      : ' & earn AE'}
                  </p>
                  <CardBtnContainer>
                    <GlobalButton
                      onClick={() => handleRedirect('user')}
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
                </Container>
                <Container>
                  <CardMainHeading type={'break-paragraph'} mainHeadline={40}>
                    Traffic. Feedback. Grow.
                  </CardMainHeading>
                  <p>Publish your site, set a reward and ask a question.</p>
                  <p>Get traffic and first impression feedback.</p>
                  <CardBtnContainer>
                    <GlobalButton
                      onClick={() => handleRedirect('publisher')}
                      buttonColor={
                        currencyTheme === 'ethereumStyle' ? 'blue' : 'darkBlue'
                      }
                      buttonTextColor={'#FFFFFF'}
                    >
                      Get answers
                    </GlobalButton>
                  </CardBtnContainer>
                </Container>
              </CardContainer>
            )}
          </Spring>
          <ImgContainer type={'double-card'}>
            <img
              src={
                currencyTheme === 'ethereumStyle'
                  ? default_landing_double_image
                  : aeternity_landing_img
              }
              className='double-card-img'
              alt='landing_image'
            />
          </ImgContainer>
        </CardLayout>
      )}
    </VizSensor>
  )
}
