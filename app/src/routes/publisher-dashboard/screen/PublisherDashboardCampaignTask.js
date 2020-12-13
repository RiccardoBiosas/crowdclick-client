// theirs
import React, { useState } from 'react'
import { animated, useTransition } from 'react-spring'
import { useHistory } from 'react-router-dom'
// styles
import {
  StyledPublisherCampaignTaskSummaryLayout,
  StyledPublisherCampaignGeneralTaskLayout
} from '../../publisher-dashboard__new-task/styles/CampaignStyles'
import StyledGeneralButton from '../../../shared/styles/StyledGeneralButton'
// constants
import {
  PUBLISHER_WITHDRAW_ROUTE,
  PUBLISHER_WIZARD_EDIT_ROUTE_WITH_PARAM
} from '../../../constants/config/routes-config'
import PublisherDashboardCollection from './PublisherDashboardCollection'
// assets
import { IoCloseCircleOutline } from 'react-icons/io5'

export const PublisherDashboardCampaignTaskItem = ({
  taskID,
  title,
  campaignDescription,
  ogImage,
  campaignUrl
}) => {
  const history = useHistory()
  const [campaignState, setCampaignState] = useState(false)

  const isPlaceholderNeeded =
    RegExp('foo', 'g').test(ogImage) ||
    RegExp('placeholder', 'g').test(ogImage)

  const transitions = useTransition(campaignState, null, {
    from: { opacity: 0, transform: 'translateY(-20%)' },
    enter: { opacity: 1, transform: 'translateY(0%)' },
    leave: { opacity: 0, transform: 'translateY(-20%)' },
    config: {
      duration: 400
    }
  })

  return (
    <StyledPublisherCampaignGeneralTaskLayout>
      <StyledPublisherCampaignTaskSummaryLayout
        ogBackground={isPlaceholderNeeded ? '' : ogImage}
        campaignToggle={campaignState}
      >
        <div className='campaignAvatar' />
        <div style={{ marginLeft: '34px' }}>
          <h2>{title}</h2>
          <p>{campaignDescription}</p>
          <div>
            <StyledGeneralButton
              buttonColor={'blue'}
              buttonMargin={'0px 20px 20px 0px'}
              buttonTextColor={'#FFFFFF'}
              buttonWidth={200}
              onClick={() =>
                history.push(
                  `${PUBLISHER_WIZARD_EDIT_ROUTE_WITH_PARAM}${taskID}`
                )
              }
            >
              Edit Campaign
            </StyledGeneralButton>
            <StyledGeneralButton
              buttonColor={'transparent'}
              buttonMargin={'0px 0px 20px 0px'}
              buttonTextColor={'#206DFF'}
              buttonWidth={200}
              onClick={() => setCampaignState(!campaignState)}
            >
              {!campaignState && 'Show results'}
              {campaignState && 'Hide results'}
            </StyledGeneralButton>
          </div>
        </div>
        <div>
          <IoCloseCircleOutline
            role='button'
            style={{ width: '30px', height: '40px', cursor: 'pointer' }}
            onClick={() => history.push({
              pathname: PUBLISHER_WITHDRAW_ROUTE,
              state: {
                campaignUrl
              }

            })}
          />
        </div>
      </StyledPublisherCampaignTaskSummaryLayout>

      {transitions.map(({ item, key, props }) => {
        return (
          item && (
            <animated.div
              style={{ ...props }}
              className='taskAnalyticsContainer'
              key={key}
            >
              <PublisherDashboardCollection taskID={taskID} />
            </animated.div>
          )
        )
      })}
    </StyledPublisherCampaignGeneralTaskLayout>
  )
}
