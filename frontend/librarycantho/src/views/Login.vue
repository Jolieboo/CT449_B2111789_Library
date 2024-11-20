<script setup>
import { reactive, ref } from "vue";
import { userAuthStore } from "@/store/auth.store";
import Swal from "sweetalert2";

const authStore = userAuthStore();
const SoDienThoai = ref("");
const Password = ref("");
const error = reactive({ SoDienThoai: null, Password: null });

async function onSubmit() {
  try {
    const result = await authStore.login({
      SoDienThoai: SoDienThoai.value,
      Password: Password.value,
    });
    error.SoDienThoai = null;
    error.Password = null;
    Swal.fire({
      title: "Thành công!",
      text: "Bạn đã đăng nhập thành công!",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      // Tự động tải lại trang sau khi thông báo thành công
      window.location.reload();
    });
  } catch (errMessage) {
    Swal.fire({
      title: "Lỗi!",
      text: `Đăng nhập thất bại: Sai SĐT hoặc Mật khẩu`,
      icon: "error",
      confirmButtonText: "Thử lại",
    });
  }
}
</script>
<template>
  <div class="background-image">
    <div class="row">
      <div class="col-md-6 mx-auto card border m-5 form-shadow">
        <form @submit.prevent="onSubmit">
          <div class="pt-2 d-flex justify-content-center">
            <h1 class="text-success">Đăng nhập</h1>
          </div>
          <div class="form-group pt-3">
            <label for="exampleInputPhoneNumber">Phone number</label>
            <input
              type="text"
              class="form-control"
              id="SoDienThoai"
              aria-describedby="Phonenumber"
              placeholder="Enter your phone number"
              v-model="SoDienThoai"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              v-model="Password"
            />
            <small id="emailHelp" class="form-text text-muted"
              >We'll never share your password with anyone else.</small
            >
          </div>

          <div class="form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
            />
            <label class="form-check-label" for="exampleCheck1"
              >Remember me</label
            >
          </div>
          <div class="text-center pt-2 pb-4">
            <button type="submit" class="btn btn-success btn-block">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
};
</script>
<style>
.background-image {
  background-image: url("../assets/img/bg-login.png"); /* Đặt URL hình nền của bạn */
  background-size: cover; /* Làm cho hình nền phủ đầy phần tử */
  background-position: center; /* Căn giữa hình nền */
  padding: 20px; /* Tùy chỉnh khoảng cách bên trong */
  border-radius: 10px; /* Tùy chọn bo góc */
}

.form-shadow {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Bóng mềm */
  padding: 20px; /* Tùy chỉnh khoảng cách bên trong */
  border-radius: 10px; /* Tùy chọn bo góc */
  background-color: white; /* Đảm bảo nền là màu trắng */
}
</style>
