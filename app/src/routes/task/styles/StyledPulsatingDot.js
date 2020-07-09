import styled, { keyframes, css } from 'styled-components'

const pulsate = keyframes`
    0% {
        scale: 0.1, 0.1;
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        transform: scale(1.2, 1.2);
        opacity: 0;
    }    
`

const animation = props => css`${pulsate} 1s infinite ease-out;`

const StyledPulsatingDot = styled.div`
    position: relative;

    & > div {
        position: absolute;
        border: 3px solid #2FB45A;
        border-radius: 30px;
        height: 42px;
        width: 42px;
        right: 28px
        top: 28px;
        animation: ${animation}
        opacity: 0
        
    }

    & > button {
        position: absolute;
        width: 28px;
        height: 28px;
        top: 34.6px;
        right: 34.6px;
        background-color: #2FB45A;
        border-radius: 50%;
        padding: 0;
        border: none;
        cursor: pointer;
    }
`

export default StyledPulsatingDot
