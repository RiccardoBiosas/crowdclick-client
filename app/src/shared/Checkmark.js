import styled from "styled-components";

export const Checkmark = styled.div`
svg {
    width: 50px;
    display: inline;
    position: ${props => props.type === "inline" ? "absolute" : "relative"};
    right: 52vw;
    @media screen and (max-width: 700px) {
        right: 80vw;
    }
    @media screen and (max-width: 620px) {
        right: 87vw;
    }
    @media screen and (max-width: 620px) {
        width: 40px;
        margin-top: 5px;
    }
    @media screen and (max-width: 450px) {
        width: 35px;
        right: 0;
        bottom: 3vh;
    }
  }
  
.path {
    stroke-dasharray: 1000;
    stroke-dashoffset: 0;
    &.circle {
      animation: dash .9s ease-in-out;
    }
    &.line {
      stroke-dashoffset: 1000;
      animation: dash .9s .35s ease-in-out forwards;
    }
    &.check {
      stroke-dashoffset: -100;
      animation: dash-check .9s .35s ease-in-out forwards;
    }
}
  
  @keyframes dash {
    0% {
      stroke-dashoffset: 1000;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }
  
  
  
  @keyframes dash-check {
    0% {
      stroke-dashoffset: -100;
    }
    100% {
      stroke-dashoffset: 900;
    }
  }
  
  

`

