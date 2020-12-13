// theirs
import React from 'react'
import { useParams } from 'react-router-dom'
// components
import DataFetcher from '../../shared/components/DataFetcher'
import PublisherWizardFormCampaignContainer from '../publisher-dashboard__new-task/containers'
// utils
import crowdclickClient from '../../services/api/crowdclickService'

const EditPublisherWizardFormCampaignContainer = () => {
  const { id } = useParams()

  return (
    <DataFetcher action={() => crowdclickClient.getTask(id)}>
      {data => {
        const optionsList = data.questions[0].options.map(x => {
          return { option: x.title }
        })
        const initial_values = {
          projectName: data.title,
          projectDescription: data.description,
          projectURL: data.website_link,
          pricePerClick: data.reward_per_click,
          campaignBudget: data.spend_daily,
          projectQuestion: data.questions[0].title,
          projectOptions: optionsList
        }
        return (
          <PublisherWizardFormCampaignContainer
            initial_values={initial_values}
            edit={true}
            id={id}
          />
        )
      }}
    </DataFetcher>
  )
}

export default EditPublisherWizardFormCampaignContainer
