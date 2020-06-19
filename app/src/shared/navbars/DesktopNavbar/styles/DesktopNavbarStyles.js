import styled from 'styled-components'

export const MainNavbarFlexWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 4vh;
  margin-top: 5vh;
`


export const MainDesktopContainer = styled.div`
  width: 60vw;
  display: flex;
  justify-content: space-between;

  .logo-container {
    flex: 1;
  }
 
  @media screen and (max-width: 1480px) {
    width: 80vw;
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
  
  svg {
      height: 12px;
      width: 11px;
      
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

export const CurrencyMenuParentWrapper = styled.div`
  .currencyMenuContainer {
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 8px;
    width: 62px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
    margin-bottom: 4px;
  }

  .navbarCurrencyDropdownArrow {
    color: #206dff;
    cursor: pointer;
  }


`

export const CurrencyOptionsDropdownLayout = styled.div`
  display: ${props => (props.isVisible ? '' : 'none')};
  position: absolute;
  zindex: 999;

  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 12px 36px #00000014;
  border-radius: 8px;
  border: 1px solid #e7e7ed;
  width: 62px;

  & > p {
    font-size: 15px;
    letter-spacing: 0;
    color: #9d9fa4;
    cursor: pointer;
    text-align: center;
    // margin-bottom: -8px;

    &:hover {
      color: #206dff;
      font-weight: bold;
    }
  }
`
