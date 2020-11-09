import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { iframeNormalScreenAction } from '../../../../redux/Iframe/IframeActions'
import  StyledFeedbackModalLayout  from '../../styles/StyledFeedbackModalLayout'
import  MultichoiceQuestion  from '../MultichoiceQuestion/index'
import { TaskCompletionPopup } from '../../screen/TaskCompletionPopup'
import crowdclickClient from '../../../../utils/api/crowdclick'


export const FeedbackModal = ({
  slide,
  url,
  taskID,
  questionID,
  taskQuestions,
  taskOwnerAddress,
}) => {
  const dispatch = useDispatch()
  const [indx, setIndx] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(
    ...Object.keys(taskQuestions).map((x) => {
      return { [taskQuestions[x].id]: '' }
    }),
  )

  useEffect(() => {
    const postAnswers = async () => {
      const answersBatch = Object.keys(selectedAnswer).map((x) => {
        return {
          id: parseInt(x, 10),
          options: [
            {
              id: selectedAnswer[x],
            },
          ],
        }
      })

      await crowdclickClient.postAnswer(taskID, {questions: answersBatch})
      // await crowdclickClient.getReward(taskID)   
    }
    if (indx === taskQuestions.length) {
      dispatch(iframeNormalScreenAction)
      postAnswers()
    }
  }, [selectedAnswer, indx, taskID, taskQuestions, questionID, dispatch])

  if (indx === taskQuestions.length) {
    return <TaskCompletionPopup url={url} />
  }

  return (
    <>
      <StyledFeedbackModalLayout slide={slide}>
        {taskQuestions.map((x, i) => (
          <MultichoiceQuestion
            key={`question${x.title}${i}`}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            options={x.options}
            question={x.title}
            questionId={x.id}
            setIndx={setIndx}
            questionIndx={i}
            currentIndx={indx}
          />
        ))}
      </StyledFeedbackModalLayout>
    </>
  )
}
