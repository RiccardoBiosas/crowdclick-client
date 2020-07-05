import styled from "styled-components";

const StyledAnchor = styled.a`
  ${({ anchorColor }) => anchorColor && `color: ${anchorColor};`}
  ${({ anchorMargin }) => anchorMargin && `margin: ${anchorMargin};`}
  text-align: center;
  text-decoration: none;
  display: block;
  font-size: 18px;
  cursor: pointer;
  padding: 10px 0;
  font-weight: bold;
  letter-spacing: 5px;
`;

export default StyledAnchor;
