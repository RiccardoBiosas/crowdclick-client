import styled from 'styled-components'

const StyledTaskIframeLayout = styled.div`
  height: ${props => props.slide ? "calc(100vh - 300px)" : "100vh"};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: ${props => props.slide ? "20px" : ""};
  transition: bottom 0.6s ease-out;
  
`

export default StyledTaskIframeLayout