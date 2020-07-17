import React, { useRef } from 'react'
import { useFrame, useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

export function Model2(props) {
  const group = useRef()
  const mesh = useRef()
  const { nodes } = useLoader(GLTFLoader, '/mug.glb', (loader) => {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/draco-gltf/')
    loader.setDRACOLoader(dracoLoader)
  })

  nodes['node-0'].geometry.center() // get em in the middle

  useFrame((state, delta) => {
    const sine = Math.sin(state.clock.getElapsedTime())
    // Rotate
    group.current.rotation.y += delta / 2
    group.current.rotation.x += sine / 250
    // group.current.rotation.z += sine / 150
    // Lift up and down gently
    group.current.position.y = (0.3 + sine) * 0.4
    // The Shadows component returns its own api as a ref (a fn that sets the blur factor)
    // shadow.current((1.2 + sine) * 3.8)
  })

  nodes['node-0'].geometry.computeVertexNormals()

  return (
    <group {...props} dispose={null}>
      <group ref={group}>
        <mesh
          ref={mesh}
          rotation={[-90, 0, 0]}
          castShadow
          receiveShadow
          geometry={nodes['node-0'].geometry}
          scale={[0.025, 0.025, 0.025]}
        >
          <meshStandardMaterial
            attach='material'
            roughness={1}
            metalness={0.6}
            color='#ffffff'
          />
        </mesh>
      </group>
    </group>
  )
}
