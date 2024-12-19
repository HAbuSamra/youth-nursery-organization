from flask import Flask, request, jsonify

app = Flask(__name__)

# نموذج ذكاء اصطناعي بسيط
def ai_model(question, context):
    # هنا يمكنك إضافة منطق الذكاء الاصطناعي الخاص بك
    return f"إجابة على '{question}' باستخدام السياق: {context}"

@app.route('/api/ask', methods=['POST'])
def ask():
    data = request.get_json()
    question = data.get('question')
    context = data.get('context')
    
    # استخدم نموذج الذكاء الاصطناعي للحصول على الإجابة
    answer = ai_model(question, context)
    
    return jsonify({'answer': answer})

if __name__ == '__main__':
    app.run(debug=True)
        