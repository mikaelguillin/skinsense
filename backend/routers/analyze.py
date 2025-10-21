from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from services.mediapipe_service import mediapipe_service
from models.response import AnalysisResponse, ErrorResponse
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter(prefix="/analyze", tags=["analysis"])

@router.post("/", response_model=AnalysisResponse)
async def analyze_image(file: UploadFile = File(...)):
    """
    Analyze uploaded image for face detection and skin tone analysis
    """
    try:
        # Validate file type
        if not file.content_type or not file.content_type.startswith('image/'):
            raise HTTPException(
                status_code=400,
                detail="File must be an image (JPG, PNG, WebP)"
            )
        
        # Validate file size (10MB limit)
        file_content = await file.read()
        if len(file_content) > 10 * 1024 * 1024:  # 10MB
            raise HTTPException(
                status_code=413,
                detail="File size exceeds 10MB limit"
            )
        
        # Reset file pointer
        await file.seek(0)
        
        # Analyze image
        logger.info(f"Analyzing image: {file.filename}")
        result = mediapipe_service.analyze_image(file_content)
        
        return AnalysisResponse(
            status="success",
            data=result,
            message="Analysis completed successfully"
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Analysis failed: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Analysis failed: {str(e)}"
        )

@router.get("/health")
async def analyze_health():
    """
    Health check for analyze service
    """
    return {"status": "healthy", "service": "analyze"}

