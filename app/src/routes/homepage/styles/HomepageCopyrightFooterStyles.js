import styled from "styled-components";

export const CopyrightFooterLayout = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin: 10px 0;

div {   
    &>p {
        margin: 6px 0;
        color: ${props => props.theme.homepage.copyrightFooterParagraph}
    }
}
`
