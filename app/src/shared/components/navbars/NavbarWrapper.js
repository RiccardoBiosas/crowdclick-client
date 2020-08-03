import React, {Fragment } from 'react'
import { DesktopNavbar } from './DesktopNavbar/DesktopNavbar'
import { MobileNavbar } from './MobileNavbar/MobileNavbar'
import { useWindowSize } from '../../../hooks/useWindowSize'

const NavbarWrapper = () => {
  const screenDimensions = useWindowSize()

  return (
    <Fragment>
      {screenDimensions.width >= 1080 && <DesktopNavbar  />}

      {screenDimensions.width < 1080 && <MobileNavbar  />}
    </Fragment>
  )
}

export default NavbarWrapper
