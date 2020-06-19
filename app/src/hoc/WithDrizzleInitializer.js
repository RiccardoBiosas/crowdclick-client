import React from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
// import { Drizzle } from "@drizzle/store";
// import drizzleOptions from "../drizzleOptions";


export const WithDrizzleInitializer = (ComposedComponent) => {
    return(
            <DrizzleContext.Consumer>
                {drizzleContext => {
                    const {drizzle, drizzleState, initialized} = drizzleContext


                    if(!initialized) {
                        return 'Loading FROM HOC...'
                    }

                    return <ComposedComponent drizzle={drizzle} drizzleState={drizzleState} />
                    
                }}
            </DrizzleContext.Consumer>
    )

}
