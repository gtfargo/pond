import { render } from 'react-dom'
import React, { Suspense, lazy, useState } from 'react'
import { Logo } from './Logo'
import { Clock } from './Clock'
import './styles.css'

// Create a lazy-loaded split bundle for the canvas
const Canvas = lazy(() => import('./Canvas'))

render(
  <>
    {/* <div class='header'>
      <a href='https://goo.gl/maps/e9HxC5bFLx7sbAps9'>
        <h1 class='doink'>2700 Chartres St. New Orleans LA 70117</h1>
      </a>
    </div> */}
    <Suspense fallback={null}>
      <Canvas />
    </Suspense>
    <img alt='POND Coffee logomark' className='logo' src={`/svg/7.svg`} />
    <div className='overlay'>
      <div className='info'>
        <div className='top'>
          <div />
          <Clock />
        </div>
        <div className='bottom'>
          <h2>
            wanna chat? <br />
            hit us up <a href='https://instagram.com/pondcoffee'>@pondcoffee</a>
          </h2>
        </div>
      </div>
    </div>
  </>,
  document.getElementById('root')
)
