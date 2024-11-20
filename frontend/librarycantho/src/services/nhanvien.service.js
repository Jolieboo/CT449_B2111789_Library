import axios from "axios";
import { userAuthStore } from "@/store/auth.store";
import Swal from "sweetalert2";
const baseURL = "http://localhost:3000/api/NhanVien";

class NhanVienService {
  async getAll() {
    return (await axios.get(`${baseURL}/`)).data;
  }
  async getNVbyId(id) {
    return (await axios.get(`${baseURL}/${id}`)).data.data;
  }
  async addNV(nv) {
    const authStore = userAuthStore(); // Lấy trạng thái từ store
    if (!authStore.isAdmin) {
      throw new Error("Bạn không có quyền xóa sách!");
    }
    return (
      await axios.post(`${baseURL}/`, nv, {
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).data;
  }
  async deleteNVbyId(id) {
    const authStore = userAuthStore(); // Lấy trạng thái từ store
    if (!authStore.isAdmin) {
      throw new Error("Bạn không có quyền xóa sách!");
    }
    return (await axios.delete(`${baseURL}/${id}`)).data.data;
  }
  async updateNV(id, nhanvien) {
    const authStore = userAuthStore(); // Lấy trạng thái từ store
    if (!authStore.isAdmin) {
      throw new Error("Bạn không có quyền xóa sách!");
    }

    return (
      await axios.patch(`${baseURL}/${id}`, nhanvien, {
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).data;
  }
}
export default NhanVienService;
