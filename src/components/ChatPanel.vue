<template>
    <div class="chat-panel-container">
        <div class="chat-messages" ref="chatMessagesContainer">
            <div
                v-for="message in messages"
                :key="message.id"
                :class="['message-bubble', message.sender === 'User' ? 'user-message' : 'ai-message']"
            >
                <div v-if="message.isLoading" class="loading-dots">
                    <span></span><span></span><span></span>
                </div>
                <template v-else>
                    <span>{{ message.text }}</span>
                    <div
                        v-if="message.sender === AI_NAME && message.sources && message.sources.length > 0"
                        class="message-sources"
                    >
                        Sources:
                        <span v-for="(source, index) in message.sources" :key="index">
                            <a
                                :href="source"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="source-link"
                            >
                                {{ source }}
                            </a>
                        <span v-if="index < message.sources.length - 1">, </span>
                        </span>
                    </div>
                </template>
            </div>
        </div>
        <div class="chat-input-area">
            <input
                v-model="newMessage"
                @keyup.enter="sendMessage"
                placeholder="Type your message..."
                class="chat-input"
            />
            <button
                @click="sendMessage"
                class="send-button"
            >
                Send
            </button>
        </div>
    </div>
</template>

<script setup>
    import { ref, watch, nextTick, onMounted } from 'vue';

    const props = defineProps({
        messages: {
            type: Array,
            required: true,
            default: () => []
        }
    });

    const emit = defineEmits(['send-message']);


    const AI_NAME = "Shermans AI"

    const newMessage = ref('');
    const chatMessagesContainer = ref(null);

    // METHODS
    const sendMessage = () => {
        if (newMessage.value.trim()) {
            emit('send-message', newMessage.value);
            newMessage.value = '';
        }
    };

    // Watch for changes in the messages array to scroll view to bottom
    watch(
        () => JSON.stringify(props.messages),
        async () => {
            await nextTick()
            if (chatMessagesContainer.value) {
            chatMessagesContainer.value.scrollTo({
                top: chatMessagesContainer.value.scrollHeight,
                behavior: 'smooth',
            })
            }
        },
        { immediate: true }
    )

    // Initial scroll to bottom on mount
    onMounted(() => {
        nextTick(() => {
            if (chatMessagesContainer.value) {
                chatMessagesContainer.value.scrollTo({
                    top: chatMessagesContainer.value.scrollHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
</script>

<style scoped>
    .chat-panel-container {
        display: flex;
        flex-direction: column;
        max-height: 80vh;
        border-radius: var(--border-radius-lg);
        background-color: rgba(255, 255, 255, 0.8);
        box-shadow: var(--shadow-md);
        overflow: hidden;
    }

    .chat-messages {
        flex-grow: 1;
        padding: 1rem;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        scroll-behavior: smooth;
        font-family: var(--font-main);
    }

    .message-bubble {
        padding: 0.75rem 1rem;
        border-radius: 18px;
        max-width: 80%;
        word-wrap: break-word;
        line-height: 1.4;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    }

    .user-message {
        align-self: flex-end;
        background-color: var(--color-primary);
        color: white;
        border-bottom-right-radius: 4px;
    }

    .ai-message {
        align-self: flex-start;
        background-color: #f0f2f5;
        color: #333;
        border-bottom-left-radius: 4px;
    }

    .sender-name {
        font-weight: 700;
        margin-right: 0.25rem;
    }

    /* Loading dots animation */
    .loading-dots {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 1.5rem;
        padding: 0.5rem 0;
    }

    .loading-dots span {
        display: inline-block;
        width: 8px;
        height: 8px;
        background-color: #555;
        border-radius: 50%;
        margin: 0 2px;
        animation: bounce 0.6s infinite alternate;
    }

    .loading-dots span:nth-child(2) {
        animation-delay: 0.1s;
    }

    .loading-dots span:nth-child(3) {
        animation-delay: 0.2s;
    }

    @keyframes bounce {
        0% { transform: translateY(0); }
        100% { transform: translateY(-5px); }
    }

    /* Message sources */
    .message-sources {
        margin-top: 0.5rem;
        font-size: 0.75rem;
        color: #666;
        border-top: 1px solid rgba(0, 0, 0, 0.05);
        padding-top: 0.3rem;
    }

    .source-link {
        color: var(--color-primary);
        text-decoration: none;
        word-break: break-word;
    }

    .source-link:hover {
        text-decoration: underline;
    }

    /* Chat input area */
    .chat-input-area {
        display: flex;
        padding: 1rem;
        border-top: 1px solid var(--color-border);
        background-color: #fff;
    }

    .chat-input {
        flex-grow: 1;
        padding: 0.75rem 1rem;
        border: 1px solid var(--color-border);
        border-radius: 20px;
        outline: none;
        font-size: 1rem;
        transition: border-color var(--transition-default);
        font-family: var(--font-main);
    }

    .chat-input:focus {
        border-color: var(--color-primary);
    }

    .send-button {
        background-color: var(--color-primary);
        color: white;
        border: none;
        padding: 0.75rem 1.25rem;
        border-radius: 20px;
        margin-left: 0.75rem;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 500;
        font-family: var(--font-heading);
        transition: background-color var(--transition-default), transform 0.1s ease;
    }

    .send-button:hover {
        background-color: var(--color-primary-hover);
        transform: translateY(-1px);
    }

    .send-button:active {
        transform: translateY(0);
    }

    /* Responsive Media Queries */
    @media (max-width: 768px) {
        .chat-panel-container {
            border-radius: 0;
            box-shadow: none;
        }

        .chat-messages {
            padding: 0.75rem;
            gap: 0.5rem;
        }

        .message-bubble {
            padding: 0.6rem 0.9rem;
            font-size: 0.9rem;
            max-width: 90%;
        }

        .chat-input-area {
            padding: 0.75rem;
        }

        .chat-input {
            padding: 0.6rem 0.8rem;
            font-size: 0.9rem;
        }

        .send-button {
            padding: 0.6rem 1rem;
            font-size: 0.9rem;
            margin-left: 0.5rem;
        }

        .message-sources {
            font-size: 0.7rem;
        }
    }

    @media (max-width: 480px) {
        .chat-messages {
            padding: 0.5rem;
            gap: 0.4rem;
        }

        .message-bubble {
            padding: 0.5rem 0.75rem;
            font-size: 0.85rem;
            max-width: 95%;
        }

        .chat-input-area {
            padding: 0.5rem;
        }

        .chat-input {
            padding: 0.5rem 0.7rem;
            font-size: 0.85rem;
        }

        .send-button {
            padding: 0.5rem 0.9rem;
            font-size: 0.85rem;
            margin-left: 0.4rem;
        }

        .message-sources {
            font-size: 0.65rem;
        }
    }
</style>
