import styled from 'styled-components'

 const StyledFeedbackModalLayout = styled.div`
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  position: relative;
  border-radius: 21px;
  height: 100px;
  width: 100vw;
  bottom: ${props => props.slide ? "0px" : "-400px"};
  opacity: ${props => props.slide ? "1" : "0"};
  transition: all 0.4s ease-out;
  transition-delay: 0.4s;
`
export default StyledFeedbackModalLayout