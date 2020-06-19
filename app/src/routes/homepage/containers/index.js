import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { HomepageFooter } from '../screen/HomepageFooter'
import { HomepageCopyrightFooter } from '../screen/HomepageCopyrightFooter'
import HomepageContactForm from '../screen/HomepageContactForm'
import {
  FlexContainer,
  HomepageContainer
} from '../styles/HomepageStyles'
import { HomepageBecomeAUser } from '../screen/HomepageBecomeAUser'
import { HomepageBecomeAPublisher } from '../screen/HomepageBecomeAPublisher'
import { HomepageDoubleCard } from '../screen/HomepageDoubleCard'


export const Homepage = () => {
  const currencyTheme = useSelector(state => state.currencyStyleReducer)
    .colorStyle

    const FooterRef = useRef()



  const scrollToElm = () => {
    FooterRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <HomepageContainer>
      <FlexContainer currencyTheme={currencyTheme}>
        <HomepageDoubleCard currencyTheme={currencyTheme} />      

        <HomepageBecomeAUser currencyTheme={currencyTheme} />
        <HomepageBecomeAPublisher currencyTheme={currencyTheme} />
      </FlexContainer>

      <HomepageContactForm currencyTheme={currencyTheme} />

      <HomepageFooter ref={FooterRef} />
      <HomepageCopyrightFooter />
    </HomepageContainer>
  )
}
