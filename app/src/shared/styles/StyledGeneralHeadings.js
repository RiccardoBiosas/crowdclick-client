import styled from "styled-components";

export const StyledGeneralHeadingOne = styled.h1`
  color: ${({ headingColor }) => headingColor || "inherit"};
  font-size: ${({ headingFontSize }) => headingFontSize || "inherit"};
  text-align: ${({ headingTextAlign }) => headingTextAlign || "center"};
`;

export const StyledGeneralHeadingTwo = styled.h2`
  color: ${({ headingColor }) => headingColor || "inherit"};
  font-size: ${({ headingFontSize }) => headingFontSize || "inherit"};
  text-align: ${({ headingTextAlign }) => headingTextAlign || "center"};
`;
