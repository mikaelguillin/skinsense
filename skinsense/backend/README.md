# SkinSense Backend

FastAPI + MediaPipe backend for AI skin health analysis.

## 🚀 Quick Start

```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

API will be available at `http://localhost:8000`

## 📦 Dependencies

- **FastAPI** - Web framework
- **MediaPipe** - AI/ML processing
- **OpenCV** - Image processing
- **Pillow** - Image manipulation
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation

## 🛠️ Development

### Setup

1. **Create virtual environment**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

3. **Run development server**
   ```bash
   uvicorn main:app --reload
   ```

### API Documentation

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## 🔧 Configuration

### Environment Variables

```env
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
PYTHON_VERSION=3.11.0
```

### CORS Settings

Configure allowed origins in `main.py`:

```python
allow_origins=[
    "http://localhost:3000",
    "http://localhost:5173",
    "https://your-frontend-domain.com"
]
```

## 🧠 AI/ML Processing

### MediaPipe Integration

- **Face Detection**: Multi-face detection
- **Landmark Extraction**: Facial feature points
- **Skin Tone Analysis**: RGB color extraction

### Analysis Pipeline

1. **Image Validation** - File type and size checks
2. **Face Detection** - MediaPipe FaceMesh processing
3. **Skin Tone Extraction** - RGB analysis from facial regions
4. **Result Generation** - Structured response

## 📊 API Endpoints

### Health Check

```bash
GET /health
```

### Image Analysis

```bash
POST /analyze/
Content-Type: multipart/form-data
Body: file (image file)
```

**Response:**

```json
{
  "status": "success",
  "data": {
    "faces_detected": 1,
    "skin_tone": {
      "r": 200,
      "g": 180,
      "b": 160,
      "hex": "#c8b4a0"
    },
    "interpretation": "Light complexion detected"
  }
}
```

## 🧪 Testing

### Run Tests

```bash
pytest tests/
```

### Test Coverage

```bash
pytest --cov=. tests/
```

### Manual Testing

```bash
# Test with curl
curl -X POST "http://localhost:8000/analyze/" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@test_image.jpg"
```

## 🚀 Deployment

### Render

1. Connect GitHub repository
2. Select "Web Service"
3. Configure:
   - Build command: `pip install -r requirements.txt`
   - Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - Environment variables

### Docker (Alternative)

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## 🔒 Security

### File Validation

- File type checking
- Size limits (10MB)
- Content validation

### Error Handling

- Graceful failure
- Detailed logging
- No data exposure

## 📈 Performance

### Optimization

- Efficient image processing
- Memory management
- Async processing

### Monitoring

- Health check endpoints
- Request logging
- Error tracking

## 🐛 Troubleshooting

### Common Issues

1. **MediaPipe Installation**

   ```bash
   pip install --upgrade mediapipe
   ```

2. **CORS Errors**

   - Check allowed origins
   - Verify frontend URL

3. **Memory Issues**
   - Reduce image size
   - Optimize processing

## 📝 Logging

Configure logging level:

```python
import logging
logging.basicConfig(level=logging.INFO)
```

## 🔧 Customization

### Adding New Analysis

1. Extend `MediaPipeService` class
2. Add new endpoints in `routers/`
3. Update response models

### Performance Tuning

- Adjust MediaPipe parameters
- Optimize image processing
- Add caching if needed
