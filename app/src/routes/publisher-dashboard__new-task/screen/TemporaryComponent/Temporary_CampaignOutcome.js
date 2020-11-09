// theirs
import React from 'react'
// components
import LoadingIcon from '../../../../shared/components/loadingIcons/LoadingIcon'
// styles
import { StyledGeneralHeadingTwo } from '../../../../shared/styles/StyledGeneralHeadings'
// assets
import { kittenWarning, kittenSuccess } from '../../../../assets'

export const Temporary_CampaignOutcome = ({ step, respStatus }) => {
  if (step !== 6) {
    return null
  } else {
    if (!respStatus) {
      return <LoadingIcon />
    } else {
      if (respStatus === 201) {
        return (
          <>
            <div>
              <StyledGeneralHeadingTwo headingFontSize='24px'>
                Campaign Successfully Created!
              </StyledGeneralHeadingTwo>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img alt='create-campaign-successful-icon' src={kittenSuccess} />
            </div>
          </>
        )
      } else if (respStatus === 200) {
        return (
          <>
            <div>
              <StyledGeneralHeadingTwo headingFontSize='24px'>
                Campaign Successfully Edited!
              </StyledGeneralHeadingTwo>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img alt='edit-campaign-successful-icon' src={kittenSuccess} />
            </div>
          </>
        )
      } else {
        return (
          <>
            <div>
              <StyledGeneralHeadingTwo headingFontSize='24px'>
                Campaign not successfully completed
              </StyledGeneralHeadingTwo>
              <p>Go back and review the submitted campaign for errors</p>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img alt='campaign-unsuccessful-icon' src={kittenWarning} />
            </div>
          </>
        )
      }
    }
  }
}
