// theirs
import React from 'react'
import { useTransition, animated } from 'react-spring'
// styles
import StyledCardNavbar from '../../../shared/styles/StyledCardNavbar'
import { StyledListLayout, StyledItemLayout } from '../styles/StyledList'
import { StyledGeneralHeadingTwo } from '../../../shared/styles/StyledGeneralHeadings'

const MultichoiceQuestionQuiz = ({
  options,
  setSelectedAnswer,
  selectedAnswer,
  question,
  questionId,
  quizProperties,
  openQuiz,
  setOpenQuiz
  // currentIndx,
  // questionIndx
}) => {
  const { coordX, coordY, openerWidth, openerHeight } = quizProperties
  const modalCoordX = coordX - openerWidth
  const modalCoordY = coordY - openerHeight

  const transition = useTransition(openQuiz, null, {
    from: {
      transform: 'scale(0)',
      right: `${modalCoordX}px`,
      top: `${modalCoordY}px`,
      position: 'absolute',
      width: openerWidth,
      height: openerHeight
    },
    enter: {
      transform: 'scale(1.1)',
      zIndex: '200000',
      top: `${Math.floor(window.innerHeight / 2) - 200}px`,
      right: `${Math.floor(window.innerWidth / 2) - 380}px`
    },
    leave: {
      transform: 'scale(0)',
      right: `${modalCoordX}px`,
      top: `${modalCoordY}px`
    },
    config: {
      duration: 400
    }
  })

  return transition.map(
    ({ item, key, props }) =>
      item && (
        <animated.div
          key={`quiz${questionId}${key}`}
          style={{
            ...props,
            width: '580px',
            height: '340px',
            borderRadius: '8px',
            backgroundColor: 'white'
          }}
        >
          <StyledCardNavbar>
            <div />
            <div className='closeCard' onClick={() => setOpenQuiz(false)}>
              x
            </div>
          </StyledCardNavbar>
          <StyledGeneralHeadingTwo headingFontSize='24px'>
            {question}
          </StyledGeneralHeadingTwo>
          <StyledListLayout>
            {options.map((x, i) => (
              <StyledItemLayout key={`options${x.title}${i}`}>
                <input
                  type='radio'
                  name='radioFeedbackGroup'
                  checked={selectedAnswer[questionId] === x.id}
                  id={x.id}
                  value={x.id}
                  onChange={() =>
                    setSelectedAnswer({
                      ...selectedAnswer,
                      [questionId]: x.id
                    })
                  }
                />
                <label htmlFor={x.id}>{x.title}</label>
                <div className='check' />
              </StyledItemLayout>
            ))}
          </StyledListLayout>
        </animated.div>
      )
  )
}

export default MultichoiceQuestionQuiz
