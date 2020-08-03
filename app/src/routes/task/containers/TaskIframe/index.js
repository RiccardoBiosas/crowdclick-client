import React, { Fragment, useReducer, useEffect, useLayoutEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import { RingLoader } from 'react-spinners'
import { useDispatch } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import {
  iframeFullScreenAction,
  iframeNormalScreenAction
} from '../../../../redux/Iframe/IframeActions'
import { FeedbackModal } from '../FeedbackModal'
import StyledTaskIframeLayout  from '../../styles/StyledTaskIframeLayout'
import  StyledIframeProgressBar  from '../../styles/StyledIframeProgressBar'
import  StyledResumeTaskLayout  from '../../styles/StyledResumeTaskLayout'
import { TASK_ENDPOINT } from '../../../../config/api-config'
import { useFetch } from '../../../../hooks/useFetch'
import LoadingIcon  from '../../../../shared/components/loadingIcons/LoadingIcon'
import { isWhatPercentage } from '../../../../utils/isWhatPercentage'

const IFrameStyle = {
  width: '100%',
  height: '100%'
}

const initialState = {
  isLoading: true,
  currentSecond: 1,
  taskInterruptions: 0,
  isTaskStopped: false,
  wasTaskSuccessful: null
}

const IS_LOADING_COMPLETED_ACTION = 'LOADING_COMPLETED'
const CURRENT_SECOND_ACTION = 'CURRENT_SECOND'
const TASK_INTERRUPTIONS_ACTION = 'TASK_INTERRUPTIONS'
const IS_TASK_STOPPED_TRUE_ACTION = 'TASK_INTERRUPTED'
const IS_TASK_STOPPED_FALSE_ACTION = 'TASK_RESUMED'
const WAS_TASK_SUCCESSFUL_TRUE_ACTION = 'TASK_SUCCESSFUL'
const WAS_TASK_SUCCESSFUL_FALSE_ACTION = 'TASK_FAILED'

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
      throw new Error(`Unknown action type, ${action.type}`)
  }
}

const TaskIframe = ({ drizzle, drizzleState }) => {
  const time = 2
  const [state, dispatch] = useReducer(reducer, initialState)
  const reduxDispatch = useDispatch()
  const location = useLocation()
  const { id } = useParams()
  const taskOwnerAddress = location.state
    ? location.state.task_owner_address
    : null

  const {
    isLoading,
    currentSecond,
    taskInterruptions,
    isTaskStopped,
    wasTaskSuccessful
  } = state

  const fade = useSpring({
    opacity: !isLoading ? 1 : 0,
    // delay: 250,
    config: {
      duration: 800
    }
  })

  const res = useFetch(`${TASK_ENDPOINT}`, null)

  useLayoutEffect(() => {
    reduxDispatch(iframeFullScreenAction())
  }, [reduxDispatch])

  useEffect(() => {
    if (!isLoading) {
      let intervalId
      // let elapsedTime = seconds
      let elapsedTime = currentSecond

      // console.log("current elapsed time", elapsedTime)
      // console.log("current second ", currentSecond)
      intervalId = setInterval(() => {
        if (!document.hidden && !isTaskStopped && wasTaskSuccessful === null) {
          // console.log("elapsed time counter", elapsedTime)
          if (elapsedTime < time) {
            // console.log("IS THE TASK STOPPED?", isTaskStopped)
            elapsedTime++
          } else {
            dispatch({ type: WAS_TASK_SUCCESSFUL_TRUE_ACTION })
            // reduxDispatch(iframeNormalScreenAction)
            clearInterval(intervalId)
          }
        }
      }, 1000)

      const _func = () => {
        if (document.hidden) {
          clearInterval(intervalId)
          if (taskInterruptions < 3) {
            dispatch({ type: IS_TASK_STOPPED_TRUE_ACTION })
            dispatch({ type: CURRENT_SECOND_ACTION, payload: elapsedTime })
            // console.log("IS TASK STOPPED?", isTaskStopped)
            dispatch({ type: TASK_INTERRUPTIONS_ACTION })
          } else {
            dispatch({ type: WAS_TASK_SUCCESSFUL_FALSE_ACTION })
            reduxDispatch(iframeNormalScreenAction)
            clearInterval(intervalId)
          }
        }
      }

      const handleVisibility = () => {
        _func()
      }

      if (wasTaskSuccessful === null) {
        window.addEventListener('visibilitychange', handleVisibility)
      }

      return () => {
        window.removeEventListener('visibilitychange', handleVisibility)
      }
    }
  }, [isLoading, currentSecond, taskInterruptions, isTaskStopped, wasTaskSuccessful, dispatch, reduxDispatch])

  if (!res.response) {
    return <LoadingIcon />
  } else {
    const selected_task = res.response.data.results.filter(
      x => x.id === parseInt(id, 10)
    )
    console.log('selected task', selected_task)
    const taskID = selected_task[0].id ? selected_task[0].id : null
    // const questionID = selected_task[0].questions[0].id
    //   ? selected_task[0].questions[0].id
    //   : null
    const URL = selected_task[0].website_link
      ? selected_task[0].website_link
      : null
    const question = selected_task[0].questions[0].title
      ? selected_task[0].questions[0].title
      : null
    const options = selected_task[0].questions[0].options
      ? selected_task[0].questions[0].options
      : null
    const questionOptionsObj = [{ question, options }]


    const taskQuestions = selected_task[0].questions



    return (
      <Fragment>
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
          {isLoading && <RingLoader size={140} />}

          <animated.iframe
            src={URL}
            is='x-frame-bypass'
            style={{
              ...IFrameStyle,
              display: isLoading ? 'none' : 'block',
              ...fade
            }}
            onLoad={() => dispatch({ type: IS_LOADING_COMPLETED_ACTION })}
            frameBorder='0'
          />
        </StyledTaskIframeLayout>

        {isTaskStopped && (
          <StyledResumeTaskLayout>
            <h1>
              attempts: {taskInterruptions}, seconds: {currentSecond},
              taskStatus:{' '}
              {wasTaskSuccessful === false
                ? wasTaskSuccessful.toString()
                : 'still in progress'}
            </h1>

            <button
              onClick={() => dispatch({ type: IS_TASK_STOPPED_FALSE_ACTION })}
            >
              resume
            </button>
          </StyledResumeTaskLayout>
        )}
        {questionOptionsObj && (
          <FeedbackModal
            slide={wasTaskSuccessful}
            taskQuestions={taskQuestions}
            url={URL}
            taskID={taskID}            
            drizzle={drizzle}
            drizzleState={drizzleState}
            task_owner_address={taskOwnerAddress}
          />
        )}
      </Fragment>
    )
  }
}

export default TaskIframe