import React, { useEffect, useState, useRef } from 'react'
import {createPortal} from 'react-dom'
import StyledPulsatingDot from '../styles/StyledPulsatingDot'
import QuizCollection from './QuizCollection'

const modalRoot = document.getElementById('portal-root')


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
  const [quizProperties, setQuizProperties] = useState()
  const [openQuiz, setOpenQuiz] = useState(false)
  const ref = useRef()
  useEffect(() => {
    if (ref && !quizProperties) {
      const btnRef = ref.current.getBoundingClientRect()
      console.log(btnRef)
      setQuizProperties({
        ...quizProperties,
        coordX: btnRef.right,
        coordY: btnRef.top,
        openerWidth: btnRef.width,
        openerHeight: btnRef.height
      })
    }
    if (currentIndx === questionIndx) {
      if (selectedAnswer[questionId]) {
        setIndx(currentIndx + 1)
      }
    }
  }, [selectedAnswer, setIndx, currentIndx, questionIndx, questionId, quizProperties])

  return (
    <div style={{position: "static"}}>
      <StyledPulsatingDot ref={ref}>
        <div />
        <button type='button' onClick={() => setOpenQuiz(true)} />
      </StyledPulsatingDot>

      {quizProperties && createPortal(
        <QuizCollection
          options={options}
          question={question}
          questionId={questionId}
          setSelectedAnswer={setSelectedAnswer}
          selectedAnswer={selectedAnswer}
          quizProperties={quizProperties}
          openQuiz={openQuiz}
          setOpenQuiz={setOpenQuiz}
          currentIndx={currentIndx}
          questionIndx={questionIndx}
        />, modalRoot
      )}


    </div>

  )
}
