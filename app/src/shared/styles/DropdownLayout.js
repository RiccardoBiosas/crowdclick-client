import styled from "styled-components";

export const DropdownButton = styled.div`
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
        break;
      case "small":
        return "width: 62px; height: 48px;";
        break;
      default:
        return ``;
        break;
    }
  }}
`;

export const DropdownLayout = styled.ul`
  position: absolute;
  z-index: 99999;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 8px;
  overflow: hidden;
  margin: 0.3rem 0 0 0;
  padding: 0;
  height: ${({active}) => active ? "inherit" : "0"};
  width : ${({size}) => {
    switch (size) {
      case "medium":
        return "139px;";
        break;
      case "small":
        return "62px;";
        break;
      default:
        return `inherit`;
        break;
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

export const ArrowLayout = styled.div`
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
