import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // set to true if using auth/session cookies
})

// === CHAT API ===
export async function sendMessageToChat(chat) {
    try {
        return api.post('/chat/', chat)
    } catch (err) {
        return err;
    }
}

// === SCRAPE API ===
export async function scrapeData() {
    try {
        return api.patch('/scrape/')
    } catch (err) {
        return err;
    }
}

// === HISTORY API ===
export async function getHistory() {
    try {
        return api.get('/history/')
    } catch (err) {
        return err;
    }
}


// === HEALTH CHECK ===
export async function checkHealth() {
    try {
        return api.get('/')
    } catch (err) {
        return err;
    }
}