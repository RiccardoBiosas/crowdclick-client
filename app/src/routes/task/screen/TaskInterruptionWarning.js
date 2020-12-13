// theirs
import React from 'react'
import { useHistory } from 'react-router-dom'
// styles
import StyledResumeTaskLayout from '../styles/StyledResumeTaskLayout'
import StyledGeneralCardWrapper from '../../../shared/styles/StyledGeneralCardWrapper'
import StyledGlobalButton from '../../../shared/styles/StyledGeneralButton'
import StyledGeneralParagraph from '../../../shared/styles/StyledGeneralParagraph'
import { StyledGeneralHeadingOne } from '../../../shared/styles/StyledGeneralHeadings'
// assets
import { kittenWarning, somethingWentWrongIcon } from '../../../assets'
import { USER_TASKS_LIST_ROUTE } from '../../../constants/config/routes-config'

const TaskInterruptionWarning = ({
  taskInterruptions,
  maximumInterruptions,
  currentSecond,
  time,
  resumeTask
}) => {
  const history = useHistory()
  if (taskInterruptions < maximumInterruptions) {
    return (
      <StyledResumeTaskLayout>
        <StyledGeneralCardWrapper>
          <img
            alt='interruption-warning'
            style={{ marginTop: '1rem', width: '14rem' }}
            src={kittenWarning}
          />
          <StyledGeneralHeadingOne>
            {`${taskInterruptions} / 3 Interruptions`}
          </StyledGeneralHeadingOne>
          <StyledGeneralParagraph
            paragraphLineHeight='32px'
            paragraphFontSize='18px'
            paragraphColor='#636262'
          >
            If you interrupt the task more than 3 times you will <br /> not be
            eligible for the reward!
          </StyledGeneralParagraph>
          <StyledGeneralParagraph
            paragraphFontSize='14px'
            paragraphColor='#636262'
          >
            {`You have ${currentSecond} seconds remaining .....`}
          </StyledGeneralParagraph>

          <StyledGlobalButton
            buttonWidth='148'
            buttonHeight='48px'
            buttonMargin='30px 0 0 0'
            buttonColor={'green'}
            buttonTextColor={'#FFFFFF'}
            onClick={resumeTask}
          >
            resume
          </StyledGlobalButton>
        </StyledGeneralCardWrapper>
      </StyledResumeTaskLayout>
    )
  }
  return (
    <StyledResumeTaskLayout>
      <StyledGeneralCardWrapper>
        <img
          alt='interruption-warning'
          style={{ marginTop: '1rem', width: '14rem' }}
          src={somethingWentWrongIcon}
        />
        <StyledGeneralHeadingOne>
          {`${taskInterruptions} / 3 Interruptions`}
        </StyledGeneralHeadingOne>
        <StyledGeneralParagraph
          paragraphLineHeight='32px'
          paragraphFontSize='19px'
          paragraphColor='#636262'
        >
          Task failed! <br />
          You interrupted the task too many times! <br />
        </StyledGeneralParagraph>
        <StyledGeneralParagraph
          paragraphFontSize='17px'
          paragraphColor='#636262'
        >
          Try again, your feedback is important!
        </StyledGeneralParagraph>

        <StyledGlobalButton
          buttonWidth='148'
          buttonHeight='8rem'
          buttonMargin='30px 0 0 0'
          buttonColor={'blue'}
          buttonTextColor={'#FFFFFF'}
          onClick={() => history.push(USER_TASKS_LIST_ROUTE)}
        >
          New task
        </StyledGlobalButton>
      </StyledGeneralCardWrapper>
    </StyledResumeTaskLayout>
  )
}

export default TaskInterruptionWarning
