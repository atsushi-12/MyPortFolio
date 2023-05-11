import * as THREE from "three";
import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Reflector,
  Text,
  useTexture,
  useGLTF,
  useVideoTexture,
  useAspect,
} from "@react-three/drei";
import { unmountComponentAtNode } from "react-dom";
export default function Test() {
  const canvasRef = useRef(null);

  useEffect(() => {
    return () => {
      // ページ遷移時にcanvasコンポーネントをアンマウントする
    };
  }, []);
  return (
    <>
      <color attach="background" args={["black"]} />
      <fog attach="fog" args={["black", 13, 25]} />
      <Suspense fallback={null}>
        <group position={[2, -2, -2]}>
          <Scene />
          <Ground />
        </group>
        <ambientLight intensity={1} color={"white"} />
        <spotLight position={[-4, 10, -4]} intensity={20} color={"orange"} />
        <directionalLight position={[0, 6, 0]} intensity={7} color={"blue"} />
        <Intro />
      </Suspense>
    </>
  );
}

function Scene() {
  return (
    <mesh>
      <Suspense fallback={<FallbackMaterial url="welcome.svg" />}>
        <VideoMaterial url="bf1.mp4" />
        <VideoMaterial2 url="bf1.mp4" />
      </Suspense>
    </mesh>
  );
}

function VideoMaterial({ url }) {
  const texture = useVideoTexture(url);
  const text = "drei";
  return (
    <group>
      <Text
        font="/DidactGothic-Regular.woff"
        fontSize={4}
        position={[0, 1.7, 0]}
        materialProps={{ fontWeight: "bold" }}
        letterSpacing={-0.07}
      >
        {text}
        <meshBasicMaterial toneMapped={false} map={texture} brightness={100} />
      </Text>
    </group>
  );
}

function VideoMaterial2({ url }) {
  const texture = useVideoTexture(url);
  const text = "R3F";
  return (
    <group>
      <Text
        font="/DidactGothic-Regular.woff"
        fontSize={3}
        position={[-5, 1.7, -1.5]}
        rotation={[0, 0.5, 0]}
        materialProps={{ fontWeight: "bold" }}
        letterSpacing={-0.07}
      >
        {text}
        <meshBasicMaterial toneMapped={false} map={texture} brightness={100} />
      </Text>
    </group>
  );
}

function FallbackMaterial({ url }) {
  const texture = useTexture(url);
  return <meshBasicMaterial map={texture} toneMapped={false} />;
}
function Ground() {
  const [floor, normal, metalness] = useTexture([
    "/SurfaceImperfections003_1K_var1.jpg",
    "/SurfaceImperfections003_1K_Normal.jpg",
  ]);
  return (
    <Reflector
      blur={[400, 600]}
      resolution={1024}
      args={[30, 30]}
      mirror={0.9}
      mixBlur={1.5}
      mixStrength={2}
      rotation={[-Math.PI / 2, 0, Math.PI / 2]}
    >
      {(Material, props) => (
        <Material
          color="#666666"
          metalness={0.9}
          roughness={0.1}
          roughnessMap={floor}
          normalMap={normal}
          normalScale={[1, 1]}
          {...props}
        />
      )}
    </Reflector>
  );
}

function Intro() {
  const [vec] = useState(() => new THREE.Vector3());
  return useFrame((state) => {
    state.camera.position.lerp(
      vec.set(state.mouse.x * -5, 3 + state.mouse.y * 2, 14),
      0.05
    );
    state.camera.lookAt(0, 0, 0);
  });
}
