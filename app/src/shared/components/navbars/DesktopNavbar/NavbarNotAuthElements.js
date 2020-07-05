import React from 'react'
import { FaTelegramPlane } from 'react-icons/fa'
import { FirstDivGroup } from './styles/DesktopNavbarStyles'
import StyledGlobalButton  from '../../../styles/StyledGlobalButton'

export const NavbarNotAuthElements = () => {
  const scrollToCoordinate = x => {
    window.scrollBy({ top: [x], behavior: 'smooth' })
  }
  return (
    <FirstDivGroup>
      <div>
        <p
          onClick={() => scrollToCoordinate(800)}
          style={{ cursor: 'pointer' }}
        >
          How it works
        </p>
      </div>
      <div>
        <StyledGlobalButton
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
        </StyledGlobalButton>
      </div>
    </FirstDivGroup>
  )
}
