<template lang="">
  <div class="navbar">
    <Logo />
    <BaseLayout />
    <Token />
  </div>
  <RouterView/>
</template>

<script setup>
import BaseLayout from "./BaseLayout.vue";
import Logo from "./Logo.vue";
import Token from "./Token.vue";
import { RouterView } from "vue-router";
</script>

<style scoped>
.navbar {
  margin: 0 auto;
  display: flex;
  gap: 20px;
  justify-content: space-around;
  align-items: center;
  padding: 5px 20px;
  background-color: #1e1e1e;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  border-bottom: 2px solid #333;
}

.navbar Logo {
  margin-right: 40px;
}
</style>
