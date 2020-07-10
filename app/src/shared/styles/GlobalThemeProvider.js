import React, { Fragment } from 'react'
import { ThemeProvider } from 'styled-components'
import { useSelector } from 'react-redux'
import { GlobalStyles } from './GlobalStyles'

const theme = {
  light: {
    homepage: {
      background: '',
      cardsHeading: '',
      cardsParagraph: '#272833CC',
      cardsList: '#272833CC',
      copyrightFooterParagraph: '#272833CC',
    },
    desktopNavbar: {},
    publisherForm: {},
    global: {
      background: '#F3F6FE',
    },
  },
  dark: {
    homepage: {
      background: '#001628',
      cardsHeading: '#8B918C',
      cardsParagraph: 'white',
      cardsList: 'white',
      copyrightFooterParagraph: 'white',
    },
    desktopNavbar: {
      balanceParagraph: 'white',
    },
    publisherForm: {
      mainHeading: 'white',
    },
    global: {
      background: '#001628',
    },
  },
}

const Theme = ({ children }) => {
  const currentTheme = useSelector((state) => state.themeModeReducer)
    .screenTheme
  return (
    <Fragment>
      <ThemeProvider theme={theme[currentTheme]}>{children}</ThemeProvider>
      <GlobalStyles theme={theme[currentTheme]} />
    </Fragment>
  )
}

export default Theme
