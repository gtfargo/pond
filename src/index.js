import { render } from 'react-dom'
import React, { Suspense, lazy } from 'react'
import { Logo } from './Logo'
import { Clock } from './Clock'
import { OpenOrClosed } from './OpenOrClosed'
import './styles.css'

// Create a lazy-loaded split bundle for the canvas
const Canvas = lazy(() => import('./Canvas'))

render(
  <>
    <Suspense fallback={null}>
      <Canvas />
    </Suspense>
    <Logo />
    <div className='overlay'>
      <div className='info'>
        <div className='top'>
          <OpenOrClosed />
          <Clock />
        </div>
        <div className='bottom'>
          <h2>
            wanna chat? <br />
            hit us up <a href='https://instagram.com/pondcoffee'>@pondcoffee</a>
          </h2>
          <h2>
            our spot: <br />
            <a href='https://goo.gl/maps/e9HxC5bFLx7sbAps9'>small mart</a>
          </h2>
        </div>
      </div>
    </div>
  </>,
  document.getElementById('root')
)
