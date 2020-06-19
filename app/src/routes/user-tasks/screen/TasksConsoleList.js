import React, { useState, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import { PublisherCampaignTaskSummaryContainer as UserTaskSummaryContainer } from  '../../publisher-dashboard__new-task/styles/CampaignStyles'
import { GlobalButton } from '../../../shared/GlobalButton'

export const TasksConsoleList = ({ id, title, description, og_image, task_owner_address }) => {
  const history = useHistory()

  const isPlaceholderNeeded = RegExp("foo", "g").test(og_image) || RegExp("placeholder", "g").test(og_image)



  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: "20px" }}>
      <UserTaskSummaryContainer og_background={!isPlaceholderNeeded ? og_image : ""}>
        <div className='campaignAvatar' />
        {/* <div>
          <img src={og_image} />
        </div> */}
        <div style={{ marginLeft: '34px' }}>
          <h2>{title}</h2>
          <p>{description}</p>
          <div style={{ display: 'flex', width: '60%' }}>
            <GlobalButton
            buttonColor={'blue'}
            buttonMargin={'0px 20px 20px 0px'}
            buttonTextColor={'#FFFFFF'}
            buttonWidth={200}
            onClick={() => history.push({pathname: `/task/${id}`, state: {task_owner_address}})}
          >
            Start Task
          </GlobalButton>
            {/* {useRedirectWithProps(`/task/${id}`, 'blue', 'Start Task')} */}
          </div>
        </div>
      </UserTaskSummaryContainer>
    </div>
  )
}
