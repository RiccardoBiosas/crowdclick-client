import React, { useState, useRef } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  StyledArrowLayout,
  StyledDropdownLayout,
  StyledDropdownButton,
} from "../../../styles/StyledDropdownLayout";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useHandleEventOutsideRef } from "../../../../hooks/useHandleEventOutsideRef";
import { navAuthFalseAction } from "../../../../redux/NavAuth/navAuthActions";
import {
  USER_TASKS_LIST_ROUTE,
  PUBLISHER_DASHBOARD_ROUTE,
  HOME_ROUTE,
  TUTORIAL_ROUTE,
} from "../../../../config/routes-config";
import crowdclickClient from "../../../../utils/api/crowdclick";

export const AccountDropdown = () => {
  const [dropdownStatus, setDropdownStatus] = useState(false);

  const dispatch = useDispatch();
  let history = useHistory();
  const dropdownContainerRef = useRef();

  useHandleEventOutsideRef(dropdownContainerRef, () =>
    setDropdownStatus(false)
  );

  const handleClick = async() => {
    await crowdclickClient.logout()
    window.localStorage.removeItem("userPubKey");
    dispatch(navAuthFalseAction);
    history.push(HOME_ROUTE);
  };

  return (
    <div style={{ position: "relative" }} ref={dropdownContainerRef}>
      <StyledDropdownButton
        size="medium"
        dropdownBtnPadding='0 0 0 8px'
        onClick={() => setDropdownStatus(!dropdownStatus)}
      >
        <p>ACCOUNT</p>
        <StyledArrowLayout>
          <MdKeyboardArrowDown size="28px" color="#206dff" className="arrow" />
        </StyledArrowLayout>
      </StyledDropdownButton>

      <StyledDropdownLayout
        size="medium"
        active={dropdownStatus}
        itemPadding="12px 0 8px 32px"
      >
        <li>
          <NavLink
            className="dropdown-item"
            to={TUTORIAL_ROUTE}
            activeStyle={{ color: "#206DFF", fontWeight: "900" }}
          >
            Tutorial
          </NavLink>
        </li>
        <li>
          <NavLink
            className="dropdown-item"
            to={USER_TASKS_LIST_ROUTE}
            activeStyle={{ color: "#206DFF", fontWeight: "900" }}
          >
            Tasks
          </NavLink>
        </li>
        <li>
          <NavLink
            className="dropdown-item"
            to={PUBLISHER_DASHBOARD_ROUTE}
            activeStyle={{ color: "#206DFF", fontWeight: "900" }}
          >
            Campaigns
          </NavLink>
        </li>
        <li className="dropdown-item" onClick={handleClick}>
          Logout
        </li>
      </StyledDropdownLayout>
    </div>
  );
};
