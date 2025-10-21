import mediapipe as mp
import numpy as np
import cv2
import io
from PIL import Image
from typing import Tuple, Optional
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class MediaPipeService:
    def __init__(self):
        self.mp_face_mesh = mp.solutions.face_mesh
        self.mp_drawing = mp.solutions.drawing_utils
        
    def analyze_image(self, image_bytes: bytes) -> dict:
        """
        Analyze image for face detection and skin tone analysis
        """
        try:
            # Convert bytes to image
            image = Image.open(io.BytesIO(image_bytes))
            image_rgb = np.array(image)
            
            # Convert RGB to BGR for MediaPipe
            image_bgr = cv2.cvtColor(image_rgb, cv2.COLOR_RGB2BGR)
            
            with self.mp_face_mesh.FaceMesh(
                static_image_mode=True,
                max_num_faces=5,
                refine_landmarks=True,
                min_detection_confidence=0.5
            ) as face_mesh:
                
                results = face_mesh.process(image_bgr)
                
                if not results.multi_face_landmarks:
                    return {
                        "faces_detected": 0,
                        "skin_tone": {"r": 0, "g": 0, "b": 0, "hex": "#000000"},
                        "interpretation": "No face detected"
                    }
                
                # Analyze skin tone from the first detected face
                face_landmarks = results.multi_face_landmarks[0]
                skin_tone = self._extract_skin_tone(image_rgb, face_landmarks)
                
                return {
                    "faces_detected": len(results.multi_face_landmarks),
                    "skin_tone": skin_tone,
                    "interpretation": self._get_skin_interpretation(skin_tone)
                }
                
        except Exception as e:
            logger.error(f"Error analyzing image: {str(e)}")
            raise Exception(f"Failed to analyze image: {str(e)}")
    
    def _extract_skin_tone(self, image: np.ndarray, landmarks) -> dict:
        """
        Extract average skin tone from facial regions
        """
        try:
            h, w, _ = image.shape
            
            # Get landmark points for skin regions (cheeks, forehead)
            # MediaPipe face mesh landmark indices for skin regions
            skin_landmarks = [
                10, 151, 9, 8, 107, 55, 65, 52, 53, 46,  # forehead
                116, 117, 118, 119, 120, 121, 126, 142,  # left cheek
                345, 346, 347, 348, 349, 350, 355, 371   # right cheek
            ]
            
            skin_pixels = []
            
            for idx in skin_landmarks:
                if idx < len(landmarks.landmark):
                    landmark = landmarks.landmark[idx]
                    x = int(landmark.x * w)
                    y = int(landmark.y * h)
                    
                    # Ensure coordinates are within image bounds
                    if 0 <= x < w and 0 <= y < h:
                        # Sample a small region around the landmark
                        for dx in range(-2, 3):
                            for dy in range(-2, 3):
                                nx, ny = x + dx, y + dy
                                if 0 <= nx < w and 0 <= ny < h:
                                    skin_pixels.append(image[ny, nx])
            
            if not skin_pixels:
                # Fallback: use center region of image
                center_y, center_x = h // 2, w // 2
                region_size = min(h, w) // 4
                skin_region = image[
                    center_y - region_size:center_y + region_size,
                    center_x - region_size:center_x + region_size
                ]
                skin_pixels = skin_region.reshape(-1, 3)
            
            # Calculate average RGB values
            avg_r = int(np.mean([pixel[0] for pixel in skin_pixels]))
            avg_g = int(np.mean([pixel[1] for pixel in skin_pixels]))
            avg_b = int(np.mean([pixel[2] for pixel in skin_pixels]))
            
            # Convert to hex
            hex_color = f"#{avg_r:02x}{avg_g:02x}{avg_b:02x}"
            
            return {
                "r": avg_r,
                "g": avg_g,
                "b": avg_b,
                "hex": hex_color
            }
            
        except Exception as e:
            logger.error(f"Error extracting skin tone: {str(e)}")
            # Return default values
            return {"r": 128, "g": 128, "b": 128, "hex": "#808080"}
    
    def _get_skin_interpretation(self, skin_tone: dict) -> str:
        """
        Provide basic interpretation of skin tone
        """
        brightness = (skin_tone["r"] + skin_tone["g"] + skin_tone["b"]) / 3
        
        if brightness > 200:
            return "Light complexion detected"
        elif brightness > 150:
            return "Medium complexion detected"
        elif brightness > 100:
            return "Olive complexion detected"
        else:
            return "Darker complexion detected"

# Global service instance
mediapipe_service = MediaPipeService()

