import React from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import NetworkFallback from "../routes/network-fallback";
// import { Drizzle } from "@drizzle/store";
// import drizzleOptions from "../drizzleOptions";

const withDrizzleInitializer = (ComposedComponent) => {

    return(
            <DrizzleContext.Consumer>
                {drizzleContext => {
                    const {drizzle, drizzleState, initialized} = drizzleContext 

                    if(!initialized) {
                        return <NetworkFallback />
                    }

                    return <ComposedComponent drizzle={drizzle} drizzleState={drizzleState} />
                    
                }}
            </DrizzleContext.Consumer>
    )

}

export default withDrizzleInitializer