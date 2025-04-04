import os
from openai import OpenAI

class OpenAIService:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


    def get_text_response(self, user_prompt: str):
        response = self.client.beta.chat.completions.parse(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": user_prompt},
                    ],
                }
            ],
            max_tokens=5000,
        )
        return response.choices[0].message.content

