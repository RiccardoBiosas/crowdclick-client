import styled from 'styled-components'

export const HomepageContainer = styled.div`
  background-color: ${props => props.theme.homepage.background};
`

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 99vw;
`

export const CardLayout = styled.div`
  display: flex;
  width: 60vw;
  margin-bottom: 20vh;

  @media screen and (max-width: 1060px) {
    display: flex;
    flex-direction: column;
    margin-bottom: 16vh;
  }
`

export const CardContainer = styled.div`
p {
    color: ${props => props.theme.homepage.cardsParagraph};
    font-size: 18px;       
    line-height: 0.7;
    white-space: nowrap;
}

@media screen and (max-width: 1400px) {
    p {        
        line-height: 1.4;      
    }


@media screen and (max-width: 600px) {
    p {
        white-space: normal;
        text-align: center;
        padding: 0 8px;  
             
    }
}



`

export const CardBtnContainer = styled.div`
  margin-top: 45px;

  & > button {
    width: 135px;
    height: 48px;
    border-radius: 8px;
    border-style: none;
    text-align: center;
    font-weight: 900;
    font-size: 16px;
    letter-spacing: 0;
    color: #ffffff;
    opacity: 1;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    &:hover {
      color: #212529;
      text-decoration: none;
    }
  }
  .greenButton {
    background: #00e15d 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
  }
  .blueButton {
    background: #206dff 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
  }
  .purpleButton {
    background-color: #f7296e;
  }
  .darkBlueButton {
    background-color: #311b58;
  }

  .darkBlueButton:hover {
    color: gray;
  }

  @media (max-width: 1100px) {
    display: flex;
    justify-content: center;
    & > button {
      min-width: 18vw;
    }
  }
  @media screen and (max-width: 1060px) {
    margin-bottom: 60px;
  }
`

export const Container = styled.div`
  margin-bottom: ${props =>
    props.type === 'double-card-first' ? '50' : '0'}px;
`

export const CardMainHeading = styled.h1`
  font-weight: 900;
  font-size: ${props => props.mainHeadline}px;
  color: ${props => props.theme.homepage.cardsHeading};
  font-size-adjust: 0.5;
  margin-bottom: 40px;
  white-space: nowrap;
  @media screen and (max-width: 1060px) {
    text-align: center;
  }
  @media screen and (max-width: 580px) {
    white-space: normal;
    ${props =>
      props.type === 'no-break-paragraph' ? '' : 'word-spacing: 100vw'};
  }
`

export const CardList = styled.ul`
list-style: none; 
&>li {
    text-align: left;
    font-weight: 400;
    font-size: 20px;    
    letter-spacing: 0;
    color: ${props => props.theme.homepage.cardsList};
    letter-spacing: 0;
    opacity: 1;
    margin-bottom: 30px;
    white-space: nowrap;
    
    
}

&>li:last-child {
    margin-bottom: 0;
}

&>li::before {
    content: "\\2022";
    color: ${props => props.color};
    font-weight: bold;
    font-size: 20px;    
    margin-right: 1em; 
    margin-left: -1.8em;     
     
}


@media screen and (max-width: 580px) {    
    margin-left: 10vw;
    padding-right: 10px;
    &>li {
        white-space: normal;  
        list-style-position: inside;
        text-indent: 0.5em;

    }   
   

`

export const ImgContainer = styled.div`
  ${props => (props.type === 'appearing' ? 'display: none !important' : '')};
  ${props =>
    props.type === 'double-card' ? 'display: flex; align-items: center' : ''}

  @media screen and (max-width: 1400px) {
    ${props =>
      props.type === 'double-card'
        ? 'display: flex; justify-content: center'
        : ''}
  }

  @media screen and (max-width: 1060px) {
    ${props =>
      props.type === 'disappearing' ? 'display: none !important' : ''};
    ${props => (props.type === 'appearing' ? 'display: flex !important' : '')};
  }

  @media screen and (max-width: 500px) {
    justify-content: center;
    & > img {
      width: 90vw;
    }
  }
`
