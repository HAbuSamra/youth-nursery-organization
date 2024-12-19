<template>
    <div class="suggestion-container">
        <h1 class="title">مقترحات العمل</h1>
        <textarea v-model="suggestion" placeholder="اكتب فكرتك هنا..." @focus="textareaFocus"
            @blur="textareaBlur"></textarea>
        <button @click="submitSuggestion" class="submit-button">إرسال</button>
        <div v-if="message" class="message fade-in">{{ message }}</div>
        <div v-if="suggestions.length" class="suggestions-list fade-in">
            <h2>المقترحات المعلقة</h2>
            <ul>
                <li v-for="(item, index) in suggestions" :key="index" class="suggestion-item">
                    <span>{{ item }}</span>
                    <div class="action-buttons">
                        <button @click="approveSuggestion(index)" class="approve-button">موافقة</button>
                        <button @click="rejectSuggestion(index)" class="reject-button">رفض</button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            suggestion: '',
            message: '',
            suggestions: []
        };
    },
    methods: {
        async submitSuggestion() {
            if (this.suggestion.trim() === '') {
                alert('يرجى إدخال فكرة.');
                return;
            }

            try {
                const response = await fetch('http://127.0.0.1:5000/api/suggestions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ suggestion: this.suggestion })
                });

                if (!response.ok) {
                    throw new Error('فشل في إرسال الفكرة: ' + response.statusText);
                }

                this.message = 'تم إرسال الفكرة بنجاح!';
                this.suggestion = '';
                this.fetchSuggestions();
            } catch (error) {
                console.error('حدث خطأ:', error);
                alert('فشل في إرسال الفكرة، يرجى المحاولة لاحقًا.');
            }
        },
        async fetchSuggestions() {
            try {
                const response = await fetch('http://127.0.0.1:5000/api/suggestions');
                this.suggestions = await response.json();
            } catch (error) {
                console.error('حدث خطأ:', error);
            }
        },
        async approveSuggestion(index) {
            try {
                const response = await fetch(`http://127.0.0.1:5000/api/suggestions/approve/${index}`, { method: 'POST' });
                if (response.ok) {
                    this.fetchSuggestions();
                }
            } catch (error) {
                console.error('حدث خطأ:', error);
            }
        },
        async rejectSuggestion(index) {
            try {
                const response = await fetch(`http://127.0.0.1:5000/api/suggestions/reject/${index}`, { method: 'POST' });
                if (response.ok) {
                    this.fetchSuggestions();
                }
            } catch (error) {
                console.error('حدث خطأ:', error);
            }
        },
        textareaFocus() {
            this.$el.querySelector('textarea').classList.add('textarea-focus');
        },
        textareaBlur() {
            this.$el.querySelector('textarea').classList.remove('textarea-focus');
        }
    },
    created() {
        this.fetchSuggestions();
    }
};
</script>

<style scoped>
.suggestion-container {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
    animation: fade-in 0.5s ease-in-out;
    /* تأثير دخول الصفحة */
}

.title {
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
}

textarea {
    width: 100%;
    height: 100px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: none;
    font-size: 16px;
    transition: border-color 0.3s ease;
    /* تأثير تغير لون الحدود */
}

.textarea-focus {
    border-color: #007bff;
    /* تغيير لون الحدود عند التركيز */
}

.submit-button {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;
    transition: background-color 0.3s ease;
    /* تأثير تغير لون الزر */
}

.submit-button:hover {
    background-color: #218838;
}

.message {
    margin-top: 10px;
    color: #28a745;
    text-align: center;
}

.suggestions-list {
    margin-top: 20px;
}

.suggestion-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-top: 10px;
    background-color: #fff;
    transition: transform 0.3s ease;
    /* تأثير الحركة */
}

.suggestion-item:hover {
    transform: translateY(-2px);
    /* رفع العنصر عند التمرير */
}

.action-buttons {
    display: flex;
    gap: 10px;
}

.approve-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    /* تأثير تغير لون الزر */
}

.approve-button:hover {
    background-color: #0069d9;
}

.reject-button {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    /* تأثير تغير لون الزر */
}

.reject-button:hover {
    background-color: #c82333;
}

/* تأثير الدخول */
.fade-in {
    animation: fade-in 0.5s ease-in-out;
}

@keyframes fade-in {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}
</style>
