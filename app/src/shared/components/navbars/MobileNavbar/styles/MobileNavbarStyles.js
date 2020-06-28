import styled from 'styled-components'
import { BackgroundThemeButton } from '../../DesktopNavbar/styles/DesktopNavbarStyles'

export const StyledBurger = styled.div`
  position: relative;
  left: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  cursor: pointer;
  width: 90vw;
  z-index: 9999;

`

export const StyledMenu = styled.nav`
  display: flex;
  position: absolute;
  background-color: grey;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  padding: 10px;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  transform: ${props =>
    props.navbarState ? 'translateX(0)' : 'translateX(-100%)'};
  z-index: 999;
  height: 100vh;


  p {
    font-size: 18px;
    cursor: pointer;
    text-transform: uppercase;
    padding: 10px 0;
    font-weight: bold;
    letter-spacing: 5px;
    text-decoration: none;
    transition: color 0.3s linear;
  }
  a {
    font-size: 18px;
    cursor: pointer;
    text-transform: uppercase;
    padding: 10px 0;
    font-weight: bold;
    letter-spacing: 5px;
    text-decoration: none;
    transition: color 0.3s linear;
    color: #212529;
  }
  .react-select__placeholder {
    font-size: 18px;
    cursor: pointer;
    text-transform: uppercase;
    padding: 10px 0;
    font-weight: bold;
    letter-spacing: 5px;
    text-decoration: none;
    transition: color 0.3s linear;
  }
`

export const CustomizedMobileBackgroundThemeButton = styled(
  BackgroundThemeButton
)`
  &&& {
    position: static;
  }
`
