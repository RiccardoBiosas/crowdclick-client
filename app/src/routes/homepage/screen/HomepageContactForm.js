import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  StyledContactFormLayout,
  StyledContactHeading,
  StyledInputFormWrapper,
  StyledSpinnerWrapper,
  StyledContactFormWrapper,
} from "../styles/HomepageContactFormStyles";
import Stay_in_the_loop from "../../../assets/homepage/img4.svg";
import aeternity_stay_in_the_loop from "../../../assets/images/aeternity_stay_in_the_loop.svg";
import  StyledCheckmark  from "../../../shared/styles/StyledCheckmark";
import { ReactComponent as SvgSuccess } from "../../../assets/SVG/Success.svg";
import { ReactComponent as SvgFailure } from "../../../assets/SVG/Failure.svg";
import { SUBSCRIBE_ENDPOINT } from "../../../config/api-config";
import { StyledCenteredColumn } from "../styles/HomepageStyles";

const HomepageContactForm = ({ currencyTheme }) => {
  const [userInput, setUserInput] = useState("");
  // const [userEmail, setUserEmail] = useState("");
  const [respStatus, setRespStatus] = useState(null);

  const handleChange = (e) => {
    const text = e.target.value;
    setUserInput(text);
  };

  const forwardEmail = async (email) => {
    try {      
      const response = await axios.post(SUBSCRIBE_ENDPOINT, {
        email,
      });
      setRespStatus(response.status);
    } catch (err) {
      setRespStatus((err.response && err.response.status) || 503);
      console.error(err);
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    await forwardEmail()    
    setUserInput("");
  };

  useEffect(() => {
    if (respStatus) {     

      setTimeout(() => {setRespStatus(null); }, 1200)
    }
  }, [respStatus]);

  return (
    <StyledContactFormLayout currencyTheme={currencyTheme}>
      <StyledContactFormWrapper>
        <div className="logo-wrapper">
          <img
            src={
              currencyTheme === "ethereumStyle"
                ? Stay_in_the_loop
                : aeternity_stay_in_the_loop
            }
            alt="cryptocurrency-theme"
          />
        </div>

        <StyledCenteredColumn>
          <StyledContactHeading>
            <h3>Launch Coming Soon…</h3>
          </StyledContactHeading>

          <StyledSpinnerWrapper>
            {respStatus && (
              <StyledCheckmark type={"block"}>
                {respStatus === 201 ? <SvgSuccess /> : <SvgFailure />}
              </StyledCheckmark>
            )}
          </StyledSpinnerWrapper>

          <StyledInputFormWrapper currencyTheme={currencyTheme} svgAnimation={respStatus ? "fadeIn" : null}>
            <form onSubmit={handleSubmit}>
              <label htmlFor="subscribeForm">
                Get notified about the launch & updates
              </label>

              <div>
                <input
                  id="subscribeForm"
                  type="text"
                  placeholder="Your email"
                  onChange={handleChange}
                  value={userInput}
                  autoComplete="off"
                />

                <input type="submit" value="Get Started" />
              </div>
            </form>
            <div>
              {respStatus && (
                <div className="desktop-svgWrapper">
                  <StyledCheckmark type={"inline"}>
                    {respStatus && respStatus === 201 ? (
                      <SvgSuccess />
                    ) : (
                      <SvgFailure />
                    )}
                  </StyledCheckmark>
                </div>
              )}
            </div>
          </StyledInputFormWrapper>
        </StyledCenteredColumn>
      </StyledContactFormWrapper>
    </StyledContactFormLayout>
  );
};

export default HomepageContactForm;