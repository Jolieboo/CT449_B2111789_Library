import axios from "axios";
import { userAuthStore } from "@/store/auth.store";
const baseURL = "http://localhost:3000/api/MuonSach";
class MuonSachService {
  async getAll() {
    return (await axios.get(`${baseURL}/`)).data;
  }
  async getMSbyId(id) {
    return (await axios.get(`${baseURL}/${id}`)).data;
  }
  async addMS(muonsach) {
    return (
      await axios.post(`${baseURL}/`, muonsach, {
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).data;
  }
  async deleteMuonSachbyId(id) {
    const authStore = userAuthStore(); // Lấy trạng thái từ store
    if (!authStore.isAdmin) {
      throw new Error("Bạn không có quyền xóa sách!");
    }
    return (await axios.delete(`${baseURL}/${id}`)).data.data;
  }
  async updateMuonSach(id, muonsach) {
    console.log(muonsach);
    return (
      await axios.patch(`${baseURL}/${id}`, muonsach, {
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).data;
  }
}
export default MuonSachService;
