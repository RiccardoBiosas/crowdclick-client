import styled, { keyframes, css } from "styled-components";

export const QuestionLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: ${(props) =>
      props.animation === "fadeIn"
        ? css`
            ${fadeIn} 1s ease-in;
          `
        : css`
            ${fadeOut} 1s ease-out forwards;
          `}
    .questionTitle {
    text-align: center;
  }
`;

export const ListLayout = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ItemLayout = styled.li`
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

  input[type="radio"] {
    position: absolute;
    visibility: hidden;
  }

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
    content: "";
    height: 12px;
    width: 12px;
    border-radius: 100%;
    top: 2px;
    left: 2px;

    transition: background 0.2s linear;
  }

  input[type="radio"]:checked ~ label {
    color: #00e15d;
  }

  input[type="radio"]:checked ~ .check {
    border: 5px solid #00e15d;
  }

  input[type="radio"]:checked ~ .check:before {
    background: #00e15d;
  }
`;

const fadeIn = keyframes`
    0% {
      opacity: 0;
    }
 
    100% {
        opacity: 1;
        background-color: green;

    }
`;


const fadeOut = keyframes`
  0% {
      opacity: 1;

  }
  90% {
    opacity: 0;
    visibility: hidden; 

  }
 
  100% {
    visibility: hidden; 
    opacity: 0;  
    height: 0;
    width: 0;
  }

  
`;
