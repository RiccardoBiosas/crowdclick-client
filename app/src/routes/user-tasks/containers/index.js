// theirs
import React, { useState } from 'react'
// components
import DataFetcher from '../../../shared/components/DataFetcher'
import TasksConsoleItem from '../screen/TasksConsoleItem'
// styles
import StyledGeneralRowWrapper from '../../../shared/styles/StyledGeneralRowWrapper'
import StyledGlobalButton from '../../../shared/styles/StyledGeneralButton'
// utils
import crowdclickClient from '../../../services/api/crowdclickService'
// assets
import { noTasksAvailable } from '../../../assets'

const TasksConsoleDashboardContainer = ({ currentNetwork }) => {
  console.log('current network: ', currentNetwork)
  const [page, setPage] = useState(1)

  return (
    <div>
      <DataFetcher
        action={() => crowdclickClient.getTasks(page, currentNetwork)}
        fetcherDeps={page}
      >
        {data => {
          console.log('data: ', data)
          console.log('data: ', data.count)
          if (data.count === 0) {
            return (
              <StyledGeneralRowWrapper rowMargin='0 0 1.8rem 0'>
                <img src={noTasksAvailable} alt='no-tasks-available' />
              </StyledGeneralRowWrapper>
            )
          }
          return (
            <>
              <StyledGeneralRowWrapper rowMargin='0 0 1.8rem 0'>
                <StyledGeneralRowWrapper
                  rowWidth='60vw'
                  rowJustify='space-between'
                >
                  {data.previous ? (
                    <StyledGlobalButton
                      buttonWidth='190'
                      buttonMargin='0 0 0 10px'
                      buttonColor='blue'
                      buttonTextColor='#FFFFFF'
                      onClick={() => data && data.previous && setPage(page - 1)}
                    >
                      previous
                    </StyledGlobalButton>
                  ) : (
                    <div />
                  )}
                  {data.next ? (
                    <StyledGlobalButton
                      buttonWidth='190'
                      buttonMargin='0 0 0 10px'
                      buttonColor='blue'
                      buttonTextColor='#FFFFFF'
                      onClick={() => data && data.next && setPage(page + 1)}
                    >
                      next
                    </StyledGlobalButton>
                  ) : (
                    <div />
                  )}
                </StyledGeneralRowWrapper>
              </StyledGeneralRowWrapper>

              <div>
                {data.results.map((x, i) => (
                  <TasksConsoleItem
                    key={`UserTask${i}`}
                    id={x.id}
                    title={x.title}
                    description={x.description}
                    rewardPerClick={x.reward_per_click}
                    ogImage={x.og_image_link}
                    taskOwnerAddress={x.user.username}
                  />
                ))}
              </div>
            </>
          )
        }}
      </DataFetcher>
    </div>
  )
}

export default TasksConsoleDashboardContainer
