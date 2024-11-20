import { defineStore } from "pinia";
import router from "../router";
import authService from "@/services/auth.service";

export const userAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")), // Lấy user từ localStorage nếu có
    returnURL: null, // Đường dẫn chuyển hướng sau khi đăng nhập
  }),
  getters: {
    isAdmin() {
      return this.user?.isAdmin || false; // Kiểm tra quyền admin
    },
  },
  actions: {
    async login(user) {
      const response = await authService.login(user); // Gọi API
      this.user = response.data; // Lấy phần data từ phản hồi API
      localStorage.setItem("user", JSON.stringify(this.user)); // Lưu user vào localStorage
      console.log("Login success, isAdmin:", this.isAdmin); // Kiểm tra quyền admin
      router.push(this.returnURL || (this.isAdmin ? "/admin" : "/admin")); // Điều hướng theo quyền
      return this.user;
    },
    logout() {
      this.user = null; // Xóa thông tin user
      this.returnURL = null; // Reset đường dẫn chuyển hướng
      localStorage.removeItem("user"); // Xóa user trong localStorage
      router.push("/login"); // Chuyển hướng về trang đăng nhập
    },
  },
});
