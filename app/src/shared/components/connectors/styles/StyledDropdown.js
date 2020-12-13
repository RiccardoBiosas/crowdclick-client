import styled from 'styled-components'

/** TODO: merge it with the other dropdown in a more generic styled component */
export const StyledConnectDropdownLayout = styled.div`
  position: absolute;
  z-index: 99999;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 8px;
  overflow: hidden;
  margin: 0.3rem 0 0 0;
  padding: 0;
  height: ${({ active }) => (active ? '8rem' : '0')};
  width : ${({ size }) => {
    switch (size) {
      case 'large':
        return '20rem'
      case 'medium':
        return '139px;'
      case 'small':
        return '62px;'
      default:
        return `inherit`
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

`
