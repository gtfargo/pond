import React, { useRef } from 'react'
import { useFrame, useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { Box3, Matrix4 } from 'three'
import lerp from 'lerp'

export function Model2(props) {
  const group = useRef()
  const mesh = useRef()
  const { scene, materials, nodes } = useLoader(
    GLTFLoader,
    '/Mug.glb',
    (loader) => {
      const dracoLoader = new DRACOLoader()
      dracoLoader.setDecoderPath('/draco-gltf/')
      loader.setDRACOLoader(dracoLoader)
    }
  )

  nodes['node-0'].geometry.center()

  useFrame(() => {
    group.current.rotation.z += 0.01
    group.current.rotation.x += 0.01
  })

  nodes['node-0'].geometry.computeVertexNormals() //<-- this
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
            roughness={0.9}
            metalness={0.9}
            color='#ffffff'
          />
        </mesh>
        {/* <Lights /> */}
      </group>
    </group>
  )
}
