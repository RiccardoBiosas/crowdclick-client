import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'

export const GlobalStyles = createGlobalStyle`
${normalize}
@import url("https://fonts.googleapis.com/css?family=Open+Sans");

html {
    box-sizing: border-box;
}
  
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
  
  body {
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif;
    width: 100%;
    background-color: ${(props) => props.theme.global.background};
  }
  
  button {
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    -o-appearance: none;
    appearance: none;
  }
  
  a:hover,
  a:active,
  a:focus {
    outline: 0;
  }
  
  :focus {
    outline: none;
  }
  
  ::-moz-focus-inner {
    border: 0;
  }
`
