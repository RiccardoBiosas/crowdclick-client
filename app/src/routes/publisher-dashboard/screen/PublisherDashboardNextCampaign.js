import React from 'react'
import {
    PublisherCampaignTaskSummaryContainer,
    PublisherCampaignTaskBody,
    PublisherCampaignButtonContainer,
  } from '../../publisher-dashboard__new-task/styles/CampaignStyles'
import {useRedirectWithProps} from "../../../hooks/useRedirectWithProps"
import { PUBLISHER_WIZARD_ROUTE } from '../../../config/routes-config'



export const PublisherDashboardNextCampaign = () => {


  return (
      <PublisherCampaignTaskSummaryContainer style={{marginBottom: "20px"}}>
        <div className='nextCampaignLogo' />
        <PublisherCampaignTaskBody>
          <h2>My next campaign</h2>
          <p>Description of the campaign</p>
          <PublisherCampaignButtonContainer>     

            {useRedirectWithProps(`${PUBLISHER_WIZARD_ROUTE}`, 'blue', 'My Next Campaign')}
          </PublisherCampaignButtonContainer>
        </PublisherCampaignTaskBody>
      </PublisherCampaignTaskSummaryContainer>
  )
}
