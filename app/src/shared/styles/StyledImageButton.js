import styled from 'styled-components'

const StyledImageButton = styled.img.attrs(({ altAttribute, srcImage }) => {
  return {
    src: srcImage,
    alt: altAttribute,
    role: 'button'
  }
})`
  ${({ styledHeight }) => styledHeight && `height: ${styledHeight};`}
  ${({ styledWidth }) =>
    styledWidth && `width: ${styledWidth};`}
  ${({ styledMargin }) => styledMargin && `margin: ${styledMargin};`}
  cursor: pointer;
`
export default StyledImageButton
