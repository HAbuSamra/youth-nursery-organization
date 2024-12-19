<template>
  <div class="tape">
    <!-- حقل البحث -->
    <input v-model="searchQuery" placeholder="...ابحث هنا" class="input" />

    <!-- عرض الروابط بناءً على البحث -->
    <b-nav-item
      v-for="(link, index) in filteredLinks"
      :key="index"
      class="about">
      <!-- الروابط العادية -->
      <router-link
        v-if="link.label !== 'تواصل معنا'"
        :to="{ name: link.name }"
        class="nav-link">
        {{ link.label }}
      </router-link>

      <!-- القائمة المنسدلة -->
      <div v-if="link.label === 'تواصل معنا'">
        <span @click="toggleDropdown" class="dropdown-label">
          {{ link.label }}
        </span>
        <ul v-if="showDropdown" class="dropdown-menu">
          <li class="dropdown-item">
            <router-link to="/optionOne">انضم لفريقنا</router-link>
          </li>
          <li class="dropdown-item">
            <router-link to="/optionTow">مقترحات العمل</router-link>
          </li>
          <li class="dropdown-item">
            <router-link to="/optionThree">استفسارات</router-link>
          </li>
        </ul>
      </div>
    </b-nav-item>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      showDropdown: false, // للتحكم في إظهار القائمة المنسدلة
      links: [
        { label: "تواصل معنا", name: "OptionTow" },
        { label: "تعلم معنا", name: "LearningPage" },
        { label: "حجز المقاعد", name: "BookSeats" },
        { label: "المركز الاعلامي", name: "MediaCenter" },
        { label: "نشاطاتنا وفعالياتنا", name: "OurActivitiesAndEvents" },
        { label: "برامجنا", name: "OurPrograms" },
        { label: "مؤسستنا", name: "OurOrganization" },
        { label: "رئيسة", name: "HomePage" },
      ],
    };
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
  },
  computed: {
    filteredLinks() {
      return this.links.filter((link) =>
        link.label.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
};
</script>

<style scoped>
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

@keyframes slideDown {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
.tape {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  gap: 28px;
  background-color: #ac8d8d;
  color: white;
  align-items: center;
  justify-content: center;
  height: 34px;
  padding: 10px;
  z-index: 1000; /* تأكد من أن z-index مرتفع بما فيه الكفاية */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  margin-bottom: 16px;
  animation:
    backgroundAnimation 20s ease,
    slideDown 0.5s ease-out;

  /* إضافة ظل لتوضيح حدود الشريط */
}

.tape a {
  padding: 5px;
  color: white;
  text-decoration: none;
  z-index: 1001; /* تأكد من أن الروابط يمكن النقر عليها */
}

.input {
  color: white;
  width: 200px;
  transition: width 1s;
  border: none;
}

.input::placeholder {
  color: white;
}

.dropdown-menu {
  position: absolute;
  background-color: #d1b2b2;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1001; /* تأكد من أن القائمة المنسدلة لا تغطي الروابط */
}

.dropdown-item {
  list-style: none;
  margin: 5px 0;
  /* مسافة بين خيارات القائمة */
}

.dropdown-menu a {
  color: white;
  text-decoration: none;
}

.dropdown-label {
  cursor: pointer;
  /* تجعل المؤشر يظهر كيد */
}

.dropdown-menu {
  z-index: 100000000;
}
</style>
