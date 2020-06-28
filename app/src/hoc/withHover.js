import React, {useState} from 'react'


export const WithHover = (ComposedComponent) => {
    const [hoverState, setHoverState] = useState(false)
    
    const mouseOver = () => {
        setHoverState(true)
    }
    const mouseOut = () => {
        setHoverState(false)
    }

    return(
        <div onMouseOver={mouseOver} onMouseOut={mouseOut}>
            <ComposedComponent hoverState={hoverState} />
        </div>
    )

    
}