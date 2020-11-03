import styled from 'styled-components'

const StyledGeneralParagraph = styled.p`
  color: ${({ paragraphColor }) => paragraphColor || 'inherit'};
  font-size: ${({ paragraphFontSize }) => paragraphFontSize || 'inherit'};
  font-weight: ${({ paragraphFontWeight }) => paragraphFontWeight || '400'};
  text-align: ${({ paragraphTextAlign }) => paragraphTextAlign || 'center'};
  ${({ paragraphMargin }) => paragraphMargin && `margin: ${paragraphMargin}`};
  ${({ paragraphLineHeight }) =>
    paragraphLineHeight && `line-height: ${paragraphLineHeight}`};
`

export default StyledGeneralParagraph
