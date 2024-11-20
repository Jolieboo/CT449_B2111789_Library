<template>
  <div class="error-page">
    <h1 class="text-center text-danger">404 - Page Not Found</h1>
    <p class="text-center">
      Rất tiếc, trang bạn đang tìm không tồn tại hoặc bạn không có quyền truy
      cập.
    </p>
    <div class="text-center">
      <router-link to="/" class="btn btn-primary"
        >Quay lại Trang Chủ</router-link
      >
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.error-page {
  padding: 50px;
  text-align: center;
}
</style>
