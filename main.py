from fastapi import FastAPI
from openai import OpenAI

app = FastAPI()

@app.get("/")
def read_root():
    return{"message": "Sonaya API beží"}

@app.post("/chat")
async def chat(input_text: dic):
    response = "Tu je odpoveď AI" # Tu pridaj OpenAI API request
    return {"responze": responze}