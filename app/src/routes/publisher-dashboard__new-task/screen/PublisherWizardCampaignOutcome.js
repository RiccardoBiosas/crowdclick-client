// theirs
import React from 'react'
// components
import LoadingIcon from '../../../shared/components/loadingIcons/LoadingIcon'
// styles
import { StyledGeneralHeadingTwo } from '../../../shared/styles/StyledGeneralHeadings'
import StyledGeneralRowWrapper from '../../../shared/styles/StyledGeneralRowWrapper'
// assets
import { kittenWarning, kittenSuccess } from '../../../assets'

const PublisherWizardCampaignOutcome = ({ step, respStatus }) => {
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
            <StyledGeneralRowWrapper>
              <img alt='create-campaign-successful-icon' src={kittenSuccess} />
            </StyledGeneralRowWrapper>
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
            <StyledGeneralRowWrapper>
              <img alt='edit-campaign-successful-icon' src={kittenSuccess} />
            </StyledGeneralRowWrapper>
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
            <StyledGeneralRowWrapper>
              <img alt='campaign-unsuccessful-icon' src={kittenWarning} />
            </StyledGeneralRowWrapper>
          </>
        )
      }
    }
  }
}

export default PublisherWizardCampaignOutcome
