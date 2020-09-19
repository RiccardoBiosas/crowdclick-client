// theirs
import React from 'react'
// assets
import { FaTelegramPlane } from 'react-icons/fa'
// styles
import { StyledFirstDivGroup } from './styles/DesktopNavbarStyles'
import StyledGeneralButton  from '../../../styles/StyledGeneralButton'

export const NavbarNotAuthElements = () => {
  const scrollToCoordinate = x => {
    window.scrollBy({ top: [x], behavior: 'smooth' })
  }
  return (
    <StyledFirstDivGroup>
      <div>
        <p
          onClick={() => scrollToCoordinate(800)}
          style={{ cursor: 'pointer' }}
        >
          How it works
        </p>
      </div>
      <div>
        <StyledGeneralButton
          buttonColor={'blue'}
          buttonTextColor={'#FFFFFF'}
          buttonWidth={140}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around'
          }}
          onClick={() => scrollToCoordinate(2800)}
        >
          Launch on <FaTelegramPlane size={24} />
        </StyledGeneralButton>
      </div>
    </StyledFirstDivGroup>
  )
}
