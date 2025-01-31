<template>
  <div class="container">
    <h1>Welcome: {{ username }}</h1>
    <el-button
      type="primary"
      class="btn-logout"
      v-loading.fullscreen.lock="loading"
      @click="handleLogout"
      >Log out</el-button
    >
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
const router = useRouter();
const username = ref("");
const loading = ref(false);
onMounted(() => {
  const getUser = localStorage.getItem("user");
  username.value = getUser ? JSON.parse(getUser) : "Guest";
});
const handleLogout = () => {
  localStorage.removeItem("user");
  if (router.currentRoute.value.path !== "/login") {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      ElMessage({
        type: "success",
        title: "Logged out",
        message: "You have been logged out.",
        duration: 1500,
        offset: 20,
      });
      router.push("/");
    }, 2000);
  }
};
</script>
<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

h1 {
  font-size: 18px;
  font-weight: bolder;
  color: #333;
  margin-right: 20px;
}
</style>
