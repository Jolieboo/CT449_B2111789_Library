<script setup>
import { ref, onMounted } from "vue";
import AuthService from "@/services/auth.service";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const user = ref(null);

function getUser() {
  user.value = AuthService.getCurrentUser();
}

function goToAdmin() {
  if (user.value) {
    router.push("/admin");
  } else {
    Swal.fire("Vui lòng đăng nhập", "", "warning");
  }
}
onMounted(() => {
  getUser();
});
</script>
<template>
  <header class="bg-success text-white p-3">
    <nav class="navbar navbar-expand-lg navbar-dark">
      <a class="navbar-brand" href="/">Can Tho Library</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li v-if="user">
            <router-link to="/admin">
              <button type="button" class="btn btn-light">
                <i class="fa-solid fa-house-chimney-user"></i></button
            ></router-link>
          </li>
          <li v-else class="nav-item">
            <a class="nav-link" href="/login">
              <button type="button" class="btn btn-light">Đăng nhập</button>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped></style>
