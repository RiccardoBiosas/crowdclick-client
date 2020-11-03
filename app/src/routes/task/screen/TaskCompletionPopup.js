// theirs
import React from 'react'
// styles
import StyledTaskLayout from '../styles/StyledTaskLayout'
import StyledGeneralButton from '../../../shared/styles/StyledGeneralButton'
// assets
import { ReactComponent as SVGReward } from '../../../assets/Iframe/ETH-Reward.svg'
// components
import useRedirectWithProps from '../../../hooks/useRedirectWithProps'
// constants
import { USER_TASKS_LIST_ROUTE } from '../../../config/routes-config'

export const TaskCompletionPopup = ({ url }) => {
  return (
    <StyledTaskLayout>
      <h2>Your Ether is on its way</h2>
      <div style={{ width: '180px', height: '180px' }}>
        <SVGReward />
      </div>
      <div className='buttonContainer'>
        <StyledGeneralButton
          buttonColor={'white'}
          buttonTextColor={'#206DFF'}
          buttonMargin={'0px 20px 20px 0px'}
          buttonWidth={200}
          onClick={() => window.open(url, '_blank')}
        >
          View Site
        </StyledGeneralButton>
        {useRedirectWithProps(USER_TASKS_LIST_ROUTE, 'blue', 'New Task')}
      </div>
    </StyledTaskLayout>
  )
}
