// theirs
import React, { useState, useEffect, useRef } from 'react'
import { useLocation, NavLink } from 'react-router-dom'
import { useSpring, useChain, animated } from 'react-spring'
import { useSelector, useDispatch } from 'react-redux'
// assets
import { bigCrowdclickLogo, aeternityLogo, DarkModeIcon, DropdownDownwardArrow, EthereumIcon, LightModeIcon } from '../../../../assets'
// components
import { NavbarNotAuthElements } from './NavbarNotAuthElements'
import AccountDropdown from './AccountDropdown'
import ConnectorsWizard from '../../connectors/ConnectorsWizard'
// styles
import {
  StyledNavbarFlexWrapper,
  StyledDesktopNavbarLayout,
  StyledAuthSecondDivGroup,
  StyledBackgroundThemeButton
} from './styles/DesktopNavbarStyles'
import {
  StyledArrowLayout,
  StyledDropdownLayout,
  StyledDropdownButton
} from '../../../styles/StyledDropdownLayout'
// constants
import {
  ethereumStyleAction,
  aeternityStyleAction
} from '../../../../redux/CurrencyStyle/currencyStyleActions'
import {
  darkModeAction,
  lightModeAction
} from '../../../../redux/ThemeMode/themeModeActions'
import {
  HOME_ROUTE,
  USER_TASK_ROUTE_WITH_PARAM
} from '../../../../constants/config/routes-config'
import { iframeNormalScreenAction } from '../../../../redux/Iframe/IframeActions'
// hooks
import { useHandleEventOutsideRef } from '../../../../hooks/useHandleEventOutsideRef'

const DesktopNavbar = () => {
  const [currencyMenuStatus, setCurrencyMenuStatus] = useState(false)
  const currencyTheme = useSelector(
    ({ currencyStyleReducer }) => currencyStyleReducer
  ).colorStyle
  const navbarState = useSelector(
    ({ IFrameVisibilityReducer }) => IFrameVisibilityReducer
  ).full_screen
  const currentScreenTheme = useSelector(
    ({ themeModeReducer }) => themeModeReducer
  ).screenTheme
  const isAuthenticated = useSelector(({ navAuthReducer }) => navAuthReducer)
    .isNavAuth
  const dispatch = useDispatch()
  const currencyThemeContainerRef = useRef()
  const NavbarOpacityAnimationRef = useRef()
  const NavbarPositionAnimationRef = useRef()

  const location = useLocation()

  useEffect(() => {
    if (!location.pathname.includes(USER_TASK_ROUTE_WITH_PARAM)) {
      dispatch(iframeNormalScreenAction)
    }
  }, [location])

  const setNavbarOpacity = useSpring({
    opacity: navbarState ? 0 : 1,
    config: {
      duration: 400
    }
  })

  const setNavbarPosition = useSpring({
    display: navbarState ? 'none' :  '',
    config: {
      duration: 400
    }
  })

  useChain(
    !navbarState
      ? [NavbarOpacityAnimationRef, NavbarPositionAnimationRef]
      : [NavbarPositionAnimationRef, NavbarOpacityAnimationRef],
    [0, 0.45]
  )

  const toggleBackground = () => {
    const updatedBackgroundState =
      currentScreenTheme === 'light' ? darkModeAction : lightModeAction
    dispatch(updatedBackgroundState)
  }

  const handleCurrency = () => {
    setCurrencyMenuStatus(!currencyMenuStatus)
  }

  useHandleEventOutsideRef(currencyThemeContainerRef, () =>
    setCurrencyMenuStatus(false)
  )

  return (
    <animated.div style={{ ...setNavbarOpacity, ...setNavbarPosition }}>
      <StyledNavbarFlexWrapper>
        <StyledDesktopNavbarLayout>
          <div className='logo-container'>
            <NavLink exact to={HOME_ROUTE}>
              <img src={bigCrowdclickLogo} alt='crowdclick-logo' />
            </NavLink>
          </div>

          <NavbarNotAuthElements />

          <StyledAuthSecondDivGroup>
            <StyledBackgroundThemeButton
              onClick={toggleBackground}
              bgtheme={currentScreenTheme}
            >
              <div className='sunContainer'>
                <LightModeIcon className='sun' />
              </div>
              <div className='moonContainer'>
                <DarkModeIcon className='moon' />
              </div>
            </StyledBackgroundThemeButton>

            <div>
              {isAuthenticated ? <AccountDropdown /> : <ConnectorsWizard />}
            </div>

            <>
              <div
                style={{ position: 'relative' }}
                ref={currencyThemeContainerRef}
              >
                <StyledDropdownButton
                  size='small'
                  dropdownBtnPadding='0 0 0 4px'
                >
                  {currencyTheme === 'ethereumStyle' ? (
                    <EthereumIcon color='#206dff' size='28px' />
                  ) : (
                    <img src={aeternityLogo} alt='cryptocurrency-logo' />
                  )}
                  <StyledArrowLayout>
                    <DropdownDownwardArrow
                      size='28px'
                      color='#206dff'
                      className='arrow'
                      onClick={handleCurrency}
                    />
                  </StyledArrowLayout>
                </StyledDropdownButton>

                <StyledDropdownLayout
                  size='small'
                  active={currencyMenuStatus}
                  activeHeight='5.2rem'
                  itemPadding='12px 0 8px 14px'
                >
                  <li
                    role='button'
                    className='dropdown-item'
                    onClick={() => dispatch(ethereumStyleAction)}
                  >
                    ETH
                  </li>
                  <li
                    role='button'
                    className='dropdown-item'
                    onClick={() => dispatch(aeternityStyleAction)}
                  >
                    AE
                  </li>
                </StyledDropdownLayout>
              </div>
            </>
          </StyledAuthSecondDivGroup>
        </StyledDesktopNavbarLayout>
      </StyledNavbarFlexWrapper>
    </animated.div>
  )
}

export default DesktopNavbar
