
<template>
    <PageHeader @open-code-modal="showCodeModal=true" />
    <transition name="slide-fade" mode="out-in">
        <PageSectionChat
            v-if="showChatPanel"
            :messages="chatMessages"
            @submit-message="submitMessage"
        />
        <PageSectionHero
            v-else
            @initialize-chat-panel="initializeChatPanel"
        />
    </transition>
    <CodeModal
        v-if="showCodeModal"
        :is-loading-code="isLoadingCode"
        @scrape-data="scrapeArticleData"
        @close-modal="closeCodeModal
    "/>
</template>

<script setup>
    import { ref } from 'vue'
    import PageHeader from '../components/PageHeader.vue';

    import PageSectionHero from '../components/PageSectionHero.vue';
    import PageSectionChat from '../components/PageSectionChat.vue';

    import CodeModal from '../components/CodeModal.vue';

    import { sendMessageToChat, scrapeData, getHistory } from '@/api'

    const AI_NAME = "Shermans AI";

    const showCodeModal = ref(false);
    const isLoadingCode = ref(false);

    const showChatPanel = ref(false);
    const chatMessages = ref([]);


    async function initializeChatPanel(newChatMessage) {
        if (!newChatMessage.trim()) return;

        const response = await getHistory();
        chatMessages.value = response.data.reduce((msgArr, msg) => {
            msgArr.unshift({
                id: msg.id,
                sender: AI_NAME,
                text: msg.answer,
                sources: msg.sources,
                isLoading: false,
            });
            msgArr.unshift({
                id: msg.id,
                sender: 'User',
                text: msg.question,
                sources: [],
                isLoading: false
            });
            return msgArr;
        }, [])

        showChatPanel.value = true;
        submitMessage(newChatMessage.trim());
    }

    async function submitMessage(message) {
        if (!message.trim()) return;

        const prompt = message.trim();
        const userMsgId = Date.now();

        chatMessages.value.push({
            id: userMsgId,
            sender: 'User',
            text: prompt,
        })

        const loadingId = userMsgId + 1
        chatMessages.value.push({
            id: loadingId,
            sender: AI_NAME,
            isLoading: true,
        });

        try {
            const payload = { question: prompt };
            const response = await sendMessageToChat(payload);
            chatMessages.value[chatMessages.value.length - 1] = {
                id: loadingId,
                sender: AI_NAME,
                text: response.data.answer,
                sources: response.data.sources,
                isLoading: false,
            };
        } catch (err) {
            chatMessages.value[chatMessages.value.length - 1] = {
                id: loadingId,
                sender: AI_NAME,
                text: 'Sorry, something went wrong.',
                isLoading: false,
            };
            console.error('Chat error:', err);
        }
    }

    const scrapeArticleData = async () => {
        try {
            await scrapeData();
            isLoadingCode.value = false;
            setTimeout(() => {
                closeCodeModal();
            }, 2000)
        } catch (err) {
            console.error('Scrape error:', err);
        }
    };

    const closeCodeModal = () => {
        showCodeModal.value = false;
    };
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap');

    /* Transition Styles */
    .slide-fade-enter-active, .slide-fade-leave-active {
        transition: all 0.5s ease;
        position: absolute;
        width: 100%;
        top: 5rem; /* Adjust top to account for fixed header */
        left: 0;
        right: 0;
        bottom: 0;
    }

    .slide-fade-enter-from {
        opacity: 0;
        transform: translateX(100%);
    }
    .slide-fade-leave-to {
        opacity: 0;
        transform: translateX(-100%);
    }

    /* ========================================================= */
    /* MEDIA QUERIES                                           */
    /* ========================================================= */

    /* Mobile devices (max-width 768px) */
    @media (max-width: 768px) {
        .slide-fade-enter-active, .slide-fade-leave-active {
            top: 8rem;
        }
    }

    /* Small mobile devices (max-width 480px) */
    @media (max-width: 480px) {
        .slide-fade-enter-active, .slide-fade-leave-active {
            top: 7rem;
        }
    }
</style>
