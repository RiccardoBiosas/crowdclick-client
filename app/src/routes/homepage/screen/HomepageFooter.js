import React, { forwardRef } from "react";
import { FaMedium, FaGithub, FaTelegram } from "react-icons/fa";
import Logo from "../../../assets/images/Logo.svg";
// import GithubIssue from "../../../assets/images/github-issue.png";
import { StyledFooterLayout } from "../styles/HomepageFooterStyles";

export const HomepageFooter = forwardRef((props, ref) => {
  return (
    <StyledFooterLayout ref={ref}>
      <div className="logo-container">
        <img src={Logo}  alt="crowdclick-logo" />
      </div>

      <div className="logos-container">
        <span>
          <FaTelegram className="footerIcon" />
        </span>
        <a
          href="https://medium.com/crowdclick"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaMedium className="footerIcon" />
        </a>

        <a
          href="https://github.com/crowd-tools/CrowdClick"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="footerIcon" />
        </a>
      </div>
    </StyledFooterLayout>
  );
});
