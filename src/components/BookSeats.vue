<template>
  <div class="partone-container">
    <!-- القاعة الأولى -->
    <div class="partone" @mouseover="animate" @mouseleave="reset">
      <div class="in-partone">
        <img :src="require('./img/Onehall.jpg')" alt="قاعة 1" class="image" />
        <div class="content">
          <button @click="openModal('قاعة 1')" class="button">
            حجز قاعة 1
          </button>
        </div>
      </div>
    </div>

    <!-- القاعة الثانية -->
    <div class="partone" @mouseover="animate" @mouseleave="reset">
      <div class="in-partone">
        <img :src="require('./img/Twohall.jpg')" alt="قاعة 2" class="image" />

        <div class="content">
          <button @click="openModal('قاعة 2')" class="button">
            حجز قاعة 2
          </button>
        </div>
      </div>
    </div>

    <!-- القاعة الثالثة -->
    <div class="partone" @mouseover="animate" @mouseleave="reset">
      <div class="in-partone">
        <img :src="require('./img/Threehall.jpg')" alt="قاعة 3" class="image" />

        <div class="content">
          <button @click="openModal('قاعة 3')" class="button">
            حجز قاعة 3
          </button>
        </div>
      </div>
    </div>

    <!-- نافذة الحجز المنبثقة -->
    <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h3>حجز {{ selectedRoom }}</h3>
        <label>عدد الأشخاص:</label>
        <input
          type="number"
          v-model="peopleCount"
          min="1"
          max="6"
          class="people-input" />

        <!-- تاريخ ووقت البداية والنهاية -->
        <label>تاريخ ووقت البدء:</label>
        <input
          type="datetime-local"
          v-model="startDateTime"
          class="time-input" />

        <label>تاريخ ووقت الانتهاء:</label>
        <input type="datetime-local" v-model="endDateTime" class="time-input" />

        <button @click="confirmBooking" class="confirm-button">
          تأكيد الحجز
        </button>
        <button @click="closeModal" class="close-button">إغلاق</button>

        <p
          v-if="bookingConfirmed"
          class="confirmation-message professional-confirmation">
          <i class="confirmation-icon">✔️</i>
          تم تأكيد حجزك لـ {{ selectedRoom }}!
          <br />
          من الساعة: <span class="highlight">{{ startDateTime }}</span> إلى
          الساعة: <span class="highlight">{{ endDateTime }}</span
          >.
          <br />
          التكلفة الإجمالية هي:
          <span class="highlight">{{ totalCost }} دينار</span>.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RoomBooking",
  data() {
    return {
      isModalOpen: false,
      selectedRoom: "",
      startDateTime: "",
      endDateTime: "",
      peopleCount: 1,
      bookingConfirmed: false,
      totalCost: 0,
      bookings: [], // لتخزين الحجوزات السابقة
    };
  },
  methods: {
    animate(event) {
      const img = event.currentTarget.querySelector(".image");
      img.style.transform = "scale(1.1)";
    },
    reset(event) {
      const img = event.currentTarget.querySelector(".image");
      img.style.transform = "scale(1)";
    },
    openModal(room) {
      this.selectedRoom = room;
      this.isModalOpen = true;
      this.bookingConfirmed = false;
      this.startDateTime = "";
      this.endDateTime = "";
      this.peopleCount = 1;
      this.totalCost = 0;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    confirmBooking() {
      if (this.startDateTime && this.endDateTime && this.peopleCount) {
        // حساب التكلفة بناءً على عدد الأشخاص
        if (this.peopleCount === 1) {
          this.totalCost = 2;
        } else if (this.peopleCount === 2) {
          this.totalCost = 4;
        } else if (this.peopleCount === 3) {
          this.totalCost = 5;
        } else if (this.peopleCount === 4) {
          this.totalCost = 6;
        } else if (this.peopleCount === 5) {
          this.totalCost = 8;
        } else if (this.peopleCount === 6) {
          this.totalCost = 10;
        }

        // التحقق من التعارض مع الحجوزات السابقة
        const newBooking = {
          room: this.selectedRoom,
          start: new Date(this.startDateTime),
          end: new Date(this.endDateTime),
        };

        const conflictingBooking = this.bookings.find(
          (booking) =>
            booking.room === this.selectedRoom &&
            ((newBooking.start >= booking.start &&
              newBooking.start < booking.end) ||
              (newBooking.end > booking.start && newBooking.end <= booking.end))
        );

        if (conflictingBooking) {
          alert("هذه القاعة محجوزة في هذا الوقت.");
        } else {
          this.bookings.push(newBooking); // إضافة الحجز إلى قائمة الحجوزات
          this.bookingConfirmed = true;
        }
      } else {
        alert("يرجى تحديد وقت الحجز وعدد الأشخاص.");
      }
    },
  },
};
</script>
<style scoped>
/* باقي التنسيقات كما هي */
.people-input {
  width: calc(100% - 20px);
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.partone-container {
  display: flex;
  justify-content: space-around;
  margin: 20px auto;
  width: 100%;
  flex-wrap: wrap;
}

.partone {
  width: 300px;
  height: 410px;
  background-color: aquamarine;
  margin: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  transition: transform 1s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.partone:hover {
  transform: translateY(-10px);
}

.image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  transition: transform 0.5s ease;
  margin-bottom: 10px;
}

.button {
  background-color: #009688;
  color: white;
  font-size: 18px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-align: center;
}

.button:hover {
  background-color: #00796b;
}

.price {
  margin-top: 10px;
  font-size: 16px;
  color: #333;
}

.price-amount {
  font-size: 22px;
  color: #009688;
  font-weight: 700;
  padding-left: 5px;
  transition: transform 0.3s ease;
}

.price-amount:hover {
  transform: scale(1.1);
}

/* نافذة الحجز المنبثقة */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 300px;
  position: relative;
}

.modal-content h3 {
  text-align: center;
  color: #009688;
}

.time-input {
  width: calc(100% - 20px);
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* إضافة تعليمات للمستخدم */
.input-label {
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;
  font-weight: bold;
}

.date-time-container {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}

/* الزر للتأكيد */
.confirm-button {
  margin-top: 10px;
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.confirm-button:hover {
  background-color: #45a049;
}

.close-button {
  margin-top: 10px;
  background-color: #f44336;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.close-button:hover {
  background-color: #e53935;
}

.confirmation-message {
  margin-top: 10px;
  text-align: center;
  color: #333;
}

.professional-confirmation {
  background-color: #f1f8e9;
  border-left: 5px solid #4caf50;
  padding: 20px;
  margin-top: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  color: #333;
  position: relative;
  animation: fadeIn 0.8s ease-in-out;
}

.confirmation-icon {
  font-size: 24px;
  color: #4caf50;
  margin-right: 10px;
  vertical-align: middle;
}

.highlight {
  font-weight: bold;
  color: #009688;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.content {
  margin-top: 20%;
}
</style>
