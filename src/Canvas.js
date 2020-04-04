import React, { Suspense } from 'react'
import { Canvas, Dom } from 'react-three-fiber'
import Model, { Model2 } from './Model'

export default function App() {
  return (
    <Canvas
      shadowMap
      camera={{ position: [0, 0, 12], fov: 50, near: 7, far: 15 }}
    >
      <fog attach='fog' args={['white', 0, 20]} />
      <pointLight position={[0, 10, 10]} intensity={3} />
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
