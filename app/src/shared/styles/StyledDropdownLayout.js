import styled from "styled-components";

export const StyledDropdownButton = styled.div`
  background: #ffffff 0% 0% no-repeat padding-box;  
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 8px;
  ${({dropdownBtnPadding}) => dropdownBtnPadding ? `padding: ${dropdownBtnPadding}` : null}
  display: flex;
  justify-content: space-around;
  align-items: center;
  ${(props) => {
    switch (props.size) {
      case "medium":
        return "width: 139px; height: 48px;";
      case "small":
        return "width: 62px; height: 48px;";
      default:
        return `width: inherit; height: auto`;        
    }
  }}
`;

export const StyledDropdownLayout = styled.ul`
  position: absolute;
  z-index: 99999;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 8px;
  overflow: hidden;
  margin: 0.3rem 0 0 0;
  padding: 0;
  height: ${({active, activeHeight}) => active ? (activeHeight || "inherit") : "0"};
  width : ${({size}) => {
    switch (size) {
      case "large":
        return "20rem";
      case "medium":
        return "139px;";
      case "small":
        return "62px;";
      default:
        return `inherit`;
    }
  }}
  transition: height 0.6s ease-out; 

  .dropdown-item {
    cursor: pointer;
    padding: ${({ itemPadding }) => itemPadding};
    color: #9d9fa4;
    display: block;
    text-decoration: none;
    &:hover {
      color: #206dff;
      font-weight: bold;
    }  
  }

`;

export const StyledArrowLayout = styled.div`
  display: flex;
  align-items: center;
  .arrow {
    position: relative;
    transition: all 0.4s ease;
    cursor: pointer;

    &:hover {
      top: 6px;
    }
  }
`;
