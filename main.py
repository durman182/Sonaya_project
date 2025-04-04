import os
import logging
from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from dotenv import load_dotenv
from app.openai_service import OpenAIService

# Load environment variables
load_dotenv()

# Create logs folder if it doesn't exist
if not os.path.exists("logs"):
    os.makedirs("logs")

# Set up logging to file and console
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')

# File handler to write logs to logs/app.log
file_handler = logging.FileHandler("logs/app.log")
file_handler.setLevel(logging.INFO)
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)

# Stream handler to output logs to the console
stream_handler = logging.StreamHandler()
stream_handler.setLevel(logging.INFO)
stream_handler.setFormatter(formatter)
logger.addHandler(stream_handler)

app = FastAPI()

# Mount static files and setup templates for the frontend
app.mount("/static", StaticFiles(directory="app/static"), name="static")
templates = Jinja2Templates(directory="app/templates")

# Initialize the OpenAI service
openai_service = OpenAIService()

@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"Incoming request: {request.method} {request.url}")
    response = await call_next(request)
    logger.info(f"Response status: {response.status_code}")
    return response

# GET endpoint serving the chat interface (HTML page)
@app.get("/", response_class=HTMLResponse)
async def get_chat(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/about", response_class=HTMLResponse)
async def about_page(request: Request):
    return templates.TemplateResponse("about.html", {"request": request})


@app.get("/contact", response_class=HTMLResponse)
async def contact_page(request: Request):
    return templates.TemplateResponse("contact.html", {"request": request})
# POST endpoint to simulate voice input (using text) and get a response from OpenAI
@app.post("/api/chat")
async def chat_api(user_prompt: str = Form(...)):
    try:
        # For text input we use get_text_response.
        response = openai_service.get_text_response(user_prompt)
        logger.info(f"User prompt: {user_prompt} | Response: {response}")
        return JSONResponse(content={"response": response})
    except Exception as e:
        logger.error(f"Error processing prompt: {e}")
        return JSONResponse(content={"error": str(e)}, status_code=500)
