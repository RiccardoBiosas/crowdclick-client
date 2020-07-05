import React, { Fragment } from 'react'
import { ReactComponent as SvgSuccess } from '../../../../assets/SVG/Success.svg'
import { ReactComponent as SvgFailure } from '../../../../assets/SVG/Failure.svg'
import { LoadingIcon } from '../../../../shared/LoadingIcon'
import { StyledGeneralHeadingTwo } from '../../../../shared/styles/StyledGeneralHeadings'

export const Temporary_CampaignOutcome = ({ step, respStatus }) => {
 
  if (step !== 6) {
    return null
  } else {
    console.log("temporary component resp status", respStatus)

    if (!respStatus) {
      return <LoadingIcon />
    } else {

      if (respStatus === 201) {
        return (
          <Fragment>
            <div>
              <StyledGeneralHeadingTwo headingFontSize="24px">Campaign Successfully Created!</StyledGeneralHeadingTwo>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <SvgSuccess style={{ width: '80px' }} />
            </div>
          </Fragment>
        )
      } else if(respStatus === 200) {
        return (
            <Fragment>
              <div>
                <StyledGeneralHeadingTwo headingFontSize="24px">Campaign Successfully Edited!</StyledGeneralHeadingTwo>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <SvgSuccess style={{ width: '80px' }} />
              </div>
            </Fragment>
          )

      } else {
        return (
          <Fragment>
            <div>
              <StyledGeneralHeadingTwo headingFontSize="24px">Campaign Not Successfully Complete</StyledGeneralHeadingTwo>
              <p>Try to go back and review the submitted data</p>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <SvgFailure style={{ width: '80px' }} />
            </div>
          </Fragment>
        )
      }
    }
  }
}