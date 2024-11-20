import createApiClient from "../api.service";
import { userAuthStore } from "../store/auth.store";
import axios from "axios";

const authURL = "http://localhost:3000/api/auth";
class AuthService {
  async login(user) {
    try {
      const response = await axios.post("/api/auth/login", user);
      return response.data; // Trả về dữ liệu từ backend
    } catch (error) {
      // Ném lỗi cụ thể để frontend hiển thị
      throw (
        error.response?.data || { message: "Không thể kết nối đến server." }
      );
    }
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
