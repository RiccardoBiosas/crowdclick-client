import styled from "styled-components";

export const Checkmark = styled.svg`
  width: 50px;
  display: inline;
  position: absolute;

  .path {
    stroke-dasharray: 1000;
    stroke-dashoffset: 0;
    &.circle {
      animation: dash 0.9s ease-in-out;
    }
    &.line {
      stroke-dashoffset: 1000;
      animation: dash 0.9s 0.35s ease-in-out forwards;
    }
    &.check {
      stroke-dashoffset: -100;
      animation: dash-check 0.9s 0.35s ease-in-out forwards;
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
`;
