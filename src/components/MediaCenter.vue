<template>
  <div class="news-container">
    <!-- إضافة الأخبار فقط للبريد المصرح له -->
    <div v-if="isAuthorized" class="add-news">
      <input
        type="text"
        v-model="newsTitle"
        placeholder="عنوان الخبر"
        class="input-field" />
      <textarea
        v-model="newsContent"
        placeholder="محتوى الخبر"
        class="input-field"></textarea>
      <input
        type="url"
        v-model="newsImage"
        placeholder="رابط صورة الخبر"
        class="input-field" />
      <button @click="addNews" class="submit-button">إضافة خبر</button>
    </div>

    <!-- عرض الأخبار -->
    <div v-if="newsList.length > 0" class="news-list">
      <h2>الأخبار</h2>
      <div
        v-for="(newsGroup, index) in groupedNews"
        :key="index"
        class="news-group">
        <ul>
          <li v-for="news in newsGroup" :key="news.id" class="news-item">
            <h3 class="news-title">{{ news.title }}</h3>
            <p class="news-content">{{ news.content }}</p>
            <img :src="news.image" alt="صورة الخبر" class="news-image" />
          </li>
        </ul>
      </div>
    </div>

    <!-- في حال عدم وجود أخبار -->
    <div v-else>
      <p class="no-news-message">لا يوجد أخبار حالياً.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newsTitle: "",
      newsContent: "",
      newsImage: "",
      newsList: [],
      userEmail: "example@example.com", // البريد الإلكتروني المسموح له
      authorizedEmail: "admin@example.com", // البريد الإلكتروني الذي سيتم السماح له بإضافة الأخبار
    };
  },
  computed: {
    isAuthorized() {
      return this.userEmail === this.authorizedEmail;
    },
    // تقسيم الأخبار إلى مجموعات بحيث كل مجموعة تحتوي على 3 أخبار
    groupedNews() {
      const groups = [];
      for (let i = 0; i < this.newsList.length; i += 3) {
        groups.push(this.newsList.slice(i, i + 3));
      }
      return groups;
    },
  },
  methods: {
    addNews() {
      if (this.newsTitle && this.newsContent && this.newsImage) {
        const newNews = {
          id: this.newsList.length + 1,
          title: this.newsTitle,
          content: this.newsContent,
          image: this.newsImage,
        };
        this.newsList.push(newNews);
        this.newsTitle = "";
        this.newsContent = "";
        this.newsImage = "";
      } else {
        alert("يرجى ملء جميع الحقول!");
      }
    },
  },
};
</script>

<style scoped>
.news-container {
  width: 80%;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.add-news {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.input-field {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.submit-button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
}

.submit-button:hover {
  background-color: #45a049;
}

.news-list {
  margin-top: 20px;
}

.news-group {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
}

.news-list ul {
  list-style-type: none;
  padding: 0;
  width: 100%;
}

.news-item {
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  width: 100%;
}

.news-title {
  margin: 0;
  color: #007bff;
  font-size: 1.5em;
}

.news-content {
  font-size: 1.1em;
  color: #555;
}

.news-image {
  width: 100%;
  height: auto;
  max-width: 300px;
  margin-top: 10px;
}

.no-news-message {
  text-align: center;
  color: #999;
  font-size: 1.2em;
}
</style>
