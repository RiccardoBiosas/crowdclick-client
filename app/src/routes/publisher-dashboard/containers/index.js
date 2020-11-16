// theirs
import React from 'react'
// components
import { PublisherDashboardCampaignTaskItem } from '../screen/PublisherDashboardCampaignTask'
import { PublisherDashboardNextCampaign } from '../screen/PublisherDashboardNextCampaign'
import DataFetcher from '../../../shared/components/DataFetcher'
// styles
import StyledGeneralCardLayout from '../../../shared/styles/StyledGeneralCardLayout'
// utils
import crowdclickClient from '../../../utils/api/crowdclick'

const PublisherDashboardContainer = () => {
  return (
    <StyledGeneralCardLayout style={{ marginTop: '80px' }}>
      <PublisherDashboardNextCampaign />
      <DataFetcher action={crowdclickClient.getUserTasks}>
        {data => {
          return data.map((x, i) => (
            <PublisherDashboardCampaignTaskItem
              key={`campaignTask${i}`}
              taskID={x.id}
              title={x.title}
              campaignDescription={x.description}
              og_image={x.og_image_link}
              dashboardData={''}
            />
          ))
        }}
      </DataFetcher>
    </StyledGeneralCardLayout>
  )
}

export default PublisherDashboardContainer
