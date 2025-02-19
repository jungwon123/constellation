import { Line } from "@react-three/drei";
import { Star } from "./Star";
import { useConstellation } from "../../hooks/useConstellation";

export function Constellation() {
  const {
    imageUrls,
    loadedTextures,
    selectedStar,
    setSelectedStar,
    handleImageUpload,
  } = useConstellation();

  const stars = [
    [-1.5, -0.5, 0], // 북두칠성 시작점
    [-0.8, -0.4, 0], // 두 번째 별
    [-0.2, -0.2, 0], // 세 번째 별
    [0.2, -0.3, 0], // 네 번째 별
    [0.5, 0.1, 0], // 다섯 번째 별
    [0.2, 0.5, 0], // 여섯 번째 별
    [-0.2, 0.7, 0], // 일곱 번째 별
  ];

  return (
    <group>
      {stars.map((position, index) => (
        <Star
          key={index}
          position={position}
          index={index}
          texture={loadedTextures[index]}
          imageUrl={imageUrls[index]}
          isSelected={selectedStar === index}
          onSelect={(index) =>
            setSelectedStar(selectedStar === index ? null : index)
          }
          onImageUpload={handleImageUpload}
        />
      ))}

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
