import styled from 'styled-components'
import StyledGeneralCardLayout from '../../../shared/styles/StyledGeneralCardLayout'

const StyledResumeTaskLayout = styled(StyledGeneralCardLayout)`
  position: absolute;
  top: calc(50vh - 200px);
  left: calc(50vw - 400px);
  z-index: 999999999999999999999;
  filter: drop-shadow(0 0 30px #333);
  width: 800px;
  // height: 400px;
`

export default StyledResumeTaskLayout
