import { Scene } from "./components/canvas/Scene";

// 또는 Canvas를 포함하는 최상위 컴포넌트
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { Constellation } from "./components/canvas/Constellation";

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Scene />

      <Canvas camera={{ position: [0, 0, 5] }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <Constellation />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
}
