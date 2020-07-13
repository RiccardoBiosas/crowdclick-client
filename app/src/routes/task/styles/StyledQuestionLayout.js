import styled, { keyframes, css } from 'styled-components'


const fadeIn = keyframes`
    0% {
      opacity: 0;
    }
 
    100% {
        opacity: 1;
        background-color: green;

    }
`

const fadeOut = keyframes`
  0% {
      opacity: 1;

  }
  90% {
    opacity: 0;
    visibility: hidden; 

  }
 
  100% {
    visibility: hidden; 
    opacity: 0;  
    height: 0;
    width: 0;
  }  
`


const StyledQuestionLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: ${(props) =>
      props.animation === 'fadeIn'
        ? css`
            ${fadeIn} 1s ease-in;
          `
        : css`
            ${fadeOut} 1s ease-out forwards;
          `}
    .questionTitle {
    text-align: center;
  }
`

export default StyledQuestionLayout