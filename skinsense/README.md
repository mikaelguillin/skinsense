# 🧠 SkinSense - AI Skin Health Analyzer

A privacy-first AI-powered skin health analysis PWA built with React, FastAPI, and MediaPipe.

## 🚀 Features

- **AI-Powered Analysis**: Face detection and skin tone analysis using MediaPipe
- **Privacy-First**: Images processed locally, no permanent storage
- **Bilingual Support**: English and Spanish interface
- **PWA Ready**: Installable progressive web app
- **Responsive Design**: Works on desktop and mobile
- **Real-time Analysis**: Instant results with visual feedback

## 🛠️ Tech Stack

### Frontend

- React 18 + TypeScript
- Vite (build tool)
- Chakra UI (component library)
- Zustand (state management)
- i18next (internationalization)
- PWA capabilities

### Backend

- FastAPI (Python web framework)
- MediaPipe (AI/ML processing)
- OpenCV (image processing)
- Uvicorn (ASGI server)

### Deployment

- Frontend: Netlify
- Backend: Render
- Domain: TBD

## 📁 Project Structure

```
skinsense/
├── frontend/                 # React PWA application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── store/           # Zustand state management
│   │   ├── i18n/            # Internationalization
│   │   └── App.tsx
│   ├── public/              # Static assets & PWA manifest
│   ├── vite.config.ts       # Vite configuration
│   └── netlify.toml         # Netlify deployment config
├── backend/                 # FastAPI application
│   ├── routers/             # API route handlers
│   ├── services/            # Business logic
│   ├── models/              # Pydantic models
│   ├── tests/               # Test suite
│   ├── main.py              # FastAPI app
│   ├── requirements.txt     # Python dependencies
│   └── render.yaml          # Render deployment config
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Python 3.11+
- Git

### Local Development

1. **Clone and setup**

   ```bash
   git clone <repository-url>
   cd skinsense
   ```

2. **Frontend Setup**

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

   Frontend will be available at `http://localhost:5173`

3. **Backend Setup**

   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

   Backend will be available at `http://localhost:8000`

4. **Test the API**
   ```bash
   curl http://localhost:8000/health
   ```

### Environment Variables

Create `.env` files as needed:

**Frontend** (`frontend/.env`):

```env
VITE_API_URL=http://localhost:8000
```

**Backend** (environment variables):

```env
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

## 📱 PWA Installation

1. Open the deployed app in a mobile browser
2. Look for "Add to Home Screen" prompt
3. Or use browser menu: "Install App" / "Add to Home Screen"
4. App will install with native-like experience

## 🔧 API Documentation

### Endpoints

- `GET /` - API root
- `GET /health` - Health check
- `POST /analyze/` - Analyze image for skin health

### Analyze Endpoint

**Request:**

```bash
curl -X POST "http://localhost:8000/analyze/" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@image.jpg"
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
  },
  "message": "Analysis completed successfully"
}
```

## 🧪 Testing

### Frontend Tests

```bash
cd frontend
npm run test
```

### Backend Tests

```bash
cd backend
pytest tests/
```

### Manual Testing

1. Upload a clear photo with a visible face
2. Verify face detection count
3. Check skin tone analysis results
4. Test both English and Spanish interfaces

## 🚀 Deployment

### Frontend (Netlify)

1. Connect GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push to main

### Backend (Render)

1. Connect GitHub repository to Render
2. Select "Web Service"
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables as needed

### Environment Variables for Production

**Backend:**

- `CORS_ORIGINS`: Comma-separated list of allowed origins
- `PYTHON_VERSION`: 3.11.0

## 🔒 Privacy & Security

- **No Data Storage**: Images are processed in memory only
- **Local Processing**: All analysis happens on the server
- **CORS Protection**: Configured for specific origins
- **File Validation**: Size and type restrictions
- **Error Handling**: Graceful failure without data exposure

## 🎨 Customization

### Branding

- Update colors in `frontend/src/theme.ts`
- Modify PWA manifest in `frontend/public/manifest.json`
- Change app name in translation files

### Analysis Logic

- Modify `backend/services/mediapipe_service.py`
- Adjust skin tone extraction algorithms
- Add new analysis features

## 📊 Performance

- **Image Processing**: Optimized for 10MB max file size
- **Face Detection**: MediaPipe's efficient algorithms
- **PWA Caching**: Service worker for offline capability
- **Responsive Design**: Mobile-first approach

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**

   - Check `CORS_ORIGINS` environment variable
   - Verify frontend URL is included

2. **MediaPipe Installation**

   - Ensure Python 3.11+ is used
   - Try: `pip install --upgrade mediapipe`

3. **PWA Not Installing**

   - Check HTTPS requirement
   - Verify manifest.json is accessible
   - Test service worker registration

4. **Image Upload Fails**
   - Check file size (max 10MB)
   - Verify image format (JPG, PNG, WebP)
   - Ensure clear face visibility

## 📈 Roadmap

- [ ] Advanced skin health metrics
- [ ] Multiple language support
- [ ] Offline analysis capability
- [ ] User accounts and history
- [ ] Dermatologist integration
- [ ] Mobile app versions

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- MediaPipe team for face detection capabilities
- Chakra UI for beautiful components
- FastAPI for the excellent Python framework
- React team for the amazing frontend library
