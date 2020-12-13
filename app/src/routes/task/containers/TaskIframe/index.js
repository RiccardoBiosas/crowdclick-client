// theirs
import React, { useReducer, useEffect, useLayoutEffect, useState } from 'react'
import { useSpring, animated } from 'react-spring'
import { useDispatch } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
// components
import DataFetcher from '../../../../shared/components/DataFetcher'
import LoadingIcon from '../../../../shared/components/loadingIcons/LoadingIcon'
import { FeedbackModal } from '../FeedbackModal'
// styled
import StyledTaskIframeLayout from '../../styles/StyledTaskIframeLayout'
import StyledIframeProgressBar from '../../styles/StyledIframeProgressBar'
// utils
import { isWhatPercentage } from '../../../../utils'
import crowdclickClient from '../../../../services/api/crowdclickService'
// constants
import {
  iframeFullScreenAction,
  iframeNormalScreenAction
} from '../../../../redux/Iframe/IframeActions'
import taskState from '../../constants.js'
import TaskInterruptionWarning from '../../screen/TaskInterruptionWarning'

const {
  IS_LOADING_COMPLETED_ACTION,
  CURRENT_SECOND_ACTION,
  TASK_INTERRUPTIONS_ACTION,
  IS_TASK_STOPPED_TRUE_ACTION,
  IS_TASK_STOPPED_FALSE_ACTION,
  WAS_TASK_SUCCESSFUL_FALSE_ACTION,
  WAS_TASK_SUCCESSFUL_TRUE_ACTION,
  initialState
} = taskState

const IFrameStyle = {
  width: '100%',
  height: '100%'
}

const reducer = (state, action) => {
  switch (action.type) {
    case IS_LOADING_COMPLETED_ACTION:
      return { ...state, isLoading: false }
    case CURRENT_SECOND_ACTION:
      return { ...state, currentSecond: action.payload }
    case TASK_INTERRUPTIONS_ACTION:
      return { ...state, taskInterruptions: state.taskInterruptions + 1 }
    case IS_TASK_STOPPED_TRUE_ACTION:
      return { ...state, isTaskStopped: true }
    case IS_TASK_STOPPED_FALSE_ACTION:
      return { ...state, isTaskStopped: false }
    case WAS_TASK_SUCCESSFUL_FALSE_ACTION:
      return { ...state, wasTaskSuccessful: false }
    case WAS_TASK_SUCCESSFUL_TRUE_ACTION:
      return { ...state, wasTaskSuccessful: true }
    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }
}

const TaskIframeContainer = () => {
  const time = 4
  const maximumInterruptions = 3
  const location = useLocation()
  const { id } = useParams()
  const reduxDispatch = useDispatch()
  const [state, dispatch] = useReducer(reducer, initialState)
  const [onIframeLoadCount, setOnIframeLoadCount] = useState(0)
  // const [interruptionsCount, setInterruptionsCount] = useState(0)
  const {
    isLoading,
    currentSecond,
    taskInterruptions,
    isTaskStopped,
    wasTaskSuccessful
  } = state
  const taskOwnerAddress = location.state
    ? location.state.taskOwnerAddress
    : null

  const fade = useSpring({
    opacity: !isLoading ? 1 : 0,
    config: {
      duration: 800
    }
  })

  useLayoutEffect(() => {
    reduxDispatch(iframeFullScreenAction())
  }, [reduxDispatch])

  useEffect(() => {
    if (!isLoading) {
      let intervalId
      let elapsedTime = currentSecond

      intervalId = setInterval(() => {
        if (!document.hidden && !isTaskStopped && wasTaskSuccessful === null) {
          if (elapsedTime < time) {
            elapsedTime++
          } else {
            dispatch({ type: WAS_TASK_SUCCESSFUL_TRUE_ACTION })
            clearInterval(intervalId)
          }
        }
      }, 1000)

      const handleVisibility = () => {
        if (document.hidden) {
          clearInterval(intervalId)
          if (taskInterruptions < maximumInterruptions) {
            dispatch({ type: IS_TASK_STOPPED_TRUE_ACTION })
            dispatch({ type: CURRENT_SECOND_ACTION, payload: elapsedTime })
            dispatch({ type: TASK_INTERRUPTIONS_ACTION })
          } else {
            dispatch({ type: WAS_TASK_SUCCESSFUL_FALSE_ACTION })
            reduxDispatch(iframeNormalScreenAction)
            clearInterval(intervalId)
          }
        }
      }

      if (wasTaskSuccessful === null) {
        window.addEventListener('visibilitychange', handleVisibility)
      }

      return () => {
        window.removeEventListener('visibilitychange', handleVisibility)
        clearInterval(intervalId)
      }
    }
  }, [
    isLoading,
    currentSecond,
    taskInterruptions,
    isTaskStopped,
    wasTaskSuccessful,
    dispatch,
    reduxDispatch
  ])

  const resumeTask = () => {
    dispatch({ type: IS_TASK_STOPPED_FALSE_ACTION })
  }

  return (
    <DataFetcher action={() => crowdclickClient.getTask(id)}>
      {data => {
        const taskID = data.id
        const URL = data.website_link
        const question = data.questions.length > 0 && data.questions.title

        const options = data.questions.length > 0 && data.questions[0].options
        const questionOptionsObj = [{ question, options }]
        const taskQuestions = data.questions
        return (
          <>
            {!isLoading && (
              <StyledIframeProgressBar
                currentSecondPercentage={Math.floor(
                  isWhatPercentage(currentSecond - 1, time)
                )}
                remainingSeconds={time - currentSecond}
                taskFrozen={isTaskStopped}
              >
                <div className='filledInProgressBar' />
              </StyledIframeProgressBar>
            )}
            <StyledTaskIframeLayout slide={wasTaskSuccessful}>
              {isLoading && <LoadingIcon />}

              <animated.iframe
                src={URL}
                is='x-frame-bypass'
                style={{
                  ...IFrameStyle,
                  display: isLoading ? 'none' : 'block',
                  ...fade
                }}
                onLoad={() => {
                  if (onIframeLoadCount < 1) {
                    setOnIframeLoadCount(onIframeLoadCount + 1)
                  } else {
                    dispatch({ type: IS_LOADING_COMPLETED_ACTION })
                  }
                }}
                frameBorder='0'
              />
            </StyledTaskIframeLayout>

            {isTaskStopped && (
              <TaskInterruptionWarning
                taskInterruptions={taskInterruptions}
                maximumInterruptions={maximumInterruptions}
                currentSecond={currentSecond}
                time={time}
                resumeTask={resumeTask}
              />
            )}
            {questionOptionsObj && (
              <FeedbackModal
                slide={wasTaskSuccessful}
                taskQuestions={taskQuestions}
                url={URL}
                taskID={taskID}
                taskOwnerAddress={taskOwnerAddress}
              />
            )}
          </>
        )
      }}
    </DataFetcher>
  )
}

export default TaskIframeContainer
