<template>
  <div class="title">
    <h1 class="typing-animation">Testing CRUD Using Vue.js And Firebase</h1>
  </div>
  <div class="home">
    <img src="../assets/images/vuejs.png" alt="Vue.js Logo" class="logo" /><span
      >➕</span
    >
    <img src="../assets/images/firebase.png" alt="Firebase Logo" class="logo" />
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 80vh; */
}

.logo {
  width: 350px; /* Adjust the size as needed */
  height: auto;
  margin: 0 20px;
  transition: transform 0.3s ease;
  animation: logo-animation 3.5s infinite;
}

.logo:hover {
  transform: scale(1.1);
}

span {
  font-size: 40px;
}

@keyframes logo-animation {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
}

.typing-animation {
  font-size: 30px;
  overflow: hidden;
  border-right: 0.15em solid orange;
  white-space: nowrap;
  margin: 0 auto;
  letter-spacing: 0.15em;
  animation: typing 3.5s steps(50), blink-caret 0.75s step-end infinite;
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 40%;
  }
}

@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: orange;
  }
}
</style>
