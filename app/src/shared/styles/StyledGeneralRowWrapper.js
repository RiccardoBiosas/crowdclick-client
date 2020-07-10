import styled from 'styled-components'

const StyledGeneralRowWrapper = styled.div`
  height: ${({ rowHeight }) => rowHeight || "inherit"};
  width: ${({ rowWidth }) => rowWidth || "inherit"};
  display: flex;
  align-items: ${({ rowAlign }) => rowAlign || "center"};
  justify-content: ${({ rowJustify }) => rowJustify || "center"};
`;

export default StyledGeneralRowWrapper