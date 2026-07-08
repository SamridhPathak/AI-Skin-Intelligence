from fastapi import FastAPI

app = FastAPI(
    title="AI Skin Intelligence API Gateway",
    version="1.0.0"
)

@app.get("/")
def root():
    return {
        "message": "Welcome to AI Skin Intelligence API Gateway"
    }

@app.get("/health")
def health():
    return {
        "status": "Gateway Running Successfully"
    }