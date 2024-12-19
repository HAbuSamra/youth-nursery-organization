<template>
    <div class="activities-container">
        <!-- مربع إضافة النشاط -->
        <div v-if="isAuthorized" class="add-activity-box">
            <button @click="openModal" class="add-activity-button">إضافة نشاط</button>

            <!-- مودال إضافة نشاط -->
            <div v-if="isModalOpen" class="modal">
                <div class="modal-content">
                    <span class="close" @click="closeModal">&times;</span>
                    <h2>إضافة نشاط جديد</h2>
                    <input v-model="newActivity.name" placeholder="اسم النشاط" class="input-field" />
                    <input v-model="newActivity.location" placeholder="المكان" class="input-field" />
                    <input v-model="newActivity.time" placeholder="الوقت" type="datetime-local" class="input-field" />
                    <input type="file" @change="handleImageUpload" class="input-field" />
                    <button @click="addActivity" class="submit-button">إضافة</button>
                </div>
            </div>
        </div>

        <!-- عرض النشاطات بشكل منظم داخل شبكة -->
        <div class="activities-list">
            <div v-if="activities.length === 0" class="no-activities-message">
                لا توجد نشاطات حالياً.
            </div>
            <transition-group name="fade" tag="div" class="activities-grid">
                <div class="activity-box" v-for="(activity, index) in activities" :key="index">
                    <img :src="activity.image" alt="Activity Image" class="activity-image" />
                    <div class="activity-details">
                        <h3 class="activity-name">{{ activity.name }}</h3>
                        <p class="activity-location">المكان: {{ activity.location }}</p>
                        <p class="activity-time">الوقت: {{ activity.time }}</p>
                    </div>
                </div>
            </transition-group>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activities: [],
            isModalOpen: false,
            newActivity: {
                name: '',
                location: '',
                time: '',
                image: ''
            },
            userEmail: "example@example.com",  // البريد الإلكتروني للمستخدم الحالي
            authorizedEmail: "authorized@example.com"  // البريد الإلكتروني المسموح له
        };
    },
    computed: {
        isAuthorized() {
            return this.userEmail === this.authorizedEmail;
        }
    },
    methods: {
        openModal() {
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
            this.resetForm();
        },
        resetForm() {
            this.newActivity = {
                name: '',
                location: '',
                time: '',
                image: ''
            };
        },
        handleImageUpload(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.newActivity.image = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },
        addActivity() {
            if (this.newActivity.name && this.newActivity.location && this.newActivity.time && this.newActivity.image) {
                this.activities.push({ ...this.newActivity });
                this.closeModal();
            } else {
                alert('يرجى ملء جميع الحقول.');
            }
        }
    }
};
</script>

<style scoped>
.activities-container {
    max-width: 1000px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    font-family: 'Arial', sans-serif;
}

.add-activity-box {
    margin-bottom: 20px;
    text-align: center;
}

.add-activity-button {
    padding: 12px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.2rem;
    transition: background-color 0.3s, transform 0.3s;
}

.add-activity-button:hover {
    background-color: #0056b3;
    transform: scale(1.05);
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
    position: relative;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 20px;
    color: #ff0000;
}

.input-field {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
}

.submit-button {
    padding: 10px 15px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s, transform 0.3s;
}

.submit-button:hover {
    background-color: #218838;
    transform: scale(1.05);
}

/* تصميم الأنشطة */
.activities-list {
    margin-top: 20px;
}

.activities-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
}

.activity-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 15px;
    background-color: #f8f9fa;
    transition: transform 0.3s, box-shadow 0.3s;
}

.activity-box:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.activity-image {
    width: 150px;
    height: 150px;
    border-radius: 5px;
    margin-bottom: 10px;
}

.activity-details {
    text-align: center;
}

.activity-name {
    font-size: 1.5rem;
    color: #333;
}

.activity-location,
.activity-time {
    color: #555;
    font-size: 1rem;
}

.no-activities-message {
    text-align: center;
    font-size: 1.2rem;
    color: #888;
}
</style>
