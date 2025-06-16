<template>
    <div  class="modal-overlay">
        <div class="modal-content">
            <h3>Enter Your Code</h3>
            <textarea
                v-model="codeInput"
                class="code-input-textarea"
                placeholder="Paste your code here..."
                :disabled="props.isLoadingCode"
            />
            <div
                v-if="codeValidationMessage"
                :class="['validation-message', codeValidationCorrect ? 'correct' : 'incorrect']"
            >
                {{ codeValidationMessage }}
            </div>
            <div class="modal-actions">
                <button
                    class="modal-button submit-button"
                    :disabled="props.isLoadingCode"
                    @click="validateCode"
                >
                    <span
                        v-if="props.isLoadingCode"
                        class="spinner"
                    />
                    <span v-else>Submit Code</span>
                </button>
                <button
                    class="modal-button cancel-button"
                    :disabled="props.isLoadingCode"
                    @click="emit('close-modal')"
                >
                    Close
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'

    const props = defineProps({
        isLoadingCode: {
            type: Boolean,
            default: false
        }
    })

    const emit = defineEmits(['scrape-data', 'close-modal'])

    // Modal related state
    const codeInput = ref('');
    const codeValidationMessage = ref('');
    const codeValidationCorrect = ref(false);

    const validateCode = () => {
        const code = import.meta.env.VITE_WEB_SCRAPER_CODE
        if (codeInput.value.trim() === code) {
            codeValidationMessage.value = 'Correct! Your code is valid. Starting web scraping...';
            codeValidationCorrect.value = true;
            emit('scrape-data')
        } else {
            codeValidationMessage.value = 'Incorrect. Please try again.';
            codeValidationCorrect.value = false;
        }
    };
</script>

<style scoped>
    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100;
        backdrop-filter: blur(5px);
    }

    .modal-content {
        background-color: var(--color-bg);
        padding: 2rem;
        border-radius: var(--border-radius-lg);
        box-shadow: var(--shadow-md);
        width: 90%;
        max-width: 500px;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        font-family: var(--font-main);
    }

    .modal-content h3 {
        margin-top: 0;
        margin-bottom: 0.5rem;
        color: var(--color-text);
        font-family: var(--font-heading);
        text-align: center;
    }

    .code-input-textarea {
        width: calc(100% - 20px);
        min-height: 150px;
        padding: 10px;
        border: 1px solid var(--color-border);
        border-radius: var(--border-radius-md);
        font-family: monospace;
        font-size: 0.9rem;
        resize: vertical;
        outline: none;
        transition: border-color var(--transition-default);
    }

    .code-input-textarea:focus {
        border-color: var(--color-primary);
    }

    .validation-message {
        padding: 0.75rem;
        border-radius: var(--border-radius-md);
        text-align: center;
        font-weight: 500;
    }

    .validation-message.correct {
        background-color: var(--color-success-bg);
        color: var(--color-success-text);
    }

    .validation-message.incorrect {
        background-color: var(--color-error-bg);
        color: var(--color-error-text);
    }

    .modal-actions {
        display: flex;
        justify-content: flex-end;
        gap: 0.75rem;
        margin-top: 1rem;
    }

    .modal-button {
        padding: 0.75rem 1.5rem;
        border-radius: 20px;
        cursor: pointer;
        font-size: 0.9rem;
        font-weight: 500;
        transition: background-color var(--transition-default), transform 0.1s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }

    .modal-button.submit-button {
        background-color: var(--color-primary);
        color: white;
        border: none;
    }

    .modal-button.submit-button:hover {
        background-color: var(--color-primary-hover);
    }

    .modal-button.cancel-button {
        background-color: #6c757d;
        color: white;
        border: none;
    }

    .modal-button.cancel-button:hover {
        background-color: #5a6268;
    }

    /* Spinner */
    .spinner {
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-top: 4px solid #fff;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>