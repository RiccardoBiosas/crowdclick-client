// theirs
import React, { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { useDispatch } from 'react-redux'
// components
import { DesktopNavbar } from './DesktopNavbar/DesktopNavbar'
import { MobileNavbar } from './MobileNavbar/MobileNavbar'
// utils
import { useWindowSize } from '../../../hooks/useWindowSize'
// constants
import { iframeNormalScreenAction } from '../../../redux/Iframe/IframeActions'
import { USER_TASK_ROUTE_WITH_PARAM } from '../../../config/routes-config'

const NavbarWrapper = () => {
  const screenDimensions = useWindowSize()
  // const dispatch = useDispatch()
  // const location = useLocation()

  // useEffect(() => {
  //   if (!window.location.href.includes(USER_TASK_ROUTE_WITH_PARAM)) {
  //     dispatch(iframeNormalScreenAction)
  //   }
  // }, [location])

  return (
    <>
      {screenDimensions.width >= 1080 && <DesktopNavbar />}
      {screenDimensions.width < 1080 && <MobileNavbar />}
    </>
  )
}

export default NavbarWrapper
