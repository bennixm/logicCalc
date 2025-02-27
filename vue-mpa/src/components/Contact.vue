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
<div class="section contact-section-form">
<div class="overlay white-overlay">
<div class="container">
  <form @submit.prevent="submitForm" class="contact-form">
    <div class="container-title-sec">Send us a message!</div>
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="form.name" required />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="form.email" required />
          </div>
          <div class="form-group">
            <label for="phone">Phone</label>
            <input type="tel" id="phone" v-model="form.phone" />
          </div>
          <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" v-model="form.message" required></textarea>
          </div>
          <div class="button-calc-wrapper">
                <button type="submit" class="border-animation-button">
                    <span class="button-text">Send</span>
                    <div class="border-top"></div>
                    <div class="border-right"></div>
                    <div class="border-bottom"></div>
                    <div class="border-left"></div>
                </button>
        </div>
        </form>
        <div class="assistance-form">
          <i class="fa fa-commenting-o" aria-hidden="true"></i>
          <span class="p-assist">We are here to help you with any issues you encounter on our platform!</span>
        </div>
</div>
</div>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "ContactPage",
  data() {
    return {
      form: {
        name: "",
        email: "",
        phone: "",
        message: "",
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post("/api/send-email", this.form);
        alert("Message sent successfully!");
        // Reset form after successful submission
        this.form = { name: "", email: "", phone: "", message: "" };
      } catch (error) {
        alert("Failed to send message. Please try again.");
      }
    },
  },
};
</script>