import styled from 'styled-components'

export const NavbarFlexWrapper = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 4vh;
  margin-top: 5vh;
`


export const DesktopNavbarLayout = styled.div`
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


export const FirstDivGroup = styled.div`
  flex: 4;
  display: flex;
  justify-content: center;  
  > div:nth-child(1) {
    margin-right: 20px;
  }

  p {
    color: ${props => props.theme.desktopNavbar.balanceParagraph};
  }
`

export const AuthSecondDivGroup = styled.div`
  flex: 3;
  display: flex;
  justify-content: space-between;
  > div:nth-child(1) {
    display: flex;
    justify-content: flex-end
  }
  > div:nth-child(2) {
    display: flex;
    justify-content: center;
  }
  > div:nth-child(3) {
  }

`

export const BackgroundThemeButton = styled.button`
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