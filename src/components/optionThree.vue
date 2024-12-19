<template>
    <div class="inquiries-container">
        <h1 class="title">استفسارات</h1>
        <textarea v-model="userQuestion" placeholder="اكتب سؤالك هنا..."></textarea>
        <button @click="getAnswer" class="ask-button">اسأل</button>
        <div v-if="aiResponse" class="response fade-in">
            <h2>الإجابة:</h2>
            <p>{{ aiResponse }}</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userQuestion: '',
            aiResponse: '',
            fileContent: 'محتوى الملف المخفي هنا...' // أضف محتوى الملف المخفي
        };
    },
    methods: {
        async getAnswer() {
            if (this.userQuestion.trim() === '') {
                alert('يرجى إدخال سؤال.');
                return;
            }

            try {
                const response = await fetch('http://127.0.0.1:5000/api/ask', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        question: this.userQuestion,
                        context: this.fileContent // أرسل محتوى الملف المخفي مع السؤال
                    })
                });

                if (!response.ok) {
                    throw new Error('فشل في استدعاء API: ' + response.statusText);
                }

                const data = await response.json();
                this.aiResponse = data.answer;
            } catch (error) {
                console.error('حدث خطأ:', error);
                alert('فشل في الحصول على الإجابة، يرجى المحاولة لاحقًا.');
            }
        }
    }
};
</script>

<style scoped>
/* أضف الأنماط الخاصة بك هنا كما هي في الكود الأصلي */
</style>

<style scoped>
html,
body {
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
    background-color: #eaeef2;
}

.inquiries-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    max-width: 100vh;
    margin: auto;
    transition: transform 0.5s;
    /* تأثير الانتقال */
}

.title {
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
    animation: slideIn 0.5s ease;
    /* تأثير الانزلاق */
}

textarea {
    width: 100%;
    height: 150px;
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: none;
    font-size: 16px;
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: border-color 0.3s, box-shadow 0.3s;
    /* تأثير الانتقال */
}

textarea.active {
    border-color: #28a745;
    /* لون الحدود عند التركيز */
    box-shadow: 0 0 8px rgba(40, 167, 69, 0.5);
    /* ظل عند التركيز */
}

.ask-button {
    background-color: #28a745;
    color: white;
    padding: 15px 30px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s, transform 0.2s;
    /* تأثير الانتقال */
}

.ask-button:hover {
    background-color: #218838;
    transform: translateY(-2px);
    /* رفع الزر عند التحويم */
}

.response {
    margin-top: 30px;
    border: 1px solid #ccc;
    padding: 15px;
    border-radius: 4px;
    background-color: #f8f9fa;
    width: 100%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    opacity: 0;
    animation: fadeIn 0.5s forwards;
    /* تأثير التلاشي */
}

@keyframes slideIn {
    from {
        transform: translateY(-20px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes fadeIn {
    to {
        opacity: 1;
    }
}
</style>
