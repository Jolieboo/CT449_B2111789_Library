import axios from "axios";
import { userAuthStore } from "@/store/auth.store";
const baseURL = "http://localhost:3000/api/DocGia";

class DocGiaService {
  async getAll() {
    return (await axios.get(`${baseURL}/`)).data.data;
  }
  async getDocGiabyId(id) {
    return (await axios.get(`${baseURL}/${id}`)).data;
  }
  async addDocGia(docgia) {
    return (
      await axios.post(`${baseURL}/`, docgia, {
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).data;
  }
  async deleteDocGiabyId(id) {
    const authStore = userAuthStore(); // Lấy trạng thái từ store
    if (!authStore.isAdmin) {
      throw new Error("Bạn không có quyền xóa sách!");
    }
    return (await axios.delete(`${baseURL}/${id}`)).data.data;
  }
  async updateDocGia(id, docgia) {
    console.log(docgia);
    return (
      await axios.put(`${baseURL}/${id}`, docgia, {
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).data;
  }
}
export default DocGiaService;
