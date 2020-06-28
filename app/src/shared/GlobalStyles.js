import {createGlobalStyle} from "styled-components";


export const GlobalStyles = createGlobalStyle`
body {
    background-color: ${props => props.theme.global.background};
    width: 100%;
    overflow-x: hidden;
}

`