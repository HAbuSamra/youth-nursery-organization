<template>
  <v-app>
    <v-main>
      <!-- شرط عرض تسجيل الدخول -->
      <LoginComponent v-if="!isLoggedIn" @loginSuccess="handleLoginSuccess" />

      <!-- شرط عرض الصفحة الثانية -->
      <HelloWorld v-else />

      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import LoginComponent from "./components/LoginComponent.vue";
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",

  components: {
    LoginComponent,
    HelloWorld,
  },

  data() {
    return {
      isLoggedIn: false, // حالة لتحديد حالة تسجيل الدخول
    };
  },

  methods: {
    handleLoginSuccess() {
      this.isLoggedIn = true; // تغيير الحالة بعد نجاح تسجيل الدخول
    },
  },
};
</script>
