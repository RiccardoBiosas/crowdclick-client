import styled from "styled-components";

const StyledGlobalButton = styled.button.attrs({
  type: 'button'
})`
    ${({ buttonWidth }) =>  buttonWidth && `width: ${buttonWidth}px`};
    ${({ buttonTextColor }) => buttonTextColor && `color: ${buttonTextColor}`};
    ${({buttonMargin}) => buttonMargin && `margin: ${buttonMargin}`};
    height: ${({ buttonHeight }) =>  buttonHeight ? `${buttonHeight}` : '48px'};
    border-radius: 8px;
    border-style: none;
    text-align: center;
    font-weight: 900;
    font-size: 16px;
    letter-spacing: 0;      
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    box-shadow: 0px 3px 6px #00000029;    
    cursor: pointer;
    ${({buttonColor}) => {
      switch (buttonColor) {
        case "blue":
          return "background: #206DFF 0% 0% no-repeat padding-box;";
        case "green":
          return "background: #00E15D 0% 0% no-repeat padding-box;";
        case "orange":
          return "background: #F6851B 0% 0% no-repeat padding-box;";
        case "purple":
          return "background: #f7296e 0% 0% no-repeat padding-box;";
        case "darkBlue":
          return "background: #311b58 0% 0% no-repeat padding-box;";
        default:
          return `background: ${buttonColor} 0% 0% no-repeat padding-box`;
      }
    }}   

    &:hover {
        background: ${({buttonColor}) => {
          switch (buttonColor) {
            case "blue":
              return "#4381F7 0% 0% no-repeat padding-box;";
            case "green":
              return "#31AB37 0% 0% no-repeat padding-box;";
            case "orange":
              return "#F6851B 0% 0% no-repeat padding-box;";
            default:
              return `${buttonColor} 0% 0% no-repeat padding-box`;
          }
        }}
    }   
`;

export default StyledGlobalButton