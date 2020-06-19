import styled from 'styled-components'

export const ContactFormContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: #f0f5ff;
  background-color: ${props =>
    props.currencyTheme === 'ethereumStyle' ? '#F0F5FF' : '#FB9ABA'};
  padding: 20px 0;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`

export const ContactFormImgContainer = styled.div`
display: flex;
justify-content: center;
@media (max-width: 700px) {   
    &>img {
        display: none;
    }
`

export const FlexContactFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ContactHeading = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  margin-bottom: 25px;
  & > h3 {
    font-weight: 900;
    font-size: 30px;
    letter-spacing: 0;
    color: #272833;    
    text-align: center;
    margin-bottom: 20px;
    text-align: left;
  }
  & > p {
    font-weight: 400;
    font-size: 18px;
    letter-spacing: 0;
    color: #272833;
    opacity: 0.6;
    text-align: left;
    padding: 0 8px;
  }
  @media (max-width: 700px) {
    align-self: center;
  }
`
// export const SpinnerContainer = styled.div`
// display: none;
// @media screen and (max-width: 700px) {
//     display: flex;
//     align-items: flex-end;
//     height: 20px;
//     &>p {
//         font-weight: 600;
//         font-size: 16px;
//         letter-spacing: 0;
//         color: #272833;
//         opacity: 0.6;
//         animation: ${TypewriterKeyframe}  8s linear 1;
//         animation-fill-mode: forwards;

//     }
//     .spinner-outside {
//         margin-left: 4px;
//         margin-bottom: 8px;
//     }
// }
// `

export const SpinnerContainer = styled.div`
  display: none;
  @media screen and (max-width: 450px) {
    display: flex;
    height: 30px;
  }
`

export const InputFormContainer = styled.div`
  align-self: flex-start;

  .inputContactForm {
    border: 1px solid #cdced9;
    border-radius: 8px;
    opacity: 1;
    height: 48px;
    width: 214px;
    background-color: #f0f5ff;
    padding-left: 10px;
  }

  .inputContactForm::placeholder {
    padding-left: 10px;
  }
  @media screen and (max-width: 700px) {
    align-self: center;
    .spinner-inside {
      display: none;
    }
  }

  @media screen and (max-width: 345px) {
    .inputContactForm {
      width: 160px;
    }
    button {
      min-width: 70px;
      font-size: 13px;
    }
  }
`

export const ContactFormButton = styled.button`
  position: relative;
  font-weight: 900;
  color: white;
  border: 1px solid #cdced9;
  float: right;
  right: 10px;
  bottom: 1px;
  height: 54px;
  max-width: 144px;
  background: ${props =>
      props.currencyTheme === 'ethereumStyle' ? '#206DFF' : '#F7296E'}
    0% 0% no-repeat padding-box;
  border-radius: 0px 8px 8px 0px;
  cursor: pointer;

  &:hover {
    color: #212529;
  }
`
