import styled from 'styled-components'

const StyledSection = styled.section`
  ${({ styledHeight }) => styledHeight && ` height: ${styledHeight}`}
`

export default StyledSection
