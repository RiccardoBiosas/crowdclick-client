import React, { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'

import { ReactComponent as Sun } from '../../../assets/navbar/sun.svg'
import { ReactComponent as Moon } from '../../../assets/navbar/moon.svg'
import Logo from '../../../assets/images/Logo.svg'
import {
  MainNavbarFlexWrapper,
  MainDesktopContainer,
  AuthSecondDivGroup,
  CurrencyMenuParentWrapper,
  CurrencyOptionsDropdownLayout,
  BackgroundThemeButton
} from './styles/DesktopNavbarStyles'
import { useSpring, useChain, animated } from 'react-spring'
import { useSelector, useDispatch } from 'react-redux'
import {
  ethereumStyleAction,
  aeternityStyleAction
} from '../../../redux/CurrencyStyle/currencyStyleActions'
import aeternity_currency_menu_logo from '../../../assets/images/aeternity_currency_menu_logo.png'
import { FaEthereum } from 'react-icons/fa'
import { MdKeyboardArrowDown } from 'react-icons/md'
import {
  darkModeAction,
  lightModeAction
} from '../../../redux/ThemeMode/themeModeActions'
import { NavbarNotAuthElements } from './NavbarNotAuthElements'
import { AccountDropdown } from './AccountDropdown'
import { NavbarAuthElements } from './NavbarAuthElements'
import MetamaskButton from '../../../metamask/MetamaskButton'
import { useLocalStorage } from '../../../hooks/useLocalStorage'

export const DesktopNavbar = () => {
  const [currencyMenuStatus, setCurrencyMenuStatus] = useState(false)
  const currencyTheme = useSelector(state => state.currencyStyleReducer)
    .colorStyle
  const navbarState = useSelector(state => state.IFrameVisibilityReducer)
    .full_screen
  const currentScreenTheme = useSelector(state => state.themeModeReducer)
    .screenTheme
  const dispatch = useDispatch()
  const currencyThemeContainerRef = useRef()
  const currencyMenuFade = useSpring({
    opacity: currencyMenuStatus ? 1 : 0,
    delay: currencyMenuStatus ? 400 : 0
  })

  const isAuthenticated = useSelector(state => state.navAuthReducer).isNavAuth


  const NavbarOpacityAnimationRef = useRef()
  const setNavbarOpacity = useSpring({
    opacity: !navbarState ? 1 : 0,
    // delay: navbarState ? 400 : 0,
    config: {
      duration: 400
    }
  })

  const NavbarPositionAnimationRef = useRef()
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

  // useChain([setNavbarOpacity, setNavbarAbsolutePosition])

  const toggleBackground = () => {
    // const updatedBackgroundState = backgroundState === "light" ? "dark" : "light";
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
      <MainNavbarFlexWrapper>
        <MainDesktopContainer>
          <div className='logo-container'>
            <NavLink exact to='/'>
              <img src={Logo} alt="crowdclick logo" />
            </NavLink>
          </div>

          {isAuthenticated ? <NavbarAuthElements /> : <NavbarNotAuthElements />}

          <AuthSecondDivGroup>
           
              <BackgroundThemeButton
                onClick={toggleBackground}
                bgtheme={currentScreenTheme}
              >
                <div className='sunContainer'>
                  <Sun className='sun' />
                </div>
                <div className='moonContainer'>
                  <Moon className='moon' />
                </div>
              </BackgroundThemeButton>

            <div>
              {isAuthenticated ? (
                <AccountDropdown />
              ) : (
                <MetamaskButton btnColor={'green'} btnWidth={140} />
              )}
            </div>

            <>
              <CurrencyMenuParentWrapper ref={currencyThemeContainerRef}>
                <div className='currencyMenuContainer'>
                  {currencyTheme === 'ethereumStyle' ? (
                    <FaEthereum color={'#206DFF'} size={30} />
                  ) : (
                    <img src={aeternity_currency_menu_logo} alt="selected cryptocurrency logo" />
                  )}
                  <MdKeyboardArrowDown
                    size={25}
                    className='navbarCurrencyDropdownArrow'
                    onClick={handleCurrency}
                  />
                </div>

                <animated.div style={currencyMenuFade}>
                  <CurrencyOptionsDropdownLayout
                    isVisible={currencyMenuStatus}
                  >
                    <p
                      className='currencyChoice'
                      onClick={() => dispatch(ethereumStyleAction)}
                    >
                      ETH
                    </p>
                    <p
                      className='currencyChoice'
                      onClick={() => dispatch(aeternityStyleAction())}
                    >
                      AE
                    </p>
                  </CurrencyOptionsDropdownLayout>
                </animated.div>
              </CurrencyMenuParentWrapper>
            </>
          </AuthSecondDivGroup>
        </MainDesktopContainer>
      </MainNavbarFlexWrapper>
    </animated.div>
  )
}
