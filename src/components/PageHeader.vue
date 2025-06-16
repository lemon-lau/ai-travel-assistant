<template>
    <header class="container">
        <a
            href="/"
            class="text-logo"
        >
            Shermans AI
        </a>
        <nav class="nav-container">
            <a href="https://www.shermanstravel.com/">
                Blog References
            </a>
            <a href="https://github.com/lemon-lau/lau-ai-travel-assistant-django">
                Github Repository
            </a>
            <a href="https://www.linkedin.com/in/lauex11">
                Contact Us
            </a>
            <button @click="emit('open-code-modal')">
                Admin Scrape
            </button>
        </nav>
    </header>
</template>

<script setup>
    const emit = defineEmits(['open-code-modal']);
</script>

<style scoped>
   .container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 5rem;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        background-color: rgba(var(--color-bg-rgb), 0.95);
        background-color: var(--color-bg);
        min-width: -webkit-fill-available;
    }

    .text-logo {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--color-text-dark);
        text-decoration: none;
        font-family: var(--font-heading);
        letter-spacing: -0.5px;
        transition: color 0.2s ease;
    }

    .text-logo:hover {
        color: var(--color-primary);
    }

    .nav-container a,
    .nav-container button {
        margin-left: 2rem;
        text-decoration: none;
        color: var(--color-text-dark);
        font-family: var(--font-body);
        font-weight: 500;
        font-size: 1.25rem;
        transition: color 0.2s ease;
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
    }

    .nav-container a:hover,
    .nav-container button:hover {
        color: var(--color-primary);
    }

    /* ========================================================= */
    /* MEDIA QUERIES                                           */
    /* ========================================================= */

    /* Mobile devices (max-width 768px) */
    @media (max-width: 768px) {
        .container {
            flex-direction: column;
            padding: 1rem;
            align-items: center;
        }

        .text-logo {
            margin-bottom: 0.5rem;
        }

        .nav-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
        }

        .nav-container a,
        .nav-container button {
            margin: 0.5rem 0.75rem;
            font-size: 1rem;
        }
    }

    @media (max-width: 480px) {
        .container {
            padding: 0.8rem;
        }

        .text-logo {
            font-size: 1.3rem;
        }

        .nav-container a,
        .nav-container button {
            margin: 0.4rem 0.5rem;
            font-size: 0.9rem;
        }
    }
</style>