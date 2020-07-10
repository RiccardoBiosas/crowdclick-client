import React, { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import StyledPulsatingDot from '../../styles/StyledPulsatingDot'
import { StyledGeneralHeadingTwo } from '../../../../shared/styles/StyledGeneralHeadings'
import MultichoiceQuestionQuiz from '../../screen/MultichoiceQuestionQuiz'
import StyledGeneralRowWrapper from '../../../../shared/styles/StyledGeneralRowWrapper'

const modalRoot = document.getElementById('portal-root')

const MultichoiceQuestion = ({
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
      setQuizProperties({
        ...quizProperties,
        coordX: btnRef.right,
        coordY: btnRef.top,
        openerWidth: btnRef.width,
        openerHeight: btnRef.height,
      })
    }
    if (currentIndx === questionIndx) {
      if (selectedAnswer[questionId]) {
        setIndx(currentIndx + 1)
      }
    }
  }, [
    selectedAnswer,
    setIndx,
    currentIndx,
    questionIndx,
    questionId,
    quizProperties,
  ])

  return (
    <>
      <div>
        <h2 style={{position: "absolute", top: "16%", left: "40%"}}>{question}</h2>
      </div>
      <StyledPulsatingDot ref={ref}>
        <div />
        <button type="button" onClick={() => setOpenQuiz(true)} />
      </StyledPulsatingDot>

      {quizProperties &&
        createPortal(
          <MultichoiceQuestionQuiz
            options={options}
            question={question}
            questionId={questionId}
            setSelectedAnswer={setSelectedAnswer}
            selectedAnswer={selectedAnswer}
            quizProperties={quizProperties}
            openQuiz={openQuiz}
            setOpenQuiz={setOpenQuiz}
            // currentIndx={currentIndx}
            // questionIndx={questionIndx}
          />,
          modalRoot,
        )}
    </>
  )
}

export default MultichoiceQuestion
