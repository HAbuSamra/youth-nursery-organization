<template>
    <div class="learning-container">
        <h1 class="title">تعلم معنا</h1>

        <select v-model="selectedField" @change="filterCourses" class="field-select">
            <option value="" disabled selected>اختر مجالًا</option>
            <option v-for="field in fields" :key="field">{{ field }}</option>
        </select>

        <transition-group name="fade" tag="div" class="courses-list" v-if="filteredCourses.length > 0">
            <h2>الدورات المتاحة في "{{ selectedField }}"</h2>
            <ul>
                <li v-for="course in filteredCourses" :key="course.id" class="course-item">
                    <h3>{{ course.title }}</h3>
                    <p>{{ course.description }}</p>
                </li>
            </ul>
        </transition-group>

        <div v-else-if="selectedField" class="no-courses-message">
            <p>لا توجد دورات متاحة في هذا المجال.</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedField: '',
            fields: ['برمجة', 'تصميم', 'ذكاء اصطناعي', 'تحليل البيانات'],
            courses: [
                { id: 1, title: 'دورة برمجة Python', description: 'تعلم البرمجة بلغة Python.', field: 'برمجة' },
                { id: 2, title: 'دورة تصميم واجهات المستخدم', description: 'تصميم واجهات مستخدم احترافية.', field: 'تصميم' },
                { id: 3, title: 'دورة تعلم الذكاء الاصطناعي', description: 'أساسيات الذكاء الاصطناعي.', field: 'ذكاء اصطناعي' },
                { id: 4, title: 'دورة تحليل البيانات', description: 'أساليب تحليل البيانات.', field: 'تحليل البيانات' },
                { id: 5, title: 'دورة برمجة JavaScript', description: 'تعلم البرمجة بلغة JavaScript.', field: 'برمجة' }
            ],
            filteredCourses: []
        };
    },
    methods: {
        filterCourses() {
            if (this.selectedField) {
                this.filteredCourses = this.courses.filter(course => course.field === this.selectedField);
            } else {
                this.filteredCourses = [];
            }
        }
    }
};
</script>

<style scoped>
.learning-container {
    width: 80%;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.title {
    text-align: center;
    font-size: 2em;
    color: #333;
    margin-bottom: 20px;
}

.field-select {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    transition: border-color 0.3s ease;
}

.field-select:focus {
    border-color: #007BFF;
    outline: none;
}

.courses-list {
    margin-top: 20px;
}

.courses-list ul {
    list-style-type: none;
    padding: 0;
}

.course-item {
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    transition: transform 0.3s, box-shadow 0.3s;
}

.course-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.courses-list h3 {
    margin: 0;
    color: #007BFF;
}

.no-courses-message {
    text-align: center;
    color: #ff0000;
    margin-top: 20px;
}

/* Animation styles */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */
    {
    opacity: 0;
}
</style>