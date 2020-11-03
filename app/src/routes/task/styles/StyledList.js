import styled from 'styled-components'

export const StyledListLayout = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const StyledItemLayout = styled.li`
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #e2e5ed;
  border-radius: 4px;
  width: 80%;
  height: 50px;
  cursor: pointer;
  font-size: 18px;
  color: #3e3f42;
  display: block;
  position: relative;
  float: left;
  margin-bottom: 0.4rem;

  label {
    display: block;
    position: relative;
    padding: 10px 0px 0 80px;
    margin: 4px auto;
    cursor: pointer;
    z-index: 20;
  }

  &:hover label {
    color: blue;
  }

  .check {
    display: block;
    position: absolute;
    border-radius: 50%;
    height: 16px;
    width: 16px;
    border: 4px solid #206dff;
    top: 14px;
    left: 20px;
    z-index: 5;
    transition: border 1s linear;
  }

  &:hover .check {
    border: 4px solid #00e15d;
  }

  .check:before {
    display: block;
    position: relative;
    content: '';
    height: 12px;
    width: 12px;
    border-radius: 100%;
    top: 2px;
    left: 2px;

    transition: background 0.2s linear;
  }

  input[type='radio'] {
    position: absolute;
    visibility: hidden;
  }

  input[type='radio']:checked ~ label {
    color: #00e15d;
  }

  input[type='radio']:checked ~ .check {
    border: 5px solid #00e15d;
  }

  input[type='radio']:checked ~ .check:before {
    background: #00e15d;
  }
`
