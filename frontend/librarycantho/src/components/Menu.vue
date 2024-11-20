<template>
  <div class="d-flex pt-0">
    <!-- Sidebar -->
    <div class="bg-light" style="width: 250px; height: 100vh">
      <div class="list-group">
        <router-link
          to="/sach"
          class="list-group-item list-group-item-action"
          active-class="active"
        >
          Sách
        </router-link>
        <router-link
          to="/nxb"
          class="list-group-item list-group-item-action"
          active-class="active"
        >
          NXB
        </router-link>
        <router-link
          to="/nhanvien"
          class="list-group-item list-group-item-action"
          active-class="active"
        >
          Nhân viên
        </router-link>
        <router-link
          to="/docgia"
          class="list-group-item list-group-item-action"
          active-class="active"
        >
          Độc giả
        </router-link>
        <router-link
          to="/muonsach"
          class="list-group-item list-group-item-action"
          active-class="active"
        >
          Giao dịch
        </router-link>
      </div>

      <!-- Đăng xuất -->
      <button @click="logout" class="btn btn-danger w-100 mt-3">
        Đăng xuất
      </button>
    </div>

    <!-- Main Content -->
    <div class="flex-fill">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "Menu",
  methods: {
    logout() {
      // Xóa thông tin người dùng khỏi localStorage
      localStorage.removeItem("user");

      // Chuyển hướng về trang chủ
      this.$router.push("/");

      // Tự động reload lại trang sau khi chuyển về trang chủ
      setTimeout(() => {
        window.location.reload();
      }, 300); // Delay ngắn để đảm bảo router chuyển hướng trước khi reload
    },
  },
};
</script>

<style scoped>
.list-group-item {
  font-size: 1.2rem;
}

button {
  font-size: 1.1rem;
}
</style>
