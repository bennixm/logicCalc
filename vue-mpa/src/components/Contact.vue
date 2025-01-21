<template>
<div class="section page contact">
  <div class="overlay shadow-overlay">
      <div class="container">
      <div class="title-container multiple-titles">
        <span class="title xl-title">Contact</span>
        <span class="mini-title">Write a message</span>
      </div>
      </div>
    </div>
  </div>
<div class="section ai-bot">
<div class="overlay black-overlay">
<div class="container">
<div class="chat-container">
  <div class="chat-window">
    <div class="chat-head">
      <div class="chat-img"></div>
      <div class="chat-bot-name">Logicus</div>
    </div>
    <div class="chat-content">
      <div v-for="message in messages" :key="message.id" class="message">
        <div v-if="message.type === 'user'" class="message-text user-message">{{ message.text }}</div>
        <div v-if="message.type === 'ai'" class="message-text ai-message">{{ message.text }}</div>
      </div>
    </div>
    <input
      v-model="userInput"
      @keyup.enter="sendMessage"
      placeholder="Ask me anything!"
      class="chat-input"
    />
  </div>
</div>
  <div class="logiBot">

  </div>
</div>
</div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: "ContactPage",
  data() {
    return {
      userInput: '',
      messages: [],
    };
  },
  methods: {
    async sendMessage() {
      if (!this.userInput) return;

      const userMessage = { type: 'user', text: this.userInput };
      this.messages.push(userMessage);

      try {
        const response = await axios.post('http://localhost:3000/ask', {
          query: this.userInput,
        });

        const aiMessage = { type: 'ai', text: response.data.answer };
        this.messages.push(aiMessage);
      } catch (error) {
        console.error('Error:', error);
        const aiMessage = { type: 'ai', text: 'Sorry, something went wrong!' };
        this.messages.push(aiMessage);
      }

      this.userInput = '';
    },
  },
};
</script>
