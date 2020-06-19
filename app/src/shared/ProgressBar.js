import React from 'react'
import { ProgressBarContainer } from './progressbar-styles'

export const ProgressBar = ({totalSteps, step}) => {
  // console.log("progress bar current step", step)
  return (
    <ProgressBarContainer totalSteps={totalSteps}>
      {/* <ul>
        <li>step1</li>
        <li className='complete'>step2</li>
        <li>step3</li>
      </ul> */}
      <ul>
        {Array.from({length: totalSteps+1}, (v, i) => i).slice(1).map(x=> <li key={`step${x}`} className={step < x ? "complete" : step === x ? "complete current" : ""} />)}
      </ul>
    </ProgressBarContainer>
  )
}

