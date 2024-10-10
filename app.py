from flask import Flask, render_template, request, jsonify
# import openai  # type: ignore # OpenAI APIを使う場合はこれを使用

app = Flask(__name__)

# OpenAIのAPIキーを設定します
# 本番環境では環境変数から取得するようにするのがベストです
# openai.api_key = 'your_openai_api_key'

@app.route('/')
def index():
    return render_template('index.html')

# @app.route('/chat', methods=['POST'])
# def chat():
#     user_message = request.json.get('message')
    
#     # OpenAI APIを使ってAIからの応答を取得します
#     # response = openai.Completion.create(
#     #     engine="text-davinci-003",
#     #     prompt=user_message,
#     #     max_tokens=150
#     # )
    
#     ai_message = response.choices[0].text.strip()
    
#     return jsonify({'reply': ai_message})

if __name__ == '__main__':
    app.run(debug=True)
