import React, { useState, useEffect, useRef } from 'react'
import VizSensor from 'react-visibility-sensor'
import { IoMdMenu, IoMdCloseCircleOutline } from 'react-icons/io'
import { FaTelegramPlane, FaEthereum } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import {
  ethereumStyleAction,
  aeternityStyleAction
} from '../../../../redux/CurrencyStyle/currencyStyleActions'
import aeternity_currency_menu_logo from '../../../../assets/images/aeternity_currency_menu_logo.png'
import { ReactComponent as Sun } from '../../../../assets/navbar/sun.svg'
import { ReactComponent as Moon } from '../../../../assets/navbar/moon.svg'
import {
  StyledBurger,
  StyledMenu,
  CustomizedMobileBackgroundThemeButton
} from './styles/MobileNavbarStyles'
import { lightModeAction, darkModeAction } from '../../../../redux/ThemeMode/themeModeActions'

const backgroundStyle = {
  light: 'white',
  dark: 'black'
}

export const MobileNavbar = () => {
  const currentScreenTheme = useSelector(state => state.themeModeReducer).screenTheme
  const [navbarState, setNavbarState] = useState(false)  
  const [dropdownState, setDropdownState] = useState({
    currency: false,
    background: false
  })
  const mobileNavbarRef = useRef()
  const dispatch = useDispatch()

  const handleClick = () => {
    setNavbarState(!navbarState)
  }

  const toggleBackground = () => {
    const updatedScreenTheme =
      currentScreenTheme === 'light' ? darkModeAction : lightModeAction
      dispatch(updatedScreenTheme)
   
  }

  const handleSelectClick = e => {
    if (e.target.textContent === 'Currency theme') {
      setDropdownState({ ...dropdownState, currency: !dropdownState.currency })
    }
  }

  useEffect(() => {
    const listener = event => {
      if (
        !mobileNavbarRef.current ||
        mobileNavbarRef.current.contains(event.target)
      ) {
        return
      }
      setNavbarState(false)
    }
    document.addEventListener('mousedown', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
    }
  }, [mobileNavbarRef, navbarState])

  const scrollToCoordinate = x => {
    window.scrollBy({ top: [x], behavior: 'smooth' })
    setNavbarState(false)
  }

  return (
    <div ref={mobileNavbarRef}>
      <StyledBurger onClick={handleClick} ref={mobileNavbarRef}>
        <IoMdMenu size={50} />
      </StyledBurger>
      <VizSensor
        partialVisibility={true}
        onChange={isVisible => 
          setNavbarState(false)
        }
      >
        {({ isVisible }) => (
          <StyledMenu navbarState={navbarState}>
            <CustomizedMobileBackgroundThemeButton  onClick={toggleBackground} bgtheme={currentScreenTheme}>
              {/* <button onClick={toggleBackground} bgtheme={currentScreenTheme}> */}
                <div className='sunContainer'>
                  <Sun className='sun' />
                </div>
                <div className='moonContainer'>
                  <Moon className='moon' />
                </div>
              {/* </button> */}
            </CustomizedMobileBackgroundThemeButton>
            <p onClick={() => scrollToCoordinate(800)}>How it works</p>
            <a
              href='https://medium.com/crowdclick'
              target='_blank'
              rel='noopener noreferrer'
            >
              Blog
            </a>
            <p onClick={() => scrollToCoordinate(1300)}>
              Launch on <FaTelegramPlane size={24} color={'blue'} />
            </p>
            <div style={{ height: '120px' }}>
              <p onClick={handleSelectClick}>Currency theme</p>
              {dropdownState.currency && (
                <div
                  style={{ display: 'flex', justifyContent: 'space-around' }}
                >
                  <FaEthereum
                    size={24}
                    color={'blue'}
                    onClick={() => {
                      setNavbarState(false)
                      dispatch(ethereumStyleAction)
                    }}
                    style={{ cursor: 'pointer' }}
                  />

                  <img
                    src={aeternity_currency_menu_logo}
                    alt="aeteternity logo"
                    onClick={() => {
                      setNavbarState(false)
                      dispatch(aeternityStyleAction())
                    }}
                    style={{ cursor: 'pointer', width: '24px' }}
                  />
                </div>
              )}
            </div>
          </StyledMenu>
        )}
      </VizSensor>
    </div>
  )
}
