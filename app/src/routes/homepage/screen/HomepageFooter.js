import React, { forwardRef } from "react";
import { FaMedium, FaGithub, FaTelegram } from "react-icons/fa";
import Logo from "../../../assets/images/Logo.svg";
// import GithubIssue from "../../../assets/images/github-issue.png";
import { FooterLayout } from "../styles/HomepageFooterStyles";

export const HomepageFooter = forwardRef((props, ref) => {


    return (

        <FooterLayout ref={ref}>
           
                <img src={Logo} className="footerLogo" alt="crowdclick footer logo" />
          
            <div>
                
                           
               
                    <FaTelegram  className="footerIcon" />                
                    <a href="https://medium.com/crowdclick" target="_blank" rel="noopener noreferrer"><FaMedium className="footerIcon" /></a>
            
                    {/* <a href="https://github.com/CrowdClick" target="_blank" rel="noopener noreferrer"><img src={GithubIssue} className="githubIssue" /></a> */}
                    <a href="https://github.com/CrowdClick" target="_blank" rel="noopener noreferrer"><FaGithub className="footerIcon" /></a>



            </div>
        </FooterLayout>


    )
}); 