import pytest
from fastapi.testclient import TestClient
from main import app
import io
from PIL import Image
import numpy as np

client = TestClient(app)

def create_test_image():
    """Create a simple test image with a face-like pattern"""
    # Create a simple image with a face-like pattern
    img = Image.new('RGB', (200, 200), color='white')
    # Add some basic face-like features
    pixels = np.array(img)
    # Add a simple face pattern
    pixels[50:150, 80:120] = [200, 180, 160]  # Face area
    pixels[70:90, 90:110] = [100, 100, 100]   # Eyes
    pixels[120:140, 95:105] = [150, 100, 100] # Mouth
    return Image.fromarray(pixels)

def test_health_endpoint():
    """Test the health endpoint"""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_analyze_health():
    """Test the analyze health endpoint"""
    response = client.get("/analyze/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_analyze_image_success():
    """Test successful image analysis"""
    # Create test image
    test_img = create_test_image()
    img_bytes = io.BytesIO()
    test_img.save(img_bytes, format='PNG')
    img_bytes.seek(0)
    
    # Test the endpoint
    response = client.post(
        "/analyze/",
        files={"file": ("test.png", img_bytes, "image/png")}
    )
    
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert "data" in data
    assert "faces_detected" in data["data"]
    assert "skin_tone" in data["data"]

def test_analyze_invalid_file_type():
    """Test with invalid file type"""
    response = client.post(
        "/analyze/",
        files={"file": ("test.txt", b"not an image", "text/plain")}
    )
    assert response.status_code == 400

def test_analyze_no_file():
    """Test without file"""
    response = client.post("/analyze/")
    assert response.status_code == 422  # Validation error

if __name__ == "__main__":
    pytest.main([__file__])

