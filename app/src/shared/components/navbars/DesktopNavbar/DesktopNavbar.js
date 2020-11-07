// theirs
import React, { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { useSpring, useChain, animated } from 'react-spring'
import { useSelector, useDispatch } from 'react-redux'
// components
import { NavbarNotAuthElements } from './NavbarNotAuthElements'
import { AccountDropdown } from './AccountDropdown'
import { NavbarAuthElements } from './NavbarAuthElements'
import MetamaskButton from '../../metamask/MetamaskButton'
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
// assets
import { ReactComponent as Sun } from '../../../../assets/navbar/sun.svg'
import { ReactComponent as Moon } from '../../../../assets/navbar/moon.svg'
import Logo from '../../../../assets/images/Logo.svg'
import aeternity_currency_menu_logo from '../../../../assets/images/aeternity_currency_menu_logo.png'
import { FaEthereum } from 'react-icons/fa'
import { MdKeyboardArrowDown } from 'react-icons/md'
// constants
import {
  ethereumStyleAction,
  aeternityStyleAction
} from '../../../../redux/CurrencyStyle/currencyStyleActions'
import {
  darkModeAction,
  lightModeAction
} from '../../../../redux/ThemeMode/themeModeActions'
import { HOME_ROUTE } from '../../../../config/routes-config'

export const DesktopNavbar = () => {
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

  const setNavbarOpacity = useSpring({
    opacity: !navbarState ? 1 : 0,
    config: {
      duration: 400
    }
  })

  const setNavbarPosition = useSpring({
    display: !navbarState ? '' : 'none',
    // delay: !navbarState ? 400 : 0,
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

  useEffect(() => {
    const listener = event => {
      if (
        !currencyThemeContainerRef ||
        currencyThemeContainerRef.current.contains(event.target)
      ) {
        return
      } else {
        setCurrencyMenuStatus(false)
      }
    }

    document.addEventListener('mousedown', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
    }
  }, [currencyThemeContainerRef, currencyMenuStatus])

  return (
    <animated.div style={{ ...setNavbarOpacity, ...setNavbarPosition }}>
      <StyledNavbarFlexWrapper>
        <StyledDesktopNavbarLayout>
          <div className='logo-container'>
            <NavLink exact to={HOME_ROUTE}>
              <img src={Logo} alt='crowdclick-logo' />
            </NavLink>
          </div>

          {isAuthenticated ? <NavbarAuthElements /> : <NavbarNotAuthElements />}

          <StyledAuthSecondDivGroup>
            <StyledBackgroundThemeButton
              onClick={toggleBackground}
              bgtheme={currentScreenTheme}
            >
              <div className='sunContainer'>
                <Sun className='sun' />
              </div>
              <div className='moonContainer'>
                <Moon className='moon' />
              </div>
            </StyledBackgroundThemeButton>

            <div>
              {isAuthenticated ? <AccountDropdown /> : <MetamaskButton />}
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
                    <FaEthereum color='#206dff' size='28px' />
                  ) : (
                    <img
                      src={aeternity_currency_menu_logo}
                      alt='cryptocurrency-logo'
                    />
                  )}
                  <StyledArrowLayout>
                    <MdKeyboardArrowDown
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
                  itemPadding='12px 0 8px 14px'
                >
                  <li
                    className='dropdown-item'
                    onClick={() => dispatch(ethereumStyleAction)}
                  >
                    ETH
                  </li>
                  <li
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
