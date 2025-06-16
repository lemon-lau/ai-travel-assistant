<template>
    <div class="page-container">
        <img class="bg-img" src="@/assets/bg.png" alt="" loading="lazy" />
        <MainPage />
    </div>
</template>

<script setup>
    import MainPage from './pages/MainPage.vue'
</script>

<style scoped>
    @import './assets/main.css';

    .bg-img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: -1;
    }

    .page-container {
        position: relative;
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }
</style>
