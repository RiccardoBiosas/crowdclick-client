import React from 'react'

//Assets
import ethereum from '../../assets/homepage/becomeUser/ethereum.svg'
import matic from '../../assets/homepage/becomeUser/matic.svg'
import crowdholding from '../../assets/homepage/becomeUser/crowdholding.svg'
import createProject from '../../assets/homepage/becomePublisher/createYourProject.svg'
import planYourBudget from '../../assets/homepage/becomePublisher/planYourBudget.svg'
import askAQuestion from '../../assets/homepage/becomePublisher/askAQuestion.svg'
import campaignCompleted from '../../assets/homepage/becomePublisher/campaignCompleted.svg'

export const becomeUserSteps = {
  item: 'user', //useful for the unique key
  data: [
    {
      src: ethereum,

      content: 'ethereum is here'
    },
    {
      src: matic,
      content: 'matic is here'
    },
    {
      src: crowdholding,
      content: 'crowdholding is here'
    }
  ]
}

export const becomePublisherSteps = {
  item: 'publisher', //useful for the unique key
  data: [
    {
      src: createProject,
      content: 'create project '
    },
    {
      src: planYourBudget,
      content: 'plan budget'
    },
    {
      src: askAQuestion,
      content: 'ask a budget '
    },
    {
      src: campaignCompleted,
      content: 'campaign completed'
    }
  ]
}
