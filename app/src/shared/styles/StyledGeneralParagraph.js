import styled from "styled-components";

const StyledGeneralParagraph = styled.p`
  color: ${({ paragraphColor }) => paragraphColor || "inherit"};
  font-size: ${({ paragraphFontSize }) => paragraphFontSize || "inherit"};
  text-align: ${({ paragraphTextAlign }) => paragraphTextAlign || "center"};
`;

export default StyledGeneralParagraph;
