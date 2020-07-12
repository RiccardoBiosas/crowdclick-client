import styled from "styled-components";

export const StyledContactFormLayout = styled.div`
  width: 100vw;
  height: 20rem;
  display: flex;
  justify-content: center;
  background-color: ${({ currencyTheme }) =>
    currencyTheme === "ethereumStyle" ? "#A5FFFF" : "#FB9ABA"};
  padding: 20px 0;

  @media (max-width: 700px) {
    height: 24rem;
  }
`;

export const StyledContactFormWrapper = styled.div`
  height: 100%;
  width: 60%;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 1480px) {
    width: 80%;
  }
  @media screen and (max-width: 700px) {
    & > .logo-wrapper {
      & > img {
        display: none;
      }
    }
  }
`;

export const StyledContactHeading = styled.div`
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
`;

export const StyledSpinnerWrapper = styled.div`
  display: none;
  @media screen and (max-width: 700px) {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
  }
`;

export const StyledInputFormWrapper = styled.div`
  display: flex;

  .desktop-svgWrapper {
    @media screen and (max-width: 700px) {
      display: none;
    }
  }

  & > form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & > div {
      margin-top: 2rem;
      display: flex;
      & > input[type="text"] {
        border: 1px solid #cdced9;
        border-radius: 8px;
        opacity: 1;
        height: 52px;
        width: 214px;
        background-color: #f0f5ff;
        padding-left: 10px;
      }

      & > input[type="text"]::placeholder {
        padding-left: 10px;
      }

      & > input[type="submit"] {
        position: relative;
        font-weight: 900;
        color: white;
        border: 1px solid #cdced9;
        float: right;
        right: 10px;
        bottom: 1px;
        height: 54px;
        max-width: 144px;
        background: ${({ currencyTheme }) =>
            currencyTheme === "ethereumStyle" ? "#206DFF" : "#F7296E"}
          0% 0% no-repeat padding-box;
        border-radius: 0px 8px 8px 0px;
        cursor: pointer;

        &:hover {
          color: #212529;
        }
      }
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
  }
`;
