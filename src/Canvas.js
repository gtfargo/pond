import React, { Suspense, useRef } from 'react'
import { Canvas, Dom } from 'react-three-fiber'
import { Model2 } from './Model'

function getMousePos(e) {
  return { x: e.clientX, y: e.clientY }
}

export default function App() {
  const mouse = useRef({ x: 0, y: 0 })

  return (
    <Canvas
      onMouseMove={(e) => (mouse.current = getMousePos(e))}
      shadowMap
      camera={{ position: [0, 0, 12], fov: 50, near: 7, far: 15 }}
    >
      <fog attach='fog' args={['white', 0, 20]} />
      {/* <ambientLight intensity={3} /> */}
      <pointLight position={[0, 50, 20]} intensity={2} />
      <Suspense
        fallback={
          <Dom center className='loader'>
            LOADING
          </Dom>
        }
      >
        {/* <Model position={[0, -6, 0]} rotation={[0, -0.2, 0]} /> */}
        <Model2 position={[0, 0, 0]} rotation={[0, 0, 0]} />
      </Suspense>
    </Canvas>
  )
}
