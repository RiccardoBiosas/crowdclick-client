// theirs
import React from 'react'
// components
import { DesktopNavbar } from './DesktopNavbar/DesktopNavbar'
import { MobileNavbar } from './MobileNavbar/MobileNavbar'
// utils
import { useWindowSize } from '../../../hooks/useWindowSize'

const NavbarWrapper = () => {
  const screenDimensions = useWindowSize()

  return (
    <>
      {screenDimensions.width >= 1080 && <DesktopNavbar />}
      {screenDimensions.width < 1080 && <MobileNavbar />}
    </>
  )
}

export default NavbarWrapper
