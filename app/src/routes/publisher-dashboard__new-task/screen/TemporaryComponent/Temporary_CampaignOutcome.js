import React, { Fragment } from 'react'
import { CampaignHeader } from '../../styles/CampaignStyles'
import { ReactComponent as SvgSuccess } from '../../../../assets/SVG/Success.svg'
import { ReactComponent as SvgFailure } from '../../../../assets/SVG/Failure.svg'
import { LoadingIcon } from '../../../../shared/LoadingIcon'

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
            <CampaignHeader>
              <h2>Campaign Successfully Created!</h2>
            </CampaignHeader>
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
              <CampaignHeader>
                <h2>Campaign Successfully Edited!</h2>
              </CampaignHeader>
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
            <CampaignHeader>
              <h2>Campaign Not Successfully Complete</h2>
              <p>Try to go back and review the submitted data</p>
            </CampaignHeader>
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