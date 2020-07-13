import React from 'react'
import StyledCardNavbar from '../../../shared/styles/StyledCardNavbar'
import { useTransition, animated } from 'react-spring'
import {StyledListLayout, StyledItemLayout} from '../styles/StyledList'
import { StyledGeneralHeadingTwo } from '../../../shared/styles/StyledGeneralHeadings'

const MultichoiceQuestionQuiz = ({
  options,
  setSelectedAnswer,
  selectedAnswer,
  question,
  questionId,
  quizProperties,
  openQuiz,
  setOpenQuiz,
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
      height: openerHeight,
    },
    enter: {
      transform: 'scale(1.1)',
      zIndex: '200000',
      top: `${Math.floor(window.innerHeight / 2) - 300}px`,
      right: `${Math.floor(window.innerWidth / 2) - 400}px`,
    },
    leave: {
      transform: 'scale(0)',
      right: `${modalCoordX}px`,
      top: `${modalCoordY}px`,
    },
    config: {
      duration: 400,
    },
  })

  return (
    <>
      {transition.map(({ item, key, props }) => {
        return (
          <>
            {item && (
              <animated.div
                style={{
                  ...props,
                  width: '400px',
                  height: '300px',
                  backgroundColor: 'white',
                }}
              >
                <StyledCardNavbar>
                  {/* <div className="stepBack">back</div> */}
                  <div />
                  <div className="closeCard" onClick={() => setOpenQuiz(false)}>
                    x
                  </div>
                </StyledCardNavbar>

                <StyledGeneralHeadingTwo headingFontSize="24px">
                  {question}
                </StyledGeneralHeadingTwo>
                {/* <StyledQuestionLayout animation={currentIndx === questionIndx && !selectedAnswer[questionId] ? "fadeIn" : "fadeOut"}>{question}</StyledQuestionLayout> */}

                <StyledListLayout>
                  {options.map((x) => (
                    <StyledItemLayout>
                      <input
                        type="radio"
                        name="radioFeedbackGroup"
                        checked={selectedAnswer[questionId] === x.id}
                        id={x.id}
                        value={x.id}
                        onChange={() =>
                          setSelectedAnswer({
                            ...selectedAnswer,
                            [questionId]: x.id,
                          })
                        }
                      />

                      <label htmlFor={x.id}>{x.title}</label>

                      <div className="check" />
                    </StyledItemLayout>
                  ))}
                </StyledListLayout>
              </animated.div>
            )}
          </>
        )
      })}
    </>
  )
}

export default MultichoiceQuestionQuiz
