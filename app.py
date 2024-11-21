from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
import openai
import os

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Configure OpenAI
openai.api_key = os.getenv('OPENAI_API_KEY')

def get_ai_response(user_input):
    """Get AI response using OpenAI API"""
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a supportive mental health assistant. Provide empathetic, helpful responses while making it clear you are not a replacement for professional mental health care."},
                {"role": "user", "content": user_input}
            ],
            max_tokens=150
        )
        return response.choices[0].message.content
    except Exception as e:
        return str(e)

@app.route('/')
def home():
    """Render home page"""
    return render_template('index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    """Handle chat API endpoint"""
    data = request.json
    user_message = data.get('message', '')
    
    if not user_message:
        return jsonify({'error': 'No message provided'}), 400
    
    ai_response = get_ai_response(user_message)
    return jsonify({'response': ai_response})

@app.route('/resources')
def resources():
    """Render mental health resources page"""
    return render_template('resources.html')

if __name__ == '__main__':
    app.run(debug=True)
