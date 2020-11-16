// theirs
import React, { useState, useEffect } from 'react'
// components
import TasksConsoleItem from '../screen/TasksConsoleItem'
import LoadingIcon from '../../../shared/components/loadingIcons/LoadingIcon'
// styles
import StyledGeneralRowWrapper from '../../../shared/styles/StyledGeneralRowWrapper'
import StyledGlobalButton from '../../../shared/styles/StyledGeneralButton'
// utils
import crowdclickClient from '../../../utils/api/crowdclick'
import SomethingWentWrong from '../../../shared/components/SomethingWentWrong'
import config from '../../../config/env-config'

const TasksConsoleDashboardContainer = ({currentNetwork}) => {
  console.log('CURRENT NETWORK IN TASKSCONSOLEDASHBOARDCONTAINER : ', currentNetwork)
  const [page, setPage] = useState(1)
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const updatePageUp = () => {
    if (data && data.next) {
      setPage(page + 1)
    }
  }
  const updatePageDown = () => {
    if (data && data.previous) {
      setPage(page - 1)
    }
  }

  const fetchUrl = async page => {
    setLoading(true)
    try {
      const networkName = config.blockchain[currentNetwork].chainName      
      const response = await crowdclickClient.getTasks(page, networkName)
      setData(response.data)
      setLoading(false)
    } catch (err) {
      setError(true)
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchUrl(page)
  }, [page])

  if (error) {
    return <SomethingWentWrong />
  }
  if (loading && !data) {
    return <LoadingIcon />
  }
  return (
    <div>
      <StyledGeneralRowWrapper rowMargin='0 0 1.8rem 0'>
        <StyledGeneralRowWrapper rowWidth='60vw' rowJustify='space-between'>
          {data.previous ? (
            <StyledGlobalButton
              buttonWidth='190'
              buttonMargin='0 0 0 10px'
              buttonColor='blue'
              buttonTextColor='#FFFFFF'
              onClick={updatePageDown}
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
              onClick={updatePageUp}
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
            og_image={x.og_image_link}
            task_owner_address={x.user.username}
          />
        ))}
      </div>
    </div>
  )
}

export default TasksConsoleDashboardContainer
