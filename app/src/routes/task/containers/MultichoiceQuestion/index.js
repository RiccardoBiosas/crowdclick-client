// theirs
import React, { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
// components
import MultichoiceQuestionQuiz from '../../screen/MultichoiceQuestionQuiz'
// styles
import StyledPulsatingDot from '../../styles/StyledPulsatingDot'
import StyledGeneralRowWrapper from '../../../../shared/styles/StyledGeneralRowWrapper'
import { StyledHeadingTwo } from '../../styles/StyledHeading'

const modalRoot = document.getElementById('portal-root')

const MultichoiceQuestion = ({
  question,
  options,
  selectedAnswer,
  setSelectedAnswer,
  questionIndx,
  currentIndx,
  setIndx,
  questionId
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
        openerHeight: btnRef.height
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
    quizProperties
  ])

  return (
    <>
      <StyledGeneralRowWrapper rowPosition='absolute'>
        <StyledHeadingTwo>{question}</StyledHeadingTwo>
      </StyledGeneralRowWrapper>
      <StyledPulsatingDot ref={ref}>
        <div />
        <button type='button' onClick={() => setOpenQuiz(true)} />
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
          />,
          modalRoot
        )}
    </>
  )
}

export default MultichoiceQuestion
