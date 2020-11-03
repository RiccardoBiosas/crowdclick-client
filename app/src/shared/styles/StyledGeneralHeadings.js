import styled from 'styled-components'

export const StyledGeneralHeadingOne = styled.h1`
  color: ${({ headingColor }) => headingColor || 'inherit'};
  ${({ headingFontSize }) =>
    headingFontSize && `font-size: ${headingFontSize}`};
  ${({ headingMargin }) => headingMargin && `margin: ${headingMargin}`};
  text-align: ${({ headingTextAlign }) => headingTextAlign || 'center'};
`

export const StyledGeneralHeadingTwo = styled.h2`
  color: ${({ headingColor }) => headingColor || 'inherit'};
  ${({ headingFontSize }) =>
    headingFontSize && `font-size: ${headingFontSize}`};
  text-align: ${({ headingTextAlign }) => headingTextAlign || 'center'};
`
