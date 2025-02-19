import { Sphere, Html } from "@react-three/drei";

export function Star({
  position,
  index,
  texture,
  imageUrl,
  isSelected,
  onSelect,
  onImageUpload,
}) {
  const handleClick = (e) => {
    e.stopPropagation();
    console.log("별 클릭됨:", index); // 디버깅용 로그
    onSelect(index);
  };

  return (
    <group>
      {texture ? (
        <sprite
          position={position}
          scale={[0.2, 0.2, 0.2]}
          onClick={handleClick}
          // 마우스 상호작용을 위한 속성 추가
          onPointerOver={(e) => {
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={(e) => {
            document.body.style.cursor = "auto";
          }}
        >
          <spriteMaterial map={texture} />
        </sprite>
      ) : (
        <Sphere
          position={position}
          args={[0.05, 16, 16]}
          onClick={handleClick}
          // 마우스 상호작용을 위한 속성 추가
          onPointerOver={(e) => {
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={(e) => {
            document.body.style.cursor = "auto";
          }}
        >
          <meshStandardMaterial color="white" />
        </Sphere>
      )}

      {isSelected &&
        imageUrl && ( // texture 대신 imageUrl 체크
          <Html position={[position[0], position[1] + 0.3, position[2]]}>
            <div
              style={{
                background: "white",
                padding: "10px",
                borderRadius: "5px",
                width: "200px",
                height: "200px",
              }}
            >
              <img
                src={imageUrl}
                alt={`Star ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </Html>
        )}

      <Html position={[position[0], position[1] - 0.1, position[2]]}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              onImageUpload(e.target.files[0], index);
            }
          }}
        />
      </Html>
    </group>
  );
}

// import { Sphere, Html } from "@react-three/drei";

// export function Star({
//   position,
//   index,
//   texture,
//   imageUrl,
//   isSelected,
//   onSelect,
//   onImageUpload,
// }) {
//   const handleClick = (e) => {
//     e.stopPropagation();
//     console.log("별 클릭됨:", index);
//     onSelect(index);
//   };

//   const renderStar = () => {
//     if (texture) {
//       return (
//         <sprite
//           position={position}
//           scale={[0.2, 0.2, 0.2]}
//           onClick={handleClick}
//           onPointerOver={() => (document.body.style.cursor = "pointer")}
//           onPointerOut={() => (document.body.style.cursor = "auto")}
//         >
//           <spriteMaterial map={texture} />
//         </sprite>
//       );
//     }

//     return (
//       <Sphere
//         position={position}
//         args={[0.05, 16, 16]}
//         onClick={handleClick}
//         onPointerOver={() => (document.body.style.cursor = "pointer")}
//         onPointerOut={() => (document.body.style.cursor = "auto")}
//       >
//         <meshStandardMaterial color="white" />
//       </Sphere>
//     );
//   };

//   const renderImage = () => {
//     if (!isSelected || !imageUrl) return null;

//     return (
//       <Html position={[position[0], position[1] + 0.3, position[2]]}>
//         <div
//           style={{
//             background: "white",
//             padding: "10px",
//             borderRadius: "5px",
//             width: "200px",
//             height: "200px",
//           }}
//         >
//           <img
//             src={imageUrl}
//             alt={`Star ${index + 1}`}
//             style={{
//               width: "100%",
//               height: "100%",
//               objectFit: "cover",
//             }}
//           />
//         </div>
//       </Html>
//     );
//   };

//   const renderFileUploader = () => {
//     if (!isSelected) return null;

//     return (
//       <Html position={[position[0], position[1] - 0.1, position[2]]}>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => {
//             if (e.target.files?.[0]) {
//               onImageUpload(e.target.files[0], index);
//             }
//           }}
//         />
//       </Html>
//     );
//   };

//   return (
//     <group>
//       {renderStar()}
//       {renderImage()}
//       {renderFileUploader()}
//     </group>
//   );
// }
