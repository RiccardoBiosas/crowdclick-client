import React, { useState, useEffect, useRef } from "react";
import VizSensor from "react-visibility-sensor";
import { useSelector, useDispatch } from "react-redux";
import {
  ethereumStyleAction,
  aeternityStyleAction,
} from "../../../../redux/CurrencyStyle/currencyStyleActions";
import {ReactComponent as TelegramIcon} from "../../../../assets/mobileNavbar/telegram_small_icon.svg"
import { ReactComponent as Sun } from "../../../../assets/navbar/sun.svg";
import { ReactComponent as Moon } from "../../../../assets/navbar/moon.svg";
import {
  StyledBurger,
  StyledMenu,
  CustomizedMobileBackgroundThemeButton,
  StyledMobileNavbarLayout,
  StyledCurrencyOption,
} from "./styles/MobileNavbarStyles";
import {
  lightModeAction,
  darkModeAction,
} from "../../../../redux/ThemeMode/themeModeActions";
import StyledCircleButton from "../../../styles/StyledCircleButton";
import StyledAnchor from "../../../styles/StyledAnchor";


export const MobileNavbar = () => {
  const currentScreenTheme = useSelector((state) => state.themeModeReducer)
    .screenTheme;
  const [navbarState, setNavbarState] = useState(false);
  const mobileNavbarRef = useRef();
  const dispatch = useDispatch();

  const handleClick = () => {
    setNavbarState(!navbarState);
  };

  const toggleBackground = () => {
    const updatedScreenTheme =
      currentScreenTheme === "light" ? darkModeAction : lightModeAction;
    dispatch(updatedScreenTheme);
  };


  useEffect(() => {
    const listener = (event) => {
      if (
        !mobileNavbarRef.current ||
        mobileNavbarRef.current.contains(event.target)
      ) {
        return;
      }
      setNavbarState(false);
    };
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [mobileNavbarRef, navbarState]);

  const scrollToCoordinate = (x) => {
    window.scrollBy({ top: [x], behavior: "smooth" });
    setNavbarState(false);
  };

  return (
    <StyledMobileNavbarLayout ref={mobileNavbarRef}>
      <StyledBurger
        type="button"
        onClick={handleClick}
        ref={mobileNavbarRef}
        navbarState={navbarState}
      >
        <div />
        <div />
        <div />
      </StyledBurger>
      <CustomizedMobileBackgroundThemeButton
        onClick={toggleBackground}
        bgtheme={currentScreenTheme}
      >
        <div className="sunContainer">
          <Sun className="sun" />
        </div>
        <div className="moonContainer">
          <Moon className="moon" />
        </div>
      </CustomizedMobileBackgroundThemeButton>
      <VizSensor
        partialVisibility={true}
        onChange={(isVisible) => setNavbarState(false)}
      >
        {({ isVisible }) => (
          <StyledMenu navbarState={navbarState}>
            <div />            
            <div>
              <StyledAnchor
                anchorColor="white"
                anchorMargin="0 0 8px 0"
                href="https://medium.com/crowdclick"
                target="_blank"
                rel="noopener noreferrer"
              >
                blog
              </StyledAnchor>

              <StyledCircleButton
                type="button"
                onClick={() => scrollToCoordinate(1300)}
              >
                Launch on <TelegramIcon />
              </StyledCircleButton>
              <StyledCurrencyOption optionMargin="18px 0 0 0" onClick={() => {dispatch(ethereumStyleAction); setNavbarState(false)}}>
                <div />
                <p>ethereum</p>
              </StyledCurrencyOption>
              <StyledCurrencyOption onClick={() => {dispatch(aeternityStyleAction); setNavbarState(false)}}>
                <div />
                <p>AE</p>
              </StyledCurrencyOption>
            </div>
          </StyledMenu>
        )}
      </VizSensor>
    </StyledMobileNavbarLayout>
  );
};
