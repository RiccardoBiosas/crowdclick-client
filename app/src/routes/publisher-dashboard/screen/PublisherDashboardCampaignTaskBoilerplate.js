import React from 'react'
import { PublisherCampaignMainLayout } from '../../publisher-dashboard__new-task/styles/CampaignStyles'
import {
  PublisherDashboardCampaignTask,
} from './PublisherDashboardCampaignTask'
import { PublisherDashboardNextCampaign } from './PublisherDashboardNextCampaign'


export const PublisherDashboardCampaignTaskBoilerplate = () => {
  return (
    <PublisherCampaignMainLayout style={{ marginTop: '20px' }}>
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
    </PublisherCampaignMainLayout>
  )
}
