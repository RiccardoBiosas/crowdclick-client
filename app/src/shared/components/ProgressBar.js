import React from 'react'
import styled, { keyframes, css } from 'styled-components'

const bounce = keyframes`
    0% {
        transform: scale(1)
    }   
    33% {
        transform: scale(0.8)
    }
    44 {
        transform: scale(0.6)
    }
    
    66 {
        transform: scale(1.4)
    }
    100% {
        transform: scale(1)
    }
`

export const StyledProgressBarLayout = styled.div`
  width: 80vw;
  position: relative;
  // z-index: 99999999999;
  z-index: 99;
  margin: 20px 0;
  ul {
    margin: 0;
    padding: 0;
    counter-reset: progress-counter;
  }
  li {
    list-style-type: none;
    float: left;
    width: calc(100% / ${({ totalSteps }) => totalSteps});
    position: relative;
    text-align: center;
    counter-increment: progress-counter;
  }
  li:before {
    background-color: white;
    content: '\\2713';
    width: 40px;
    height: 40px;
    border: 3px solid green;
    display: block;
    border-radius: 50%;
    margin: 0 auto 10px auto;
    font-weight: bold;
    font-size: 22px;
    line-height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  li:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 4px;
    background-color: green;
    top: 15px;
    left: -50%;
    z-index: -5000;
  }
  li:first-child:after {
    content: none;
  }
  li.complete {
    color: blue;
  }
  li.complete:before {
    content: counter(progress-counter);
    // line-height: ;
    border-color: blue;
  }
  li.current:before {
    animation: ${css`
        ${bounce}`} 0.8s ease-in-out;
  }
  li.complete ~ li:after {
    background-color: blue;
    border-color: grey;
  }
  li.complete ~ li:before {
    // border-color: grey;
  }
`

export const ProgressBar = ({ totalSteps, step }) => {
  return (
    <StyledProgressBarLayout totalSteps={totalSteps}>
      <ul>
        {Array.from({ length: totalSteps }, (_, i) => i).map(x => (
          <li
            key={`step${x}`}
            className={
              step < x ? 'complete' : step === x ? 'complete current' : ''
            }
          />
        ))}
      </ul>
    </StyledProgressBarLayout>
  )
}
