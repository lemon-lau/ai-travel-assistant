<template>
     <main class="chat-page-layout">
        <section class="mascot-side">
            <img
                src="@/assets/sherman_mascot_up.png"
                alt="Sherman AI"
                class="hero-mascot-up"
            />
            <h2 class="chat-greeting-text">Welcome aboard!</h2>
        </section>
        <section class="chat-panel-side">
            <ChatPanel
                :messages="props.messages"
                @send-message="emit('submit-message', $event)"
            />
        </section>
    </main>
</template>

<script setup>
    import ChatPanel from './ChatPanel.vue'

    const props = defineProps({
        messages: {
            type: Array,
            required: true,
            default: () => []
        }
    });

    const emit = defineEmits(['submit-message']);

</script>

<style scoped>
    .chat-page-layout {
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: flex-start;
        justify-content: flex-start;
        height: 100vh;
        padding-top: 5rem;
        overflow: hidden;
    }

    .mascot-side {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        height: 100%;
        overflow-y: auto;
    }

    .hero-mascot-up {
        max-width: 100%;
        max-height: 80vh;
        height: auto;
        object-fit: contain;
    }

    .chat-greeting-text {
        font-family: var(--font-heading);
        font-weight: 600;
        font-size: 1.5rem;
        color: var(--color-text);
        text-align: center;
        line-height: 1.4;
        margin-top: 0;
    }

    .chat-panel-side {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 1rem;
    }

    /* ========================================================= */
    /* MEDIA QUERIES                                             */
    /* ========================================================= */

    @media (max-width: 768px) {
        .chat-page-layout {
            grid-template-columns: 1fr;
            padding-top: 8rem;
            height: auto;
            overflow-y: auto;
        }

        .mascot-side {
            padding: 1rem;
            height: auto;
        }

        .hero-mascot-up {
            max-width: 120px;
            margin-bottom: 1rem;
        }

        .chat-greeting-text {
            font-size: 1.2rem;
        }

        .chat-panel-side {
            padding: 1rem;
            height: 60vh;
            max-height: 60vh;
            overflow-y: auto;
            box-shadow: none;
            border-top: 1px solid var(--color-border);
        }
    }

    @media (max-width: 480px) {
        .chat-page-layout {
            padding-top: 7rem;
        }

        .hero-mascot-up {
            max-width: 100px;
        }

        .chat-greeting-text {
            font-size: 1rem;
        }

        .chat-panel-side {
            height: 70vh;
            max-height: 70vh;
        }
    }
</style>