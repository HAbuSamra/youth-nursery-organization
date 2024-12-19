<template>
  <div class="background-video-container">
    <video autoplay muted loop class="background-video">
      <source v-bind:src="require('./img/test-voided.mp4')" type="video/mp4" />
      <p>متصفحك لا يدعم تشغيل الفيديو أو لم يتم تحميله بشكل صحيح.</p>
    </video>
    <!-- باقي محتويات الصفحة هنا -->
    <div class="content"></div>
  </div>
  <div class="partone">
    <img
      :src="
        require('./img/462149265_122116392698481939_2766899666150189970_n.jpg')
      "
      alt="not work" />
    <h2>رؤية المبادرة</h2>
    <p>
      نسعى إلى أن تكون هذه المساحة منصة لتبادل الأفكار ودعم ريادة الأعمال،
      بالإضافة إلى تقديم الدعم اللازم للشباب من خلال الجلسات التوجيهية
      والاستشارات الفردية لتطوير المشاريع الشخصية والمهنية. وتنظيم جلسات توعوية
      حول المخاطر المتعلقة بالمخدرات والعنف، ونسعى لتعزيز تمكين المرأة وتوعية
      الشباب بمواضيع هامة تؤثر على حياتهم ومستقبلهم.
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  name: "HomePage",
};
</script>

<style scoped>
/* إعدادات الفيديو لجعله يغطي الخلفية بالكامل */
.background-video-container {
  position: relative;
  height: 100vh; /* تأكد من أن الفيديو يغطي كامل الشاشة */
  width: 100%;
  overflow: hidden;
}

.background-video {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  filter: brightness(1.1) contrast(1.2);
  opacity: 0.9;
}

.content {
  position: relative;
  z-index: 1;
  color: white;
  text-align: center;
  padding: 20px;
  margin-top: 28%;
  margin-left: 50%;
  font-size: 20px;
  font-family: "Cairo", sans-serif;
}

.partone {
  display: flex;
  margin-left: 30%;
  margin-top: 10%;
  font-family: "Cairo", sans-serif;
  font-size: 17px;
}

.partone p {
  position: absolute;
  margin-top: 10%;
  margin-left: 20%;
}

.partone h2 {
  margin-left: 49%;
  margin-top: 7%;
}

.partone img {
  position: absolute;
  width: 300px;
  height: 300px;
  margin-left: -26%;
}
</style>
