import styled from 'styled-components'
import { Field, FastField } from 'formik'

export const StyledWizardPreviewLayout = styled.div`
  width: 90%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  .valuesContainer {
    width: 100%;
    h4 {
      font-weight: 600;
      color: #9ea0a5;
    }

    p {
      max-width: 70%;
      word-break: break-all;
      color: #3e3f42;
    }
  }
`

export const StyledWizardInputForms = styled.div`
  .labelFieldContainer {
    margin-top: 16px;
    display: flex;
    flex-direction: column;

    label {
      font-weight: 600;
      color: #9ea0a5;
      display: block;
      margin: 8px 0;
      cursor: pointer;
    }

    .inputAndErrorContainer {
      position: relative;

      .errorMessage {
        position: absolute;
        top: 20%;
        margin-left: 10px;
        white-space: nowrap;
      }
    }
  }
`

export const StyledWizardInputQuizForms = styled(StyledWizardInputForms)`
  &&& {
    .projectOptionsLabel {
      margin-bottom: 6px;
    }
  }

  .quizOptionsContainer {
    height: 130px;
    width: 360px;
    overflow: auto;

    .fieldAndIconContainer {
      margin-bottom: 1px;
      background: #ffffff 0% 0% no-repeat padding-box;
      border: 1px solid #e2e5ed;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .trashIcon {
        cursor: pointer;
      }
    }
  }
  .addOptionButton {
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #e2e5ed;
    border-radius: 4px;
    height: 40px;
    width: 360px;
    display: flex;
    align-items: center;
    cursor: pointer;

    .addOptionButtonIcon {
      color: blue;
      margin-right: 14px;
    }
  }
`

export const StyledCustomInputField = styled(Field)`
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #e2e5ed;
  border-radius: 4px;
  width: 360px;
  height: 40px;
  padding-left: 8px;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::[type='number'] {
    -moz-appearance: textfield;
  }

  &::placeholder {
    color: #3e3f42;
    font-weight: 400;
  }
`

export const StyledCustomTextareaField = styled(Field)`
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #e2e5ed;
  border-radius: 4px;
  width: 360px;
  height: 60px;
  padding-top: 10px;
  padding-left: 8px;
  line-height: 1.6;
  resize: none;

  &::placeholder {
    color: #3e3f42;
    font-weight: 400;
  }
`

export const StyledCustomInputFastField = styled(FastField)`
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 4px;
  width: 360px;
  height: 40px;
  padding-left: 8px;

  &::placeholder {
    color: #3e3f42;
    font-weight: 400;
  }
`
