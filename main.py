from flask import Flask, request, jsonify
import openai
import os

app = Flask(__name__)

# Načítanie API kľúča zo súboru .env
openai.api_key = os.getenv('OPENAI_API_KEY')

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    response = openai.Completion.create(
        engine="text-davinci-003",  # Alebo iný model
        prompt=user_message,
        max_tokens=150
    )
    return jsonify({'response': response.choices[0].text.strip()})

if __name__ == "__main__":
    app.run(debug=True)

