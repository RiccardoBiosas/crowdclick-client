import React from "react";
import {Link} from "react-router-dom"
import {ReactComponent as SVG404mainPic} from "../../assets/404/404-img.svg"

export const NotFound = () => {

    return(
        <div style={{height: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <SVG404mainPic />
            <h2>Page Not Found!</h2>
            <p><Link to="/">Take me back</Link></p>

        </div>
    )
}