import * as THREE from 'three'
import React, { Suspense, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Reflector, Text, useTexture, useGLTF,useVideoTexture,useAspect } from '@react-three/drei'

export default function Test() {
  return (
    <Canvas style={{width:"100vw",height:"100vh"}}concurrent gl={{ alpha: false }} pixelRatio={[1, 1.5]} camera={{ position: [0, 3, 100], fov: 30 }}>
      <color attach="background" args={['black']} />
      <fog attach="fog" args={['black', 15, 20]} />
      <Suspense fallback={null}>
        <group position={[0, -1, 0]}>
          <Scene/>
          <Ground />
        </group>
        <ambientLight intensity={0.5} />
        <spotLight position={[0, 10, 0]} intensity={0.3} />
        <directionalLight position={[-50, 0, -40]} intensity={0.7} />
        <Intro />
      </Suspense>
    </Canvas>
  )
}



function Scene() {
  return (
    <mesh >
      <Suspense fallback={<FallbackMaterial url="welcome.svg" />}>
        <VideoMaterial url="bf1.mp4" />
      </Suspense>
    </mesh>
  )
}

function VideoMaterial({ url }) {
  const texture = useVideoTexture(url)
  const text =  "hello world!"
  return <Text   font={'/fonts/SomeFont.ttf'}
  fontSize={3}
  position={[0,2,0]}>
  {text}
  <meshBasicMaterial toneMapped={false} map={texture}>
    </meshBasicMaterial>
</Text>
}

function FallbackMaterial({ url }) {
  const texture = useTexture(url)
  return <meshBasicMaterial map={texture} toneMapped={false} />
}
function Ground() {
  const [floor, normal,metalness] = useTexture(['/Metal028_8K_Roughness.jpg', '/Metal028_8K_NormalGL.jpg','Metal028_8K_Metalness.jpg'])
  return (
    <Reflector blur={[400, 100]} resolution={2048} args={[10, 10]} mirror={0.5} mixBlur={6} mixStrength={1.5} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
      {(Material, props) => <Material color="#a0a0a0" metalness={0.8} metalnessMap={metalness}roughnessMap={floor} normalMap={normal} normalScale={[1, 1]} {...props} />}
    </Reflector>
  )
}

function Intro() {
  const [vec] = useState(() => new THREE.Vector3())
  return useFrame((state) => {
    state.camera.position.lerp(vec.set(state.mouse.x * 5, 3 + state.mouse.y * 2, 14), 0.05)
    state.camera.lookAt(0, 0, 0)
  })
}