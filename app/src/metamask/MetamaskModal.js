import React from "react"

export const MetamaskModal = ({handleModalCallback}) => {

    return(        
        <div style={{position: "absolute", top: "90px", left: "calc(50vw - 200px)", height:"140px", width: "400px", border: "3px solid black", color: "white", backgroundColor: "grey", display: "flex", flexDirection: "column", alignItems: "center"}}>
            <p style={{width: "90%"}}>
            "To be a user please <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">install</a> Metamask browser extension to continue. Our Web 3.0 application doesn’t collect any user data and is completely safe to protect your identity."
            </p>
            <button style={{width: "20%"}} onClick={handleModalCallback}>Ok</button>
        </div>
    )
}

