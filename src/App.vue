<template>
    <div class="page-container">
        <MainPage />
    </div>
</template>

<script setup>
    import MainPage from './pages/MainPage.vue'
</script>

<style scoped>
    @import './assets/main.css';

    .page-container {
        position: relative;
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        background-image: url('@/assets/bg.png');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center 65%;
        background-color: var(--color-bg);
    }
</style>
