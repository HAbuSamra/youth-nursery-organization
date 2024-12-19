<template>
    <div class="maintenance-container">
        <div class="maintenance-content">
            <h1>الصيانة جارية حالياً</h1>
            <p>نحن نعمل على تحسين الموقع. نعتذر عن الإزعاج، يرجى المحاولة لاحقاً.</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MaintenancePage',
};
</script>

<style scoped>
.maintenance-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #ffffff;
    animation: fadeIn 2s ease-in-out;
}

.maintenance-content {
    text-align: center;
    padding: 40px;
    background-color: #ac8d8d; /* اللون الثاني */
    color: #ffffff; /* النص باللون الأبيض */
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    animation: scaleIn 1s ease-out;
}

h1 {
    color: #ffffff; /* اللون الأبيض */
    font-size: 2.5em;
    margin-bottom: 20px;
    animation: slideInTop 1s ease-out;
}

p {
    color: #ffffff; /* النص باللون الأبيض */
    font-size: 1.2em;
    animation: fadeInText 2s ease-out;
}

/* تأثير الأنيميشن */
@keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@keyframes scaleIn {
    0% {
        transform: scale(0.8);
    }
    100% {
        transform: scale(1);
    }
}

@keyframes slideInTop {
    0% {
        transform: translateY(-50px);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes fadeInText {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>
