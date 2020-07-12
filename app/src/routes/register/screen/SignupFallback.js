import React, { useState } from "react";
import { Redirect, useHistory, useLocation } from "react-router";
import { ReactComponent as Placeholder } from "../../../assets/Iframe/ETH-Reward.svg";
import MetamaskButton from "../../../shared/components/metamask/MetamaskButton";
import {
  USER_TASKS_LIST_ROUTE,
  PUBLISHER_WIZARD_ROUTE,
  HOME_ROUTE,
} from "../../../config/routes-config";
import StyledGeneralCardLayout from "../../../shared/styles/StyledGeneralCardLayout";
import StyledGeneralCardWrapper from "../../../shared/styles/StyledGeneralCardWrapper";

export const SignupFallback = () => {
  const [redirect, setRedirect] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const login = () => {
    setRedirect(true);
  };
  return (
    <>
      <StyledGeneralCardLayout>
        <div>
          <h1>Click. Answer. Earn.</h1>
        </div>
        <StyledGeneralCardWrapper>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <div>
              <button
                style={{
                  paddingRight: "20px",
                  paddingTop: "14px",
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
                onClick={() => history.push("/#")}
              >
                x
              </button>
            </div>
          </div>
          <div>
            <h2>Connect with Metamask</h2>
          </div>
          <div>
            <Placeholder />
          </div>

          <div>
            <MetamaskButton
              btnColor={"orange"}
              btnWidth={240}
              cb_login={login}
              btnText={"connect to metamask"}
            />

            <p>
              You can download metamask
              <a
                href="https://metamask.io/"
                rel="noopener noreferrer"
                target="_blank"
                style={{ paddingLeft: "6px" }}
              >
                here
              </a>
            </p>
          </div>

          <p>Step 1 of 2</p>
        </StyledGeneralCardWrapper>
      </StyledGeneralCardLayout>
      {redirect && (
        <Redirect
          to={
            location.state
              ? location.state.next_redirect === "publisher"
                ? PUBLISHER_WIZARD_ROUTE
                : USER_TASKS_LIST_ROUTE
              : HOME_ROUTE
          }
        />
      )}
    </>
  );
};
