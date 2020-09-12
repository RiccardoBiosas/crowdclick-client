import React, { useState } from 'react'
import {Spring} from 'react-spring/renderprops'

const HomepageCardSwipe = ({ setFlipped, flipped, cardsSteps }) => {
  const [step, setStep] = useState(0)
  console.log('current step is --- ', step)

  return (
    <>
      <div>
        {cardsSteps.data.map((x, i) => (
          <Spring
            from={{
              left: step <= i ? '0%' : '80%',
              opacity: step <= i ? 1 : 0,
              position: 'relative',
              width: '100%'
            }}
            to={{
              width: '0%',
              left: step > i ? '120%' : '0%',
              height: '0%',
              opacity: step > i ? 0 : 1
            }}
            config={{ duration: 800 }}
          >
            {props => (     
              <img
                src={cardsSteps.data[i].src}
                key={`card_${cardsSteps.item}_${i}`}
                style={{
                  ...props,
                  position: 'absolute',
                  width: '200px',
                  height: '200px',
                  transform: `rotate(${24 - i * 6}deg)`,
                  marginLeft: `${44 - i * 14}px`, 
                  zIndex: `${cardsSteps.data.length - i}`
                }}
              />
            )}
          </Spring>
        ))}
      </div>
      <div>
        <div>{cardsSteps.data[step].content}</div>
        {step < cardsSteps.data.length - 1 ? (
          <button onClick={() => setStep(step + 1)}>next</button>
        ) : (
          <button
            onClick={() => {
              setStep(0)
              setFlipped(!flipped)
            }}
          >
            flip it back
          </button>
        )}
      </div>
    </>
  )
}

export default HomepageCardSwipe