import styled from "styled-components";

export const FooterLayout = styled.div`
margin-top: 4vh;
display: flex;
justify-content: space-around;

.footerLogo {    
    width: 222px;
    height: 55px;
    align-self: center;
}
.footerIcon {
    height: 6vh;
    width: 6vw;
    align-self: center;
    color: grey;
    cursor: pointer;    

    &:hover {
        color: #206DFF;
    }

   
}

a {
    align-self: center;
}

.githubIssue {
    height: 15vh;
    width: 6.5vw;
}



@media (max-width: 500px) {
    .footerLogo {
        width: 162px;
        height: 45px;
    }
}
`

export const FooterIconCol = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`


