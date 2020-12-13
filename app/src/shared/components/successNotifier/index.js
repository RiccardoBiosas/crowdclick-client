// theirs
import React from 'react'
// assets
import { successNotification } from '../../../assets'
import { failureNotification } from '../../../assets'
// styles
import StyledCheckmark from '../../styles/StyledCheckmark'

export const SUCCESSFUL_RESPONSE = 'SUCCESS'
export const UNSUCCESSFUL_RESPONSE = 'UNSUCCESSFUL'

const SuccessNotifier = ({ wasResponseSuccessful }) => {
  // console.log('wasresponsesuccessful: ', wasResponseSuccessful)
  return (
    <StyledCheckmark>
      {wasResponseSuccessful &&
      wasResponseSuccessful === SUCCESSFUL_RESPONSE ? (
        <img src={successNotification} alt='success-icon' />
      ) : (
        <img src={failureNotification} alt='failure-icon' />
      )}
    </StyledCheckmark>
  )
}

export default SuccessNotifier
