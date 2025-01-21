<template lang="">
  <div class="navbar">
    <Logo />
    <BaseLayout />
  </div>
  <router-view></router-view>
</template>

<script>
import Logo from "./Logo.vue";
import BaseLayout from "./BaseLayout.vue";

export default {
  components: {
    Logo,
    BaseLayout,
  },
};
</script>

<style scoped>
.navbar {
  margin: 0 auto;
  display: flex;
  gap: 20px;
  justify-content: space-between; /* Space between items */
  align-items: center;
  padding: 5px 20px; /* Adjusted padding */
  background-color: #1e1e1e; /* Dark background */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); /* Subtle shadow */
  border-bottom: 2px solid #333; /* Bottom border */
}

.navbar Logo {
  margin-right: 40px;
}

</style>
