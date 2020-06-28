import React, { useState, useRef } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  ArrowLayout,
  DropdownLayout,
  DropdownButton,
} from "../../../styles/DropdownLayout";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useHandleEventOutsideRef } from "../../../../hooks/useHandleEventOutsideRef";
import axios from "axios";
import { AUTH_LOGOUT_ENDPOINT } from "../../../../config/api-config";

import { navAuthFalseAction } from "../../../../redux/NavAuth/navAuthActions";
import {
  USER_TASKS_LIST_ROUTE,
  PUBLISHER_DASHBOARD_ROUTE,
  HOME_ROUTE,
} from "../../../../config/routes-config";

axios.defaults.withCredentials = true;

export const AccountDropdown = () => {
  const [dropdownStatus, setDropdownStatus] = useState(false);

  const dispatch = useDispatch();
  let history = useHistory();
  const dropdownContainerRef = useRef();

  useHandleEventOutsideRef(dropdownContainerRef, () =>
    setDropdownStatus(false)
  );

  const handleClick = () => {
    const logout = async () => {
      await axios.get(AUTH_LOGOUT_ENDPOINT);
    };
    logout();
    window.localStorage.removeItem("userPubKey");
    dispatch(navAuthFalseAction);
    history.push(HOME_ROUTE);
  };

  return (
    <div style={{ position: "relative" }} ref={dropdownContainerRef}>
      <DropdownButton
        size="medium"
        dropdownBtnPadding='0 0 0 8px'
        onClick={() => setDropdownStatus(!dropdownStatus)}
      >
        <p>ACCOUNT</p>
        <ArrowLayout>
          <MdKeyboardArrowDown size="28px" color="#206dff" className="arrow" />
        </ArrowLayout>
      </DropdownButton>

      <DropdownLayout
        size="medium"
        active={dropdownStatus}
        itemPadding="12px 0 8px 32px"
      >
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
      </DropdownLayout>
    </div>
  );
};
