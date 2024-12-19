<template>
  <link
    href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap"
    rel="stylesheet" />

  <div class="partone">
    <div class="image-container">
      <img
        :src="
          require('./img/456587258_8502144919817720_7596256156928509379_n.jpg')
        "
        alt="Image Not Available" />
    </div>
    <div class="per">
      <div class="animated-text">
        <h1>هل أنت شاب أو شابة تتطلع لتطوير مهاراتك؟</h1>
        <p>
          انضم إلينا وكن جزءًا من فريق يؤمن بالتغيير ويسعى لإحداث فرق إيجابي!
        </p>

        <h2>شروط التطوع:</h2>
        <ul>
          <li>العمر بين 18-40 عامًا</li>
          <li>شغف بالعمل الجماعي ورغبة في التطور</li>
          <li>الالتزام والجدية في أداء المهام</li>
        </ul>

        <h2>أهدافنا:</h2>
        <ul>
          <li>تعزيز قدرات الشباب وصقل مهاراتهم</li>
          <li>تقديم دورات تدريبية متخصصة</li>
          <li>بناء شبكات قوية وتعزيز التعاون</li>
          <li>تشجيع العمل التطوعي المجتمعي</li>
          <li>تنظيم أنشطة شبابية مبتكرة</li>
          <li>خلق بيئة آمنة ومُلهمة للدراسة والإبداع</li>
        </ul>

        <p>
          للانضمام إلينا، يرجى تعبئة نموذج التسجيل من خلال الرابط التالي:
          <br />
          <a href="https://forms.gle/JdDshr9NUhDeD6mD6">
            <button class="btn">هنا</button>
          </a>
          <br />
          سنتواصل معك بعد مراجعة طلبك لتأكيد انضمامك لفريق التطوع.
          <br />
          اغتنم الفرصة وكن جزءًا من التغيير!
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OptionOne",
};
</script>

<style scoped>
/* أنيميشن الخلفية */
.partone {
  display: flex;
  background-color: #ac8d8d;
  margin-top: 2%;
  animation: backgroundAnimation 10s infinite alternate;
  padding: 20px;
  border-radius: 10px;
}

@keyframes backgroundAnimation {
  0% {
    background-color: #ac8d8d;
  }

  50% {
    background-color: #b99292;
  }

  100% {
    background-color: #d1b2b2;
  }
}

/* أنيميشن الصورة */
.image-container {
  animation: fadeIn 1s ease-in;
  flex: 1;
  /* ليتوسع لملء المساحة */
  display: flex;
  justify-content: center;
  /* ليتوسط الصورة */
  align-items: center;
  /* ليتوسط الصورة */
}

img {
  width: 100%;
  /* اجعل الصورة تتناسب مع الحاوية */
  max-width: 406px;
  /* حد أقصى لعرض الصورة */
  height: auto;
  /* الحفاظ على النسبة الجانبية */
  border-radius: 10px;
  transition:
    transform 0.6s,
    opacity 0.6s;
  /* تقليل مدة الانتقال */
}

img:hover {
  transform: scale(1.05) rotate(-1deg);
  opacity: 0.8;
  /* تغيير نسبة الشفافية */
}

/* أنيميشن النص */
.animated-text {
  font-family: "Cairo", sans-serif;
  color: white;
  animation: fadeInText 2s ease forwards;
  font-size: 1.1em;
  /* زيادة حجم الخط قليلاً */
  margin-top: 5%;
  flex: 2;
  /* لتوزيع المساحة بشكل متساوٍ */
}

@keyframes fadeInText {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.btn {
  width: 29%;
  background-color: red;
  border-radius: 17px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
  padding: 10px;
  /* إضافة حشوة لزر */
  border: none;
  /* إزالة الحدود الافتراضية */
}

.btn:hover {
  background-color: #540d0d;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.per {
  margin-left: 20px;
  /* تخفيف المسافة */
  font-family: "Cairo", sans-serif;
  flex: 1;
  /* لتوزيع المساحة بشكل متساوٍ */
}
</style>
