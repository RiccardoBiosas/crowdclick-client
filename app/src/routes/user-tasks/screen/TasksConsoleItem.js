// theirs
import React from 'react'
import { useHistory } from 'react-router-dom'
// styles
import { StyledUserTaskSummaryLayout } from '../styles'
import StyledGeneralButton from '../../../shared/styles/StyledGeneralButton'
import StyledGeneralParagraph from '../../../shared/styles/StyledGeneralParagraph'
// constants
import { USER_TASK_ROUTE_WITH_PARAM } from '../../../config/routes-config'

const TasksConsoleItem = ({
  id,
  title,
  description,
  rewardPerClick,
  ogImage,
  taskOwnerAddress
}) => {
  const history = useHistory()
  console.log('task item, reward per click -> ', rewardPerClick)
  const isPlaceholderNeeded =
    RegExp('foo', 'g').test(ogImage) ||
    RegExp('placeholder', 'g').test(ogImage)

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px'
      }}
    >
      <StyledUserTaskSummaryLayout
        og_background={!isPlaceholderNeeded ? ogImage : ''}
      >
        <div className='campaignAvatar' />
        <div style={{ marginLeft: '34px' }}>
          <h2>{title}</h2>
          <p>{description}</p>
          <div style={{ display: 'flex', width: '60%' }}>
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
          </div>
        </div>
      <div style={{display: 'flex', alignItems: 'flex-end'}}>
            <StyledGeneralParagraph paragraphColor='#00E15D' paragraphFontWeight='900'>{`${(parseInt(rewardPerClick, 10)).toFixed(2).toString()} USD`}</StyledGeneralParagraph>
      </div>
      </StyledUserTaskSummaryLayout>
    </div>
  )
}

export default TasksConsoleItem
