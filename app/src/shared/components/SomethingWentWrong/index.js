// theirs
import React from 'react'
// styles
import StyledGeneralCardWrapper from '../../styles/StyledGeneralCardWrapper'
import StyledGeneralCardLayout from '../../styles/StyledGeneralCardLayout'
import StyledGeneralParagraph from '../../styles/StyledGeneralParagraph'
import { StyledGeneralHeadingOne } from '../../styles/StyledGeneralHeadings'
// assets
import { somethingWentWrongIcon } from '../../../assets'

const SomethingWentWrong = () => {
  return (
    <StyledGeneralCardLayout>
      <StyledGeneralCardWrapper>
        <div>
          <img alt='something-went-wrong-icon' src={somethingWentWrongIcon} />
        </div>
        <StyledGeneralHeadingOne>
          Uh oh... Something went wrong
        </StyledGeneralHeadingOne>
        <StyledGeneralParagraph>
          Don’t worry... we are fixing the problem <br />
          In the meantime, try refreshing or try again later
        </StyledGeneralParagraph>
      </StyledGeneralCardWrapper>
    </StyledGeneralCardLayout>
  )
}

export default SomethingWentWrong
