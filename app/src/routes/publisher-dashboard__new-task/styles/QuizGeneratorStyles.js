import styled from 'styled-components'

export const MultiChoiceListParent = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;
`

export const MultiChoiceList = styled.div`
  height: 100px;
  width: 360px;
  overflow: auto;

  div {
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #e2e5ed;
    border-radius: 4px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      padding-left: 8px;
    }

    .trashIcon {
      padding-right: 20px;
      cursor: pointer;
    }
  }
`

export const QuestionSubmissionContainer = styled.div`
  .addButton {
    border: none;
    background-color: transparent;
    cursor: pointer;
    margin-left: 10px;
  }
`

