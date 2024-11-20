<template>
  <div class="">
    <div class="row"></div>
    <Menu></Menu>
  </div>
</template>
<script setup>
import Menu from "../components/Menu.vue";
</script>
<style>
.background-image {
  background-image: url("../assets/img/bg-login.png"); /* Đặt URL hình nền của bạn */
  background-size: cover; /* Làm cho hình nền phủ đầy phần tử */
  background-position: center; /* Căn giữa hình nền */
  padding: 0; /* Tùy chỉnh khoảng cách bên trong */
  border-radius: 10px; /* Tùy chọn bo góc */
}
</style>
