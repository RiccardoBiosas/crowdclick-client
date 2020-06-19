import styled from 'styled-components'

export const TaskCompletionLayout = styled.div`
  position: absolute;
  top: calc(50vh - 80px);
  left: calc(50vw - 300px);
  z-index: 999999999999999999999;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 21px;
  width: 600px;
  height: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .buttonContainer {
    margin-top: 20px;
  }
`
