<template>
    <main class="main-content">
        <section class="hero">
            <div class="hero-content">
                <h1 class="hero-text">
                    Plan your next trip with your
                    <span class="highlight">AI Travel Buddy</span>
                </h1>
                <p class="hero-subtext">
                    Get fast, personalized travel insights and cruise picks for Alaska,
                    Caribbean & Bahamas, Hawaii, and Northern Europe.
                </p>
                <div class="animated-search-container">
                    <div class="search-wrapper">
                        <input
                            v-model="newChatMessage"
                            @focus="stopTyping"
                            class="search-input"
                            type="text"
                            autocomplete="off"
                            @keyup.enter="emit('initialize-chat-panel', newChatMessage)"
                        />
                        <div
                            v-if="!newChatMessage"
                            class="input-overlay"
                        >
                        {{ typedPlaceholder }}<span v-if="typedPlaceholder" class="blinking-cursor">|</span>
                        </div>
                        <button
                            class="search-button"
                            :disabled="!newChatMessage"
                            @click="emit('initialize-chat-panel', newChatMessage)"
                        >
                            →
                        </button>
                    </div>
                </div>
        </div>
        </section>
        <aside class="content hero-mascot-container">
            <img
                src="@/assets/sherman_mascot.png"
                alt="Sherman AI"
                class="hero-mascot"
            />
        </aside>
    </main>
</template>

<script setup>
    import { ref, onMounted, onUnmounted, nextTick } from 'vue'

    const emit = defineEmits(['initialize-chat-panel'])

    const PROMPTS = [
        'Where to go?',
        'Alaska or Bahamas?',
        'Try Northern Europe!',
        'Hawaii sounds nice…',
        'Plan your cruise trip!',
    ]

    const newChatMessage = ref('');
    const typedPlaceholder = ref('')
    const currentPromptIndex = ref(0)
    const charIndex = ref(0)
    const isDeleting = ref(false)
    let typingTimer = null

    // HOOK FUNCTIONS
    onMounted(async () => {
        typedPlaceholder.value = ''
        charIndex.value = 0
        isDeleting.value = false
        currentPromptIndex.value = 0

        await nextTick()
        requestAnimationFrame(() => {
            setTimeout(() => {
                typeLoop()
            }, 50)
        })
    })

    onUnmounted(() => {
        clearTimeout(typingTimer)
    })


    // METHODS
    function stopTyping() {
        clearTimeout(typingTimer)
        typedPlaceholder.value = ''
    }

    function typeLoop() {
        const currentPrompt = PROMPTS[currentPromptIndex.value]

        if (!isDeleting.value) {
            if (typedPlaceholder.value === currentPrompt && charIndex.value === 0) {
                typedPlaceholder.value = ''
            }
            typedPlaceholder.value = currentPrompt.slice(0, charIndex.value++)
            if (charIndex.value > currentPrompt.length) {
                isDeleting.value = true
                setTimeout(typeLoop, 1500)
                return
            }
        } else {
            typedPlaceholder.value = currentPrompt.slice(0, charIndex.value--)
            if (charIndex.value === 0) {
                isDeleting.value = false
                currentPromptIndex.value = (currentPromptIndex.value + 1) % PROMPTS.length
            }
        }

        typingTimer = setTimeout(typeLoop, isDeleting.value ? 50 : 100)
    }
</script>

<style scoped>
    .main-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        height: calc(100vh - 5rem);
        padding-top: 5rem;
        overflow: hidden;
    }

    .hero {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 2rem 2rem 2rem 5rem;
        min-height: 80vh;
    }

    .hero-content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        max-width: 700px;
    }

    .hero-text {
        line-height: 1.2;
        font-family: var(--font-heading);
        font-weight: 700;
        font-size: 3em;
        color: var(--color-text);
        margin-top: 0.5em;
        margin-bottom: 1.25rem;
    }

    .hero-subtext {
        font-family: var(--font-main);
        font-weight: 500;
        font-size: 1.5rem;
        color: var(--color-subtext);
        line-height: 1.5;
        margin-bottom: 3.5rem;
    }

    .hero-text .highlight {
        color: var(--color-primary);
        font-weight: 700;
    }

    .hero-mascot-container {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .hero-mascot {
        max-width: 100%;
        max-height: 100vh;
        height: auto;
        object-fit: contain;
    }

    .animated-search-container {
        max-width: 500px;
        width: 100%;
    }

    .search-wrapper {
        position: relative;
        width: 100%;
        animation: fadeIn 1s ease-in;
    }

    .search-input {
        background-color: var(--color-bg);
        width: 100%;
        padding: 1rem 3.5rem 1rem 1.25rem;
        font-size: 1.125rem;
        border: 2px solid var(--color-border);
        border-radius: var(--border-radius-lg);
        outline: none;
        transition: border-color var(--transition-default);
        color: var(--color-text);
    }

    .search-input:focus {
        border-color: var(--color-primary);
    }

    .input-overlay {
        position: absolute;
        top: 50%;
        left: 1.25rem;
        transform: translateY(-50%);
        pointer-events: none;
        font-size: 1.125rem;
        color: var(--color-text);
        font-family: inherit;
        opacity: 0.6;
        white-space: nowrap;
    }

    .blinking-cursor {
        display: inline-block;
        margin-left: 2px;
        animation: blink 1s step-end infinite;
    }

    .search-button {
        position: absolute;
        top: 50%;
        right: 0.5rem;
        transform: translateY(-50%);
        background-color: var(--color-primary);
        color: white;
        border: none;
        font-size: 1.25rem;
        padding: 0.5rem 1rem;
        border-radius: var(--border-radius-md);
        cursor: pointer;
        transition: background-color 0.2s ease;
    }

    .search-button:hover {
        background-color: var(--color-primary-hover);
    }

    /* MEDIA QUERIES */

    @media (max-width: 768px) {
        .main-content {
            grid-template-columns: 1fr;
            height: auto;
            min-height: calc(100vh - 5rem);
            padding-top: 8rem;
            overflow-y: auto;
        }

        .hero {
            padding: 2rem 1rem;
            min-height: auto;
            justify-content: center;
            text-align: center;
        }

        .hero-content {
            align-items: center;
            max-width: 100%;
        }

        .hero-text {
            font-size: 2em;
            margin-top: 1em;
        }

        .hero-subtext {
            font-size: 1rem;
        }

        .hero-mascot-container {
            padding: 1rem;
        }

        .hero-mascot {
            max-width: 250px;
            margin-top: 1rem;
        }

        .animated-search-container {
            padding: 0 1rem;
        }

        .search-input {
            padding: 0.8rem 3rem 0.8rem 1rem;
            font-size: 1rem;
        }

        .input-overlay {
            left: 1rem;
            font-size: 1rem;
        }

        .search-button {
            padding: 0.4rem 0.8rem;
            font-size: 1rem;
            right: 0.4rem;
        }
    }

    @media (max-width: 480px) {
        .main-content {
            padding-top: 7rem;
        }

        .hero-text {
            font-size: 1.75em;
        }

        .hero-subtext {
            font-size: 0.9rem;
        }

        .hero-mascot {
            max-width: 200px;
        }

        .search-input {
            padding: 0.7rem 2.8rem 0.7rem 0.8rem;
            font-size: 0.9rem;
        }

        .input-overlay {
            left: 0.8rem;
            font-size: 0.9rem;
        }

        .search-button {
            padding: 0.3rem 0.7rem;
            font-size: 0.9rem;
        }
    }
</style>
