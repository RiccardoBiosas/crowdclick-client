import React, { useEffect } from 'react'
import { StyledItemLayout } from '../styles/MultichoiceItemStyles'
import {
  StyledListLayout,
  StyledQuestionLayout,
} from '../styles/MultichoiceItemStyles'
import StyledPulsatingDot from '../styles/StyledPulsatingDot'

export const MultichoiceQuestion = ({
  question,
  options,
  selectedAnswer,
  setSelectedAnswer,
  questionIndx,
  currentIndx,
  setIndx,
  questionId,
}) => {
  useEffect(() => {
    if (currentIndx === questionIndx) {
      if (selectedAnswer[questionId]) {
        setIndx(currentIndx + 1)
      }
    }
  }, [selectedAnswer, setIndx, currentIndx, questionIndx, questionId])

  return (
    // <StyledQuestionLayout animation={currentIndx === questionIndx && !selectedAnswer[questionId] ? "fadeIn" : "fadeOut"}>
    <div>
      <StyledPulsatingDot>
        <div />
        <button />
      </StyledPulsatingDot>
      {/* <h2 className="questionTitle">{question}</h2>

      <StyledListLayout>
        {options.map((x) => (
          <StyledItemLayout>
            <input
              type="radio"
              name="radioFeedbackGroup"
              checked={selectedAnswer[questionId] === x.id}
              id={x.id}
              value={x.id}
              onChange={() => setSelectedAnswer({...selectedAnswer, [questionId]: x.id})}

            />

            <label htmlFor={x.id}>{x.title}</label>

            <div className="check" />
          </StyledItemLayout>
        ))}
      </StyledListLayout> */}
    </div>

    // </StyledQuestionLayout>
  )
}
