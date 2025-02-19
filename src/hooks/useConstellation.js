import { useState, useEffect } from "react";
import { storage, db } from "../firebase/firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { TextureLoader } from "three";

export function useConstellation() {
  const [imageUrls, setImageUrls] = useState(Array(7).fill(null));
  const [loadedTextures, setLoadedTextures] = useState(Array(7).fill(null));
  const [selectedStar, setSelectedStar] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  // 이미지 로드 로직
  useEffect(() => {
    const loadImages = async () => {
      try {
        const constellationRef = doc(db, "constellations", "userConstellation");
        const docSnap = await getDoc(constellationRef);
        if (docSnap.exists() && docSnap.data().imageUrls) {
          setImageUrls(docSnap.data().imageUrls);
        }
      } catch (error) {
        console.error("이미지 로드 실패:", error);
      }
    };
    loadImages();
  }, []);

  // 텍스처 로딩 처리
  useEffect(() => {
    const textureLoader = new TextureLoader();
    textureLoader.crossOrigin = "anonymous";

    imageUrls.forEach((url, index) => {
      if (url && !loadedTextures[index]) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = url;

        img.onload = () => {
          const texture = textureLoader.load(url);
          setLoadedTextures((prev) => {
            const newTextures = [...prev];
            newTextures[index] = texture;
            return newTextures;
          });
        };
      }
    });
  }, [imageUrls]);

  const handleImageUpload = async (file, starIndex) => {
    try {
      const timestamp = Date.now();
      const storageRef = ref(storage, `stars/star_${starIndex}_${timestamp}`);
      const metadata = {
        contentType: file.type,
        cacheControl: "public,max-age=3600",
      };

      await uploadBytes(storageRef, file, metadata);
      const url = await getDownloadURL(storageRef);

      const newUrls = [...imageUrls];
      newUrls[starIndex] = url;

      const constellationRef = doc(db, "constellations", "userConstellation");
      await updateDoc(constellationRef, { imageUrls: newUrls });

      setImageUrls(newUrls);
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      alert("이미지 업로드에 실패했습니다.");
    }
  };

  const handleStarClick = async () => {
    if (!imageUrl) {
      // Firebase 스토리지에서 이미지 URL 가져오기
      const storage = getStorage();
      const imageRef = ref(storage, `stars/star_${selectedStar}_${Date.now()}`);

      try {
        const url = await getDownloadURL(imageRef);
        setImageUrl(url);
      } catch (error) {
        console.error("이미지를 가져오는데 실패했습니다:", error);
      }
    }
    // 이미지 표시 상태 토글
    setShowImage(!showImage);
  };

  return {
    imageUrls,
    loadedTextures,
    selectedStar,
    setSelectedStar,
    handleImageUpload,
    showImage,
    imageUrl,
    handleStarClick,
  };
}
