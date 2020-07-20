import React from 'react'
import { TASK_ENDPOINT, DASHBOARD_ENDPOINT } from '../../../config/api-config'
import { Temporary__PublisherDashboardCampaignTask } from '../screen/PublisherDashboardCampaignTask'
import { PublisherDashboardNextCampaign } from '../screen/PublisherDashboardNextCampaign'
import { useFetch } from '../../../hooks/useFetch'
import LoadingIcon from '../../../shared/components/loadingIcons/LoadingIcon'
import { PublisherDashboardCampaignTaskBoilerplate } from '../screen/PublisherDashboardCampaignTaskBoilerplate'
import StyledGeneralCardLayout from '../../../shared/styles/StyledGeneralCardLayout'

export const PublisherDashboardContainer = () => {
  const {response, error} = useFetch(TASK_ENDPOINT)
  const dashboardRes = useFetch(DASHBOARD_ENDPOINT)
  const answersDashboardData = dashboardRes.response && dashboardRes.response.data.filter(x => x.user.username ===  JSON.parse(window.localStorage.getItem('userPubKey')))


  if ((!response && !error) || !answersDashboardData) {
    return <LoadingIcon />
  } else if(error) {
    return "there was an error"
  } else {
    const userCampaigns = response.data.results.filter(
      (x) =>
        x.user.username ===
        JSON.parse(window.localStorage.getItem('userPubKey')),
    )
   

    // console.log('filtered dashboard data')
    // console.log(answersDashboardData)

    if (userCampaigns.length === 0) {
      return <PublisherDashboardCampaignTaskBoilerplate />
    } else {
      return (
        <StyledGeneralCardLayout style={{ marginTop: '80px' }}>
          <PublisherDashboardNextCampaign />

          {userCampaigns.map((x, i) => (
            <Temporary__PublisherDashboardCampaignTask
              key={`campaignTask${i}`}
              campaignID={`Campaign ${i + 1}`}
              taskID={x.id}
              title={x.title}
              campaignDescription={x.description}
              og_image={x.og_image_link}
              dashboardData={answersDashboardData}
            />
          ))}
        </StyledGeneralCardLayout>
      )
    }
  }
}
