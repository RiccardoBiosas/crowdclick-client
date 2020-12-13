// theirs
import React from 'react'
// components
import { PublisherDashboardCampaignTaskItem } from '../screen/PublisherDashboardCampaignTask'
import { PublisherDashboardNextCampaign } from '../screen/PublisherDashboardNextCampaign'
import DataFetcher from '../../../shared/components/DataFetcher'
// styles
import StyledGeneralCardLayout from '../../../shared/styles/StyledGeneralCardLayout'
// utils
import crowdclickClient from '../../../services/api/crowdclickService'

const PublisherDashboardContainer = ({ currentNetwork }) => (
  <StyledGeneralCardLayout style={{ marginTop: '80px' }}>
    <PublisherDashboardNextCampaign />
    <DataFetcher action={() => crowdclickClient.getUserTasks(currentNetwork)}>
      {data => {
        return data.map((campaignItem, indx) => (
          <PublisherDashboardCampaignTaskItem
            key={`campaignTask${indx}`}
            taskID={campaignItem.id}
            title={campaignItem.title}
            campaignDescription={campaignItem.description}
            ogImage={campaignItem.og_image_link}
            campaignUrl={campaignItem.website_link}
          />
        ))
      }}
    </DataFetcher>
  </StyledGeneralCardLayout>
)

export default PublisherDashboardContainer
