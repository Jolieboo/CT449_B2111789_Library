<template>
  <div class="container mt-4">
    <h2 class="text-center">Thêm Mượn Sách</h2>
    <div class="col-md-6 offset-md-3">
      <form @submit.prevent="addMuonSach">
        <!-- Mã Độc Giả -->
        <div class="form-group">
          <label for="MaDocGia">Mã Độc Giả</label>
          <select v-model="muonSach.MaDocGia" class="form-control" required>
            <option value="">Chọn Độc Giả</option>
            <option
              v-for="docgia in docgiaList"
              :key="docgia._id"
              :value="docgia._id"
            >
              {{ docgia.HoLot }} {{ docgia.Ten }}
            </option>
          </select>
        </div>

        <!-- Mã Sách -->
        <div class="form-group">
          <label for="MaSach">Mã Sách</label>
          <select v-model="muonSach.MaSach" class="form-control" required>
            <option value="">Chọn Sách</option>
            <option v-for="sach in sachList" :key="sach._id" :value="sach._id">
              {{ sach.TenSach }}
            </option>
          </select>
        </div>

        <!-- Mã Nhân Viên -->
        <div class="form-group">
          <label for="MaNV">Mã Nhân Viên</label>
          <select v-model="muonSach.MaNV" class="form-control" required>
            <option value="">Chọn Nhân Viên</option>
            <option
              v-for="nhanvien in nhanvienList"
              :key="nhanvien._id"
              :value="nhanvien._id"
            >
              {{ nhanvien.HoTenNV }}
            </option>
          </select>
        </div>

        <!-- Trạng Thái -->
        <div class="form-group">
          <label for="TrangThai">Trạng Thái</label>
          <select v-model="muonSach.TrangThai" class="form-control" required>
            <option value="Chưa trả">Chưa trả</option>
            <option value="Đã trả">Đã trả</option>
          </select>
        </div>

        <!-- Nút Thêm Mượn Sách -->
        <div class="form-group text-center">
          <button type="submit" class="btn btn-primary">Thêm Mượn Sách</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import MuonSachService from "@/services/muonsach.service"; // Dịch vụ MuonSach
import DocGiaService from "@/services/docgia.service"; // Dịch vụ DocGia
import SachService from "@/services/sach.service"; // Dịch vụ Sach
import NhanVienService from "@/services/nhanvien.service"; // Dịch vụ NhanVien
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

export default {
  name: "AddMuonSach",
  setup() {
    const muonSach = ref({
      MaDocGia: "",
      MaSach: "",
      MaNV: "",
      TrangThai: "Chưa trả", // Mặc định là "Chưa trả"
    });

    const docgiaList = ref([]);
    const sachList = ref([]);
    const nhanvienList = ref([]);
    const router = useRouter();

    const muonSachService = new MuonSachService();
    const docgiaService = new DocGiaService();
    const sachService = new SachService();
    const nhanvienService = new NhanVienService();

    // Lấy tất cả các dữ liệu khi trang được tải
    onMounted(async () => {
      try {
        docgiaList.value = await docgiaService.getAll();
        sachList.value = await sachService.getAll();
        nhanvienList.value = await nhanvienService.getAll();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Không thể tải danh sách dữ liệu.",
        });
        console.error("Lỗi khi tải danh sách:", error.message);
      }
    });

    // Thêm Mượn Sách
    const addMuonSach = async () => {
      try {
        await muonSachService.addMS(muonSach.value);
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: "Mượn sách đã được thêm thành công!",
        });
        // Reset form sau khi thêm thành công
        muonSach.value = {
          MaDocGia: "",
          MaSach: "",
          MaNV: "",
          TrangThai: "Chưa trả",
        };
        router.push("/muonsach");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Không thể thêm mượn sách.",
        });
        console.error("Lỗi khi thêm mượn sách:", error.message);
      }
    };

    return {
      muonSach,
      docgiaList,
      sachList,
      nhanvienList,
      addMuonSach,
    };
  },
};
</script>

<style scoped>
/* Tùy chỉnh giao diện */
</style>
