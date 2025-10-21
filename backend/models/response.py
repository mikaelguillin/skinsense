from pydantic import BaseModel
from typing import Optional

class SkinTone(BaseModel):
    r: int
    g: int
    b: int
    hex: str

class AnalysisResult(BaseModel):
    faces_detected: int
    skin_tone: SkinTone
    interpretation: str

class AnalysisResponse(BaseModel):
    status: str
    data: AnalysisResult
    message: Optional[str] = None

class ErrorResponse(BaseModel):
    status: str = "error"
    message: str
    detail: Optional[str] = None

