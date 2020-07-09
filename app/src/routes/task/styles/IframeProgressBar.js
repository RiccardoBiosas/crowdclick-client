import styled, { keyframes, css } from 'styled-components'

const fill = (sec) => {
  return keyframes`
  ${sec}% {
    width: ${sec}%;
  }
  99% {
    width: 100%;
  }

  100% {
    display: none;
  } 
`
}

const animation = (props) => {
  return css`
    ${fill(props.currentSecondPercentage)} ${props.remainingSeconds}s linear 1;
  `
}

const StyledIframeProgressBar = styled.div`
  height: 20px;
  width: 100%;
  border: 1px solid black;
  z-index: 999999999999999999999999999999999999;

  .filledInProgressBar {
    height: 100%;
    background-color: red;
    width: ${(props) =>
      props.remainingSeconds <= 1 ? props.currentSecondPercentage : 100}%;

    animation: ${(props) => (!props.taskFrozen ? animation : null)};
  }
`

export default StyledIframeProgressBar
