// theirs
import React from 'react'
// assets
import { FaTelegramPlane } from 'react-icons/fa'
// styles
import {
  StyledFirstDivGroup,
  StyledTelegramLink
} from './styles/DesktopNavbarStyles'

export const NavbarNotAuthElements = () => {
  return (
    <StyledFirstDivGroup>
      <div>
        <p
          // onClick={() => scrollToCoordinate(800)}
          style={{ cursor: 'pointer' }}
        >
          How it works
        </p>
      </div>
      <StyledTelegramLink
        styledTextColor={'#FFFFFF'}
        styledWidth={120}
        target='_blank'
        href='https://t.me/crowdclick'
        rel='noopener noreferrer'
      >
        Launch on <FaTelegramPlane size={24} />
      </StyledTelegramLink>
    </StyledFirstDivGroup>
  )
}
