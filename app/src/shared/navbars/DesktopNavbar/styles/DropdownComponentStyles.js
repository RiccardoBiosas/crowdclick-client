import styled from 'styled-components'
import {NavLink} from "react-router-dom"

export const DropdownContainer = styled.div`
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 8px;
  ${props => {
    switch (props.size) {
      case 'medium':
        return 'width: 139px; height: 48px;'
        break
      case 'small':
        return 'width: 62px; height: 48px;'
        break
      default:
        return `${props.width}px; ${props.height}px`
        break
    }
  }}
`

export const DropdownMainComponent = styled.div`
  display: flex;
  justify-content: space-around;
  cursor: pointer;
  padding-left: 12px;

 
`

export const DropdownContainerList = styled.ul`
  position: relative;
  z-index: 99999;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 8px;
  transition: max-height 0.6s ease-out;
  max-height: ${props => (props.active ? '1000px' : '0')};
  overflow: hidden;
  margin: 0;
  padding: 0;
`

export const DropdownContainerListItem = styled.li`
  cursor: pointer;
  list-style: none;
  // padding: 12px 0 8px 15px;
  padding: 12px 0 8px 32px;
  color: #9D9FA4;

  &:hover {
    color: #206DFF;
    font-weight: bold;
  }

`

export const StyledNavLink = styled(NavLink)`
  display: block;
  cursor: pointer;
  list-style: none;
  text-decoration: none;
  // padding: 12px 0 8px 15px;
  padding: 12px 0 8px 32px;
  color: #9D9FA4;

  &:hover {
    color: #206DFF;
    font-weight: 700;
  }
`

export const ArrowContainer = styled.div`
  display: flex;
  align-items: center;

  .arrow {
    position: relative;
    height: 12px;
    width: 30px;
    transition: all 0.5s;
  }

  .down {
    &:before,
    &:after {
      position: absolute;
      content: '';
      top: 6px;
      width: 12px;
      border: 2px solid #206DFF;
      transition: all 0.5s;
    }
    &:before {
      transform: rotateZ(45deg);
      left: 7px;
    }
    &:after {
      transform: rotateZ(-45deg);
      left: 13px;
    }
    &:hover {
      border-color: transparent;
    }
    &:hover:before,
    &:hover:after {
      top: 16px;
    }
  }

  .up {
    &:before,
    &:after {
      position: absolute;
      content: '';
      top: 14px;
      width: 12px;
      border: 2px solid #206DFF;
      transition: all 0.3s;
    }
    &:before {
      transform: rotateZ(135deg);
      left: 4px;
    }

    &:after {
      transform: rotateZ(-135deg);
      left: 13px;
    }
    &:hover {
      border-color: transparent;
    }
    &:hover:before,
    &:hover:after {
      top: 8px;
    }
  }
`
