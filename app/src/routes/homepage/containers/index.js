import React from 'react'
import { useSelector } from 'react-redux'
import { HomepageFooter } from '../screen/HomepageFooter'
import { HomepageCopyrightFooter } from '../screen/HomepageCopyrightFooter'
import HomepageContactForm from '../screen/HomepageContactForm'
import {
  StyledFlexWrapper,
  StyledHomepageWrapper
} from '../styles/HomepageStyles'
import { HomepageBecomeAUser } from '../screen/HomepageBecomeAUser'
import { HomepageBecomeAPublisher } from '../screen/HomepageBecomeAPublisher'
import { HomepageDoubleCard } from '../screen/HomepageDoubleCard'


export const Homepage = () => {
  const currencyTheme = useSelector(state => state.currencyStyleReducer)
    .colorStyle

  return (
    <StyledHomepageWrapper>
      <StyledFlexWrapper currencyTheme={currencyTheme}>
        <HomepageDoubleCard currencyTheme={currencyTheme} />      

        <HomepageBecomeAUser currencyTheme={currencyTheme} />
        <HomepageBecomeAPublisher currencyTheme={currencyTheme} />
      </StyledFlexWrapper>

      <HomepageContactForm currencyTheme={currencyTheme} />

      <HomepageFooter />
      <HomepageCopyrightFooter />
    </StyledHomepageWrapper>
  )
}
