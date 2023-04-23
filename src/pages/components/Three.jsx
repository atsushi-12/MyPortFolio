import React, { Suspense, useEffect, useState } from "react";
import { Canvas, useFrame,extend } from "@react-three/fiber";
import { Reflector, Text, useTexture, useGLTF,MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from "three";
import { Stats } from '@react-three/drei'

export default function Three() {
  return (
    <Canvas style={{width:"100vw",height:"100vh"}}  concurrent gl={{ alpha: false }} pixelRatio={[1, 1.5]} camera={{ position: [0, 10, -10], fov: 40}}>
    <color attach="background" args={['black']} />
      <fog attach="fog" args={['black', 1, 17]} />
      <ambientLight intensity={0.5} />
        <spotLight position={[0, 10, 0]} intensity={0.3} />
        <directionalLight position={[-50, 0, -40]} intensity={0.7} />
        <group position={[0, -2, 0]}>
          <VideoText position={[0, 1.0, 0]} />
          <Ground  />
        </group>
<Intro/>
  </Canvas>
  );
}  


function VideoText(props) {
  const [video] = useState(() => Object.assign(document.createElement('video'), { src: '/bf1.mp4', crossOrigin: 'Anonymous', loop: true, muted: true }))
  useEffect(() => void video.play(), [video])
  return (
    <Text font="/Inter-Bold.woff" fontSize={3} letterSpacing={-0.06} {...props}>
      Portfolio
      <meshBasicMaterial toneMapped={false}>
        <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
      </meshBasicMaterial>
    </Text>
  )
}

function Ground() {
    const [floor, normal] = useTexture(['/', '/SurfaceImperfections003_1K_Normal.jpg'])
    return (
      <Reflector blur={[400, 100]} resolution={512} args={[10, 10]} mirror={0.5} mixBlur={6} mixStrength={1.5} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
        {(Material, props) => <Material color="#a0a0a0" metalness={0.2} roughnessMap={floor} normalMap={normal} normalScale={[2, 2]} {...props} />}
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