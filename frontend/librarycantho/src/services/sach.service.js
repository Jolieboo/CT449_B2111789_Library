import axios from "axios";
import { userAuthStore } from "@/store/auth.store";
const baseURL = "http://localhost:3000/api/Sach";
class SachService {
  async addSach(SachData) {
    return (
      await axios.post(`${baseURL}/`, SachData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).data;
  }
  async getAll() {
    return (await axios.get(`${baseURL}/`)).data.data;
  }

  async getSachbyId(id) {
    return (await axios.get(`${baseURL}/${id}`)).data;
  }
  async updateSach(id, sach) {
    console.log(sach);
    return (
      await axios.put(`${baseURL}/${id}`, sach, {
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).data;
  }
  async deleteSachbyId(id) {
    const authStore = userAuthStore(); // Lấy trạng thái từ store
    if (!authStore.isAdmin) {
      throw new Error("Bạn không có quyền xóa sách!");
    }
    return (await axios.delete(`${baseURL}/${id}`)).data.data;
  }
  async getSachByTen(TenSach) {
    const response = await axios.get(`/api/sach`, {
      params: { TenSach },
    });
    return response.data.data;
  }
}

export default SachService;
