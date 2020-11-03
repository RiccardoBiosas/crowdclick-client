// theirs
import React from 'react'
// components
import { PublisherDashboardCampaignTask } from './PublisherDashboardCampaignTask'
import { PublisherDashboardNextCampaign } from './PublisherDashboardNextCampaign'
// styles
import StyledGeneralCardLayout from '../../../shared/styles/StyledGeneralCardLayout'

export const PublisherDashboardCampaignTaskBoilerplate = () => {
  return (
    <StyledGeneralCardLayout style={{ marginTop: '20px' }}>
      <PublisherDashboardNextCampaign />

      <PublisherDashboardCampaignTask
        campaignID={'My first campaign (boilerplate)'}
        campaignDescription={
          'This is a boilerplate of how your future campaigns will look like'
        }
        weeklyViews={'231'}
        surveyData={{
          'answer A': 20,
          'answer B': 14,
          'answer C': 26,
          'answer D': 40,
          'answer E': 120,
          'answer F': 11
        }}
      />
    </StyledGeneralCardLayout>
  )
}
