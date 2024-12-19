<template>
  <div id="app" class="app-container">
    <div class="container">
      <div class="card">
        <h2 class="headline">تسجيل الدخول</h2>
        <form @submit.prevent="handleLogin" ref="form">
          <!-- حقل البريد الإلكتروني -->
          <div class="form-group">
            <label for="email">البريد الإلكتروني</label>
            <input
              v-model="email"
              id="email"
              type="email"
              required
              placeholder="البريد الإلكتروني" />
          </div>

          <!-- حقل كلمة المرور -->
          <div class="form-group">
            <label for="password">كلمة المرور</label>
            <input
              v-model="password"
              id="password"
              type="password"
              required
              placeholder="كلمة المرور" />
          </div>

          <!-- خانة تذكرني -->
          <div class="form-group">
            <label>
              <input type="checkbox" v-model="rememberMe" />
              تذكرني
            </label>
          </div>

          <!-- زر تسجيل الدخول -->
          <button type="submit" class="btn primary">تسجيل الدخول</button>

          <!-- زر تسجيل الدخول كزائر -->
          <button type="button" class="btn secondary" @click="enterAsGuest">
            دخول كزائر
          </button>

          <!-- زر التسجيل باستخدام Google -->
          <button type="button" class="btn google" @click="handleGoogleLogin">
            تسجيل الدخول باستخدام Google
          </button>
        </form>

        <!-- روابط لإنشاء حساب أو استعادة كلمة المرور -->
        <div class="actions">
          <button class="link" @click="showRegisterDialog">إنشاء حساب</button>
          <button class="link" @click="forgotPassword">
            هل نسيت كلمة المرور؟
          </button>
        </div>
      </div>

      <!-- نافذة منبثقة لإنشاء حساب -->
      <div v-if="showRegister" class="modal">
        <div class="modal-content">
          <h2 class="headline">إنشاء حساب جديد</h2>
          <form @submit.prevent="handleRegister">
            <div class="form-group">
              <label for="firstName">الاسم الأول</label>
              <input v-model="firstName" id="firstName" type="text" required />
            </div>
            <div class="form-group">
              <label for="lastName">الاسم الأخير</label>
              <input v-model="lastName" id="lastName" type="text" required />
            </div>
            <div class="form-group">
              <label for="registerEmail">البريد الإلكتروني</label>
              <input v-model="email" id="registerEmail" type="email" required />
            </div>
            <div class="form-group">
              <label for="phoneNumber">رقم الهاتف</label>
              <input
                v-model="phoneNumber"
                id="phoneNumber"
                type="tel"
                required />
            </div>
            <div class="form-group">
              <label for="registerPassword">كلمة المرور</label>
              <input
                v-model="password"
                id="registerPassword"
                type="password"
                required />
            </div>
            <div class="form-group">
              <label for="confirmPassword">تأكيد كلمة المرور</label>
              <input
                v-model="confirmPassword"
                id="confirmPassword"
                type="password"
                required />
            </div>
            <button type="submit" class="btn primary">إنشاء الحساب</button>
          </form>
          <button class="btn close" @click="showRegister = false">إغلاق</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from "../../API/api.js";

export default {
  data() {
    return {
      email: "",
      password: "",
      rememberMe: false,
      firstName: "",
      lastName: "",
      phoneNumber: "",
      confirmPassword: "",
      showRegister: false,
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await apiClient.post("/login", {
          email: this.email,
          password: this.password,
        });

        if (response && response.data) {
          const token = response.data.token;

          // إذا كان المستخدم قد اختار تذكرني، سيتم حفظ التوكن لفترة أطول
          if (this.rememberMe) {
            localStorage.setItem("authToken", token);
          } else {
            sessionStorage.setItem("authToken", token);
          }

          alert("تم تسجيل الدخول بنجاح!");
          this.$emit("loginSuccess");
        } else {
          alert("لم يتم الحصول على رد صحيح من الخادم.");
        }
      } catch (error) {
        console.error("تفاصيل الخطأ:", error);

        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          alert("حدث خطأ أثناء تسجيل الدخول: " + error.response.data.message);
        } else {
          alert("حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة لاحقاً.");
        }
      }
    },
    async handleGoogleLogin() {
      try {
        const response = await apiClient.post("/google-login", {
          email: this.email, // يتم جلبها من Google API
          name: this.firstName, // يتم جلبها من Google API
        });

        if (response && response.data) {
          const token = response.data.token;
          localStorage.setItem("authToken", token);
          alert("تم تسجيل الدخول باستخدام Google بنجاح!");
          this.$emit("loginSuccess");
        } else {
          alert("لم يتم الحصول على رد صحيح من الخادم.");
        }
      } catch (error) {
        console.error("خطأ أثناء تسجيل الدخول باستخدام Google:", error);
        alert("حدث خطأ أثناء تسجيل الدخول باستخدام Google.");
      }
    },

    showRegisterDialog() {
      this.showRegister = true;
    },

    forgotPassword() {
      alert("يرجى التحقق من بريدك الإلكتروني لاستعادة كلمة المرور");
    },

    async handleRegister() {
      // التحقق من تطابق كلمة المرور
      if (this.password !== this.confirmPassword) {
        alert("كلمات المرور غير متطابقة!");
        return;
      }

      if (this.password.length < 6) {
        alert("كلمة المرور يجب أن تكون أطول من 6 أحرف.");
        return;
      }

      try {
        const response = await apiClient.post("/register", {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          phoneNumber: this.phoneNumber,
        });

        if (response && response.data) {
          alert(response.data.message); // رسالة النجاح من الخادم
          this.showRegister = false; // إغلاق النافذة بعد التسجيل
        } else {
          alert("لم يتم الحصول على رد صحيح من الخادم.");
        }
      } catch (error) {
        console.error("خطأ أثناء التسجيل:", error);

        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          alert("حدث خطأ أثناء إنشاء الحساب: " + error.response.data.message);
        } else {
          alert("حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة لاحقاً.");
        }
      }
    },
    enterAsGuest() {
      alert("تم الدخول كزائر");
      this.$emit("loginSuccess");
    },
  },
};
</script>

<style scoped>
.app-container {
  font-family: Arial, sans-serif;
  background-color: #e0f7fa;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.container {
  width: 100%;
  max-width: 400px;
}

.card {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.headline {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #00796b;
  margin-bottom: 16px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.btn {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 25px;
  font-size: 14px;
  cursor: pointer;
}

.btn.primary {
  background-color: #00796b;
  color: #fff;
}

.btn.secondary {
  background-color: #ccc;
  color: #000;
}

.btn.google {
  background-color: #db4437;
  color: #fff;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}

.link {
  background: none;
  border: none;
  color: #00796b;
  cursor: pointer;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* خلفية مظلمة */
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn.close {
  background-color: #ccc;
  color: #000;
  margin-top: 16px;
}
</style>
