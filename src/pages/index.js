import Opening from "./components/Opening";
import Menu from "./components/Menu";
import Test from "./components/Test";
import { unmountComponentAtNode } from "react-dom";
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

export default function Home() {
  return (
    <>
      <Opening />
      <Menu />
      <Canvas
        style={{ width: "100vw", height: "100vh" }}
        concurrent
        gl={{ alpha: false }}
        pixelRatio={[1, 1.5]}
        camera={{ position: [0, 3, 100], fov: 20 }}
      >
        <Test />
      </Canvas>
    </>
  );
}
