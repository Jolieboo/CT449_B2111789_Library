<script setup>
import { ref, onMounted } from "vue";
import SachService from "@/services/sach.service";
import Swal from "sweetalert2";
import NhanVienService from "@/services/nhanvien.service";
import DocGiaService from "@/services/docgia.service";
import MuonSachService from "@/services/muonsach.service";

const sachService = new SachService();
const nhanvienService = new NhanVienService();
const docgiaService = new DocGiaService();
const muonsachService = new MuonSachService();

const muonsachList = ref([]);

// Lấy dữ liệu mượn sách khi trang được tải
async function fetchMuonSach() {
  try {
    const data = await muonsachService.getAll();
    // Làm giàu dữ liệu mượn sách với thông tin sách, độc giả và nhân viên
    const enrichedData = await Promise.all(
      data.map(async (muonsach) => {
        try {
          const sach = await sachService.getSachbyId(muonsach.MaSach);
          const docgia = await docgiaService.getDocGiabyId(muonsach.MaDocGia);
          const nhanvien = await nhanvienService.getNVbyId(muonsach.MaNV);

          return {
            ...muonsach,
            TenSach: sach.TenSach || "Không xác định",
            HoLotTenDocGia:
              `${docgia.HoLot || ""} ${docgia.Ten || ""}`.trim() ||
              "Không xác định",
            HoTenNV: nhanvien.HoTenNV || "Không xác định",
          };
        } catch (error) {
          console.error(`Lỗi khi làm giàu dữ liệu mượn sách:`, error);
          return {
            ...muonsach,
            TenSach: "Không xác định",
            HoLotTenDocGia: "Không xác định",
            HoTenNV: "Không xác định",
          };
        }
      })
    );
    muonsachList.value = enrichedData;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    Swal.fire({
      icon: "error",
      title: "Lỗi",
      text: "Không thể lấy dữ liệu từ API.",
    });
  }
}

// Gọi hàm khi trang được mount
onMounted(fetchMuonSach);

// Thay đổi trạng thái mượn sách
const toggleTrangThai = async (muonsach) => {
  const updatedStatus =
    muonsach.TrangThai === "Chưa trả" ? "Đã trả" : "Chưa trả";
  muonsach.TrangThai = updatedStatus; // Cập nhật trạng thái trên giao diện

  try {
    await muonsachService.updateMuonSach(muonsach._id, muonsach);
    Swal.fire({
      icon: "success",
      title: "Thành công",
      text: `Trạng thái đã được cập nhật thành "${updatedStatus}"!`,
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Lỗi",
      text: "Không thể cập nhật trạng thái mượn sách.",
    });
    console.error("Lỗi khi cập nhật trạng thái:", error.message);
  }
};

// Xoá mượn sách
const deleteMuonSach = async (id) => {
  try {
    await muonsachService.deleteMuonSachbyId(id);
    // Cập nhật lại danh sách sau khi xoá
    muonsachList.value = muonsachList.value.filter(
      (muonsach) => muonsach._id !== id
    );
    Swal.fire({
      icon: "success",
      title: "Thành công",
      text: "Mượn sách đã được xoá!",
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Lỗi",
      text: "Bạn không có quyền xoá",
    });
    console.error("Lỗi khi xoá mượn sách:", error.message);
  }
};
</script>

<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4">Danh sách Mượn Sách</h1>
    <div>
      <h3>Số giao dịch: {{ muonsachList.length }}</h3>
    </div>
    <div class="d-flex justify-content-end w-100 mr-3">
      <router-link to="/addmuonsach">
        <button type="button" class="btn btn-primary mb-2">Thêm mới</button>
      </router-link>
    </div>
    <div class="table-responsive">
      <table class="table table-hover table-striped table-bordered">
        <thead class="bg-success text-light">
          <tr>
            <th>#</th>
            <th>TÊN SÁCH</th>
            <th>HỌ TÊN ĐỘC GIẢ</th>
            <th>HỌ TÊN NHÂN VIÊN</th>
            <th>NGÀY MƯỢN</th>
            <th>HẠN TRẢ</th>
            <th>TRẠNG THÁI</th>
            <th>HÀNH ĐỘNG</th>
          </tr>
        </thead>
        <tbody>
          <!-- Kiểm tra nếu không có dữ liệu -->
          <tr v-if="muonsachList.length === 0">
            <td colspan="8" class="text-center">Không có dữ liệu</td>
          </tr>
          <!-- Hiển thị danh sách mượn sách -->
          <tr v-for="(muonsach, index) in muonsachList" :key="muonsach._id">
            <td>{{ index + 1 }}</td>
            <td>{{ muonsach.TenSach }}</td>
            <td>{{ muonsach.HoLotTenDocGia }}</td>
            <td>{{ muonsach.HoTenNV }}</td>
            <td>{{ new Date(muonsach.NgayMuon).toLocaleDateString() }}</td>
            <td>{{ new Date(muonsach.NgayTra).toLocaleDateString() }}</td>
            <td>
              <div class="d-flex justify-content-center textstatus mt-2">
                <span
                  :class="
                    muonsach.TrangThai === 'Chưa trả'
                      ? 'badge badge-warning'
                      : 'badge badge-success'
                  "
                  @click="toggleTrangThai(muonsach)"
                  style="cursor: pointer"
                >
                  {{ muonsach.TrangThai }}
                  <i class="fa-solid fa-filter"></i>
                </span>
              </div>
            </td>
            <td>
              <div class="ml-4">
                <button
                  class="btn btn-danger"
                  @click="deleteMuonSach(muonsach._id)"
                >
                  Xoá
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.textstatus {
  font-size: 18px; /* Tăng kích thước chữ */
  font-weight: bold; /* Làm chữ đậm */
}
</style>
