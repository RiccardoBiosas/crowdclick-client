import styled from "styled-components";
import { StyledBackgroundThemeButton } from "../../DesktopNavbar/styles/DesktopNavbarStyles";

export const StyledMobileNavbarLayout = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
`;

export const StyledBurger = styled.button`
  width: 42px;
  height: 40px;
  position: relative;
  z-index: 9999;
  left: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  cursor: pointer;
  background: transparent;
  padding: 0;
  margin: 14px 0 0 0;
  border: none;

  & > div {
    height: 4px;
    width: 40px;
    border-radius: 30%;
    transition: all 0.4s linear;
    transform-origin: 1px;
    background-color: ${({ navbarState }) => (navbarState ? "white" : "black")};

    &:first-child {
      transform: ${({ navbarState }) =>
        navbarState ? "rotate(45deg)" : "rotate(0deg)"};
    }

    &:nth-child(2) {
      opacity: ${({ navbarState }) => (navbarState ? "0" : "1")};
    }

    &:last-child {
      transform: ${({ navbarState }) =>
        navbarState ? "rotate(-45deg)" : "rotate(0deg)"};
    }
  }
`;

export const StyledMenu = styled.nav`
  height: 100vh;
  width: 100vw;
  display: flex;
  position: absolute;
  background-color: #f3f6fe;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  padding: 10px;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  transform: ${({ navbarState }) =>
    navbarState ? "translateX(0)" : "translateX(-100%)"};
  z-index: 999;
  overflow: hidden;

  & > div:first-child {
    width: 202vw;
    height: 200vh;
    position: relative;
    border-radius: 50%;
    background-color: blue;
    right: 100%;
    bottom: 30%;
    padding-left: 30vw;
    padding-top: 60vh;
  }

  & > div:last-child {
    position: absolute;
    top: 14vh;
    left: 24px;
  }
`;

export const StyledCurrencyOption = styled.div`
${({optionMargin}) => optionMargin && `margin: ${optionMargin}`}
  // margin-top: 12px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  & > div {
    border-radius: 50%;
    height: 16px;
    width: 16px;
    background-color: white;
    transition: all 0.4s linear;
    &:hover {
      background-color: green;
    }
  }
  & > p {
    color: white;
    font-weight: 900;
    margin-left: 8px;
  }
`;

export const CustomizedMobileBackgroundThemeButton = styled(
  StyledBackgroundThemeButton
)`
  &&& {
    position: static;
  }
`;
