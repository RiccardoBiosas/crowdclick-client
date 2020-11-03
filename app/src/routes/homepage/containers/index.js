// theirs
import React from 'react'
import { useSelector } from 'react-redux'
// components
import { HomepageFooter } from '../screen/HomepageFooter'
import { HomepageCopyrightFooter } from '../screen/HomepageCopyrightFooter'
import HomepageContactForm from '../screen/HomepageContactForm'
import { HomepageBecomeAPublisher } from '../screen/HomepageBecomeAPublisher'
import { HomepageDoubleCard } from '../screen/HomepageDoubleCard'
import { HomepageBecomeAUser } from '../screen/HomepageBecomeAUser'
// styles
import {
  StyledFlexWrapper,
  StyledHomepageWrapper
} from '../styles/HomepageStyles'

const Homepage = () => {
  const currencyTheme = useSelector(({currencyStyleReducer}) => currencyStyleReducer)
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

export default Homepage
