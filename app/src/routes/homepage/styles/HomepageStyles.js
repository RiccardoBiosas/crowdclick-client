import styled from "styled-components";

export const CenteredColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CenteredColumnWithMediaQueries = styled.div`
  @media screen and (max-width: 1060px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    ${({ containerMargin }) => containerMargin && `margin: ${containerMargin}`}
  }
`;

export const HomepageWrapper = styled.main`
  background-color: ${(props) => props.theme.homepage.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow-x: hidden;
`;

export const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  @media screen and (max-width: 1480px) {
    width: 80%;
  }
`;

export const CardLayout = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 20vh;

  @media screen and (max-width: 1060px) {
    display: flex;
    flex-direction: column;
    margin-bottom: 16vh;
  }
`;

export const CardsParagraph = styled.p`
  color: ${(props) => props.theme.homepage.cardsParagraph};
  font-size: 18px;
  line-height: 0.7;
  white-space: nowrap;

  @media screen and (max-width: 1400px) {
    line-height: 1.4;
  }

  @media screen and (max-width: 600px) {
    white-space: normal;
    text-align: center;
    padding: 0 8px;
  }
`;

export const CardMainHeading = styled.h1`
  font-weight: 900;
  ${({ mainHeadline }) => mainHeadline && ` font-size: ${mainHeadline}px`};
  color: ${(props) => props.theme.homepage.cardsHeading};
  font-size-adjust: 0.5;
  margin-bottom: 40px;
  white-space: nowrap;
  @media screen and (max-width: 1060px) {
    text-align: center;
  }
  @media screen and (max-width: 580px) {
    white-space: normal;
    ${(props) =>
      props.type === "no-break-paragraph" ? "" : "word-spacing: 100vw"};
  }
`;

export const CardList = styled.ul`
list-style: none; 
&>li {
    text-align: left;
    font-weight: 400;
    font-size: 20px;    
    letter-spacing: 0;
    color: ${(props) => props.theme.homepage.cardsList};
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
    ${({ color }) => color && `color: ${color}`};
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
`;

export const ImgWrapper = styled.div`
  ${(props) => (props.type === "appearing" ? "display: none" : "")};
  ${(props) =>
    props.type === "double-card" ? "display: flex; align-items: center" : ""}

  @media screen and (max-width: 1400px) {
    ${(props) =>
      props.type === "double-card"
        ? "display: flex; justify-content: center"
        : ""}
  }

  @media screen and (max-width: 1060px) {
    display: flex;
    justify-content: center;
    ${(props) => (props.type === "disappearing" ? "display: none" : "")};
    ${(props) => (props.type === "appearing" ? "display: flex" : "")};
  }

  @media screen and (max-width: 500px) {
    & > img {
      width: 60vw;
    }
  }
`;
