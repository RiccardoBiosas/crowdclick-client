// theirs
import React from 'react'
import { useHistory } from 'react-router-dom'
// styles
import { StyledUserTaskSummaryLayout } from '../styles'
import StyledGeneralButton from '../../../shared/styles/StyledGeneralButton'
import StyledGeneralParagraph from '../../../shared/styles/StyledGeneralParagraph'
import StyledGeneralRowWrapper from '../../../shared/styles/StyledGeneralRowWrapper'
// constants
import { USER_TASK_ROUTE_WITH_PARAM } from '../../../constants/config/routes-config'
// utils
import { parseIntegerStringToFloatString } from '../../../utils'

const TasksConsoleItem = ({
  id,
  title,
  description,
  rewardPerClick,
  ogImage,
  taskOwnerAddress
}) => {
  const history = useHistory()
  const isPlaceholderNeeded =
    RegExp('foo', 'g').test(ogImage) || RegExp('placeholder', 'g').test(ogImage)

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px'
      }}
    >
      <StyledUserTaskSummaryLayout
        ogBackground={isPlaceholderNeeded ? '' : ogImage}
      >
        <div className='campaignAvatar' />
        <div style={{ marginLeft: '34px' }}>
          <h2>{title}</h2>
          <p>{description}</p>
          <StyledGeneralRowWrapper rowWidth='60%' rowJustify='space-around'>
            <StyledGeneralButton
              buttonColor={'blue'}
              buttonMargin={'0px 20px 20px 0px'}
              buttonTextColor={'#FFFFFF'}
              buttonWidth={200}
              onClick={() =>
                history.push({
                  pathname: `${USER_TASK_ROUTE_WITH_PARAM}${id}`,
                  state: { taskOwnerAddress }
                })
              }
            >
              Start Task
            </StyledGeneralButton>
          <StyledGeneralParagraph
            paragraphColor='#00E15D'
            paragraphFontWeight='900'
            paragraphBreak='nowrap'
          >{`${parseIntegerStringToFloatString(rewardPerClick)} USD`}</StyledGeneralParagraph>
          </StyledGeneralRowWrapper>
        </div>

      </StyledUserTaskSummaryLayout>
    </div>
  )
}

export default TasksConsoleItem
