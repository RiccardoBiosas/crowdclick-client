import styled from "styled-components";

export const GlobalButton = styled.button`
    width: ${(props) => props.buttonWidth}px;
    height: 48px;
    border-radius: 8px;
    border-style: none;
    text-align: center;
    font-weight: 900;
    font-size: 16px;
    letter-spacing: 0;
    color: ${(props) => props.buttonTextColor};   
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    box-shadow: 0px 3px 6px #00000029;
    margin: ${(props) => props.buttonMargin};
    cursor: pointer;
    background: ${(props) => {
      switch (props.buttonColor) {
        case "blue":
          return "#206DFF 0% 0% no-repeat padding-box;";
          break;
        case "green":
          return "#00E15D 0% 0% no-repeat padding-box;";
          break;
        case "orange":
          return "#F6851B 0% 0% no-repeat padding-box;";
          break;
        case "purple":
          return "#f7296e 0% 0% no-repeat padding-box;";
        case "darkBlue":
          return "#311b58 0% 0% no-repeat padding-box;";
        default:
          return `${props.buttonColor} 0% 0% no-repeat padding-box`;
      }
    }}

    

    &:hover {
        // color: #212529;
        // text-decoration: none;
        background: ${(props) => {
          switch (props.buttonColor) {
            case "blue":
              return "#4381F7 0% 0% no-repeat padding-box;";
              break;
            case "green":
              return "#31AB37 0% 0% no-repeat padding-box;";
              break;
            case "orange":
              return "#F6851B 0% 0% no-repeat padding-box;";
              break;
            default:
              return `${props.buttonColor} 0% 0% no-repeat padding-box`;
          }
        }}
    }   



`;
