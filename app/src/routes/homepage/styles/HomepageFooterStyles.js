import styled from "styled-components";

export const StyledFooterLayout = styled.footer`
  width: 60%;
  margin-top: 4vh;
  display: flex;
  justify-content: space-between;

  .logo-container {
      flex: 2;

    //   > img {
    //     width: 222px;
    //     height: 55px;
    //   }
  }

  .logos-container {
      flex: 1;
      display: flex;
      justify-content: space-between;
      
      > span, a {
       > svg {
        height: 6vh;
        width: 6vw;
        align-self: center;
        color: grey;
        cursor: pointer;
    
        &:hover {
          color: #206dff;
        }
       }
      }
  } 
  

  @media screen and (max-width: 1080px) {
    width: 80%;
  }

  @media screen and (max-width: 900px) {
    height: 14rem;
    flex-direction: column;
    align-items: center;

    > div {
        width: 60%;
        display: flex;
        justify-content: center;
    }
  }

  @media (max-width: 500px) {
    .footerLogo {
      width: 162px;
      height: 45px;
    }
  }
`;
