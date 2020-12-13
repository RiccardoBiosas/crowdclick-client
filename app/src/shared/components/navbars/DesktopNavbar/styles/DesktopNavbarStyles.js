import styled from 'styled-components'
import { Link } from 'react-router-dom'


export const StyledNavbarFlexWrapper = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 4vh;
  margin-top: 5vh;
`

export const StyledDesktopNavbarLayout = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;

  .logo-container {
    flex: 1;
  }

  @media screen and (max-width: 1480px) {
    width: 80%;
  }
`

export const StyledFirstDivGroup = styled.div`
  flex: 4;
  display: flex;
  justify-content: center;
  align-items: center;
  > div:nth-child(1) {
    margin-right: 20px;
  }

  a:first-child {
    text-decoration: none;
    cursor: pointer;
    color: ${props => props.theme.desktopNavbar.tutorialLink};
  }
`

export const StyledAuthSecondDivGroup = styled.div`
  flex: 3;
  display: flex;
  justify-content: space-between;
  > div:nth-child(1) {
    display: flex;
    justify-content: flex-end;
  }
  > div:nth-child(2) {
    display: flex;
    justify-content: center;
  }
  > div:nth-child(3) {
  }
`

export const StyledBackgroundThemeButton = styled.button`
  margin-top: 10px;
  background-color: #206DFF;
  border: 1px solid #206DFF;
  border-radius: 30px;
  display: flex;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  overflow: hidden;
  padding: 0px;
  height: 26px;
  width: 50px;
  cursor: pointer;

    .sunContainer {
    background-color: white;
    border-radius: 50%;
    height: 20px;
    width: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s linear;

  }

  .moonContainer {
    background-color: white;
    border-radius: 50%;
    height: 20px;
    width: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s linear;
  }
  


  .sunContainer {       
      transform: ${props =>
        props.bgtheme === 'light' ? 'translateX(0)' : 'translateX(50px)'};
    }
    
    
  .moonContainer {
      transform: ${props =>
        props.bgtheme === 'dark' ? 'translateX(0)' : 'translateX(-50px)'};
    }
}
`

export const StyledRouterLink = styled(Link)`
  color: ${(props) => props.theme.homepage.tutorialLink};
`

export const StyledTelegramLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-decoration: none;
  ${({ styledWidth }) => styledWidth && `width: ${styledWidth}px`};
  ${({ styledTextColor }) => styledTextColor && `color: ${styledTextColor}`};
  ${({ styledMargin }) => styledMargin && `margin: ${styledMargin}`};
  height: ${({ styledHeight }) => (styledHeight ? `${styledHeight}` : '48px')};
  border-radius: 8px;
  border-style: none;
  text-align: center;
  font-weight: 900;
  font-size: 16px;
  letter-spacing: 0;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  box-shadow: 0px 3px 6px #00000029;
  cursor: pointer;
  background: #206dff 0% 0% no-repeat padding-box;
`
