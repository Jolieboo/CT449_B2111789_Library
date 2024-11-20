import axios from "axios";
import { userAuthStore } from "@/store/auth.store";
const baseURL = "http://localhost:3000/api/NXB";

class NXBService {
  async getAll() {
    return (await axios.get(`${baseURL}/`)).data.data;
  }
  async getNXBbyId(id) {
    return (await axios.get(`${baseURL}/${id}`)).data;
  }
  async addNXB(nxb) {
    return (
      await axios.post(`${baseURL}/`, nxb, {
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).data;
  }
  async deleteNXBbyId(id) {
    const authStore = userAuthStore(); // Lấy trạng thái từ store
    if (!authStore.isAdmin) {
      throw new Error("Bạn không có quyền xóa sách!");
    }
    return (await axios.delete(`${baseURL}/${id}`)).data.data;
  }
  async updateNXB(id, nxb) {
    console.log(nxb);
    return (
      await axios.put(`${baseURL}/${id}`, nxb, {
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).data;
  }
}

export default NXBService;
