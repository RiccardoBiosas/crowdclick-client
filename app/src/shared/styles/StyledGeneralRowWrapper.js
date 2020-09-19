import styled from 'styled-components'

const StyledGeneralRowWrapper = styled.div`
  ${({ rowPosition }) => rowPosition && `position: ${rowPosition};`}
  ${({ rowMargin }) => rowMargin && `margin: ${rowMargin};`}
  height: ${({ rowHeight }) => rowHeight || 'inherit'};
  width: ${({ rowWidth }) => rowWidth || 'inherit'};
  display: flex;
  align-items: ${({ rowAlign }) => rowAlign || 'center'};
  justify-content: ${({ rowJustify }) => rowJustify || 'center'};
`

export default StyledGeneralRowWrapper
