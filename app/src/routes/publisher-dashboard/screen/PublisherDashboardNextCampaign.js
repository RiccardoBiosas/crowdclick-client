// theirs
import React from 'react'
// styles
import { StyledPublisherCampaignTaskSummaryLayout } from '../../publisher-dashboard__new-task/styles/CampaignStyles'
// components
import useRedirectWithProps from '../../../hooks/useRedirectWithProps'
// constants
import { PUBLISHER_WIZARD_ROUTE } from '../../../constants/config/routes-config'

export const PublisherDashboardNextCampaign = () => {
  return (
    <StyledPublisherCampaignTaskSummaryLayout style={{ marginBottom: '20px' }}>
      <div className='nextCampaignLogo' />
      <div style={{ marginLeft: '34px' }}>
        <h2>My next campaign</h2>
        <p>Description of the campaign</p>
        <div>
          {useRedirectWithProps(
            `${PUBLISHER_WIZARD_ROUTE}`,
            'blue',
            'My Next Campaign'
          )}
        </div>
      </div>
    </StyledPublisherCampaignTaskSummaryLayout>
  )
}
