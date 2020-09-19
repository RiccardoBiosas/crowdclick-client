import styled from 'styled-components'

const StyledAbsoluteWrapper = styled.div`
    position: absolute:
    ${({ styledDisplay }) => styledDisplay && `display: ${styledDisplay};`}
    ${({ styledHeight }) => styledHeight && `height: ${styledHeight};`}
    ${({ styledWidth }) => styledWidth && `width: ${styledWidth};`}
    ${({ styledLeft }) => styledLeft && `left: ${styledLeft};`}
    ${({ styledRight }) => styledRight && `left: ${styledRight};`}

`

export default StyledAbsoluteWrapper
