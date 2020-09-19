import styled from 'styled-components'
import { StyledGeneralHeadingTwo } from './StyledGeneralHeadings'
import StyledGeneralParagraph from './StyledGeneralParagraph'

export const StyledGeneralHeadingTwoWithDarkMode = styled(
  StyledGeneralHeadingTwo
)`
  color: ${({ theme }) => theme.homepage.swipeCardsHeadingTwo};
`

export const StyledGeneralParagraphWithDarkMode = styled(
  StyledGeneralParagraph
)`
  color: ${({ theme }) => theme.homepage.swipeCardsParagraph};
`
