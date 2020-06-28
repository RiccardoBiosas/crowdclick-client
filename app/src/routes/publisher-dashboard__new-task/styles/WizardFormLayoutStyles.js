import styled from 'styled-components'

export const WizardFormParentLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    color: ${props => props.theme.publisherForm.mainHeading}
  }
`

export const WizardFormLayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 21px;
  width: 70vw;
  height: 580px;
  

  .btnBackContainer {
    align-self: flex-start;
  }
`

export const WizardFormNavbar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  .stepBack {
    padding-left: 20px;
    padding-top: 14px;
    text-decoration: underline;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }

  .closePublisherDashboard {
    padding-right: 20px;
    padding-top: 14px;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`

export const WizardFormButtonsLayout = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  p {
    color: #9ea0a5;
    font-size: 16px;
  }
`

export const WizardInputForms = styled.div`
  input {
    display: block;
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #e2e5ed;
    border-radius: 4px;
    width: 360px;
    height: 40px;
    padding-left: 8px;

    &::placeholder {
      color: #3e3f42;
      font-weight: 400;
    }
  }

  textarea {
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #e2e5ed;
    border-radius: 4px;
    width: 360px;
    height: 60px;
    padding-top: 10px;
    padding-left: 8px;
    line-height: 1.6;
    resize: none;
  }

  p {
    font-weight: 600;
    color: #9ea0a5;
  }
  label {
    font-weight: 600;
    color: #9ea0a5;
    display: block;
    margin: 0.6em 0;
    cursor: pointer;
  }

  .addQuestionOptionsButton {
    background: #FFFFFF 0% 0% no-repeat padding-box;
    border: 1px solid #E2E5ED;
    border-radius: 4px;
    height: 40px;
    width: 360px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`

