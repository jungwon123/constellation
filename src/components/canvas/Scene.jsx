import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Constellation } from "./Constellation";
import { Stars } from "./backGroundStars";

export function Scene() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        camera={{
          position: [0, 0, 10],
          fov: 100,
        }}
      >
        {/* 기본 조명 설정 */}
        <ambientLight intensity={0.1} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} />

        {/* 배경 별들 */}
        <Stars />

        {/* 별자리 */}
        <Constellation />

        {/* 카메라 컨트롤 */}
        <OrbitControls />
      </Canvas>
    </div>
  );
}
