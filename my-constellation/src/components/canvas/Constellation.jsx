import { Line, Sphere } from "@react-three/drei";

export function Constellation() {
  // 북두칠성의 예시 좌표
  const stars = [
    [-0.5, 0.5, 0],
    [0, 0.3, 0],
    [0.3, 0.2, 0],
    [0.5, 0, 0],
    [0.4, -0.3, 0],
    [0.1, -0.5, 0],
    [-0.2, -0.4, 0],
  ];

  return (
    <group>
      {/* 별들 */}
      {stars.map((position, index) => (
        <Sphere key={index} position={position} args={[0.02, 16, 16]}>
          <meshStandardMaterial color="white" />
        </Sphere>
      ))}

      {/* 별자리 선 */}
      <Line
        points={stars}
        color="white"
        lineWidth={1}
        opacity={0.5}
        transparent
      />
    </group>
  );
}
