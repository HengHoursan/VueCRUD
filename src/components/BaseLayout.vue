<template lang="">
  <div>
    <router-link to="/">Home</router-link>
    <router-link to="/product">Product</router-link>
    <router-link to="/about">About</router-link>
  </div>
</template>

<script>
export default {
  name: "BaseLayout",
};
</script>

<style scoped>
div {
  margin: 0 auto;
  display: flex;
  padding: 10px;
  gap: 50px;
}

a {
  font-size: 25px;
  text-decoration: none;
  color: white;
  font-weight: bold;
  transition: color 0.3s;
}

a:hover {
  color: dodgerblue
  /* text-decoration: underline; */
}

a.router-link-active {
  color: dodgerblue !important;
  /* text-decoration: underline; */
}

.profile-image {
  width: 100px;
  height: auto;
  border-radius: 50%;
}
</style>
