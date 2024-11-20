<script setup>
import Header from "../src/components/Header.vue";
import Footer from "./components/Footer.vue";
import HomePage from "./views/HomePage.vue";
</script>

<template>
  <div id="app">
    <Header />
    <div class="">
      <router-view />
    </div>
    <Footer />
  </div>
</template>
<script>
export default {
  components: {
    Header,
    Footer,
  },
};
</script>
<style scoped>
body {
  background-color: #e8f5e9; /* Light green background */
}
.page {
  max-width: 400px;
  margin: auto;
}
</style>
