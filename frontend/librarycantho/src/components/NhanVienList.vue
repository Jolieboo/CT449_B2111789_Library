<script setup>
import { ref, reactive, onMounted } from "vue";
import NhanVienService from "@/services/nhanvien.service";
import Swal from "sweetalert2";

const nhanvienService = new NhanVienService();
const nhanvien = reactive({
  HoTenNV: "",
  isAdmin: "",
  DiaChi: "",
  SoDienThoai: "",
  createAt: "",
});

const nhanvienList = ref([]);
async function fetchNhanVien() {
  try {
    const data = await nhanvienService.getAll();
    console.log("Dữ liệu nhận được:", data); // Kiểm tra dữ liệu ở đây
    nhanvienList.value = data; //
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    Swal.fire({
      icon: "error",
      title: "Lỗi",
      text: "Không thể lấy dữ liệu từ API.",
    });
  }
}
async function handleDelete(_id) {
  try {
    // Hiển thị hộp thoại xác nhận xóa
    const confirm = await Swal.fire({
      title: "Bạn có chắc chắn?",
      text: "Xóa nhân viên này sẽ không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });

    // Nếu người dùng xác nhận, tiến hành xóa
    if (confirm.isConfirmed) {
      // Gọi API để xóa độc giả
      await nhanvienService.deleteNVbyId(_id);

      // Thông báo thành công
      Swal.fire("Xóa thành công!", "Độc giả đã bị xóa.", "success");

      // Làm mới danh sách độc giả
      await fetchNhanVien();
    }
  } catch (error) {
    // Nếu có lỗi xảy ra trong quá trình xóa
    Swal.fire("Lỗi", "Bạn không được cấp quyền xoá", "error");
    console.error("Lỗi khi gọi API:", error);
  }
}
onMounted(fetchNhanVien);
</script>
<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4">Danh sách Nhân Viên</h1>
    <div>
      <h3>Số nhân viên: {{ nhanvienList.length }}</h3>
    </div>
    <div class="d-flex justify-content-end w-100 mr-3">
      <router-link to="/addnhanvien"
        ><button type="button" class="btn btn-primary mb-2">
          <i class="fa-solid fa-plus"></i> Thêm mới
        </button></router-link
      >
    </div>
    <div class="table-responsive">
      <table class="table table-hover table-striped table-bordered">
        <thead class="bg-success text-light">
          <tr>
            <th>#</th>
            <th>HỌ TÊN</th>
            <th>CHỨC VỤ</th>
            <th>ĐỊA CHỈ</th>
            <th>SỐ ĐIỆN THOẠI</th>
            <th>NGÀY VÀO LÀM</th>
            <th>HÀNH ĐỘNG</th>
          </tr>
        </thead>
        <tbody>
          <!-- Kiểm tra nếu không có dữ liệu -->
          <tr v-if="nhanvienList.length === 0">
            <td colspan="6" class="text-center">Không có dữ liệu</td>
          </tr>
          <!-- Hiển thị danh sách nhân viên -->
          <tr v-for="(nhanvien, index) in nhanvienList" :key="nhanvien._id">
            <td>{{ index + 1 }}</td>
            <td>{{ nhanvien.HoTenNV }}</td>
            <td>{{ nhanvien.isAdmin ? "Admin" : "Nhân Viên" }}</td>
            <td>{{ nhanvien.DiaChi }}</td>
            <td>{{ nhanvien.SoDienThoai }}</td>
            <td>{{ new Date(nhanvien.createdAt).toLocaleDateString() }}</td>
            <td>
              <div class="row">
                <div class="mr-1 ml-3">
                  <button
                    class="btn btn-danger"
                    @click="handleDelete(nhanvien._id)"
                  >
                    Xoá
                  </button>
                </div>
                <router-link
                  :to="{ name: 'updatenhanvien', params: { id: nhanvien._id } }"
                  class="btn btn-warning"
                  >Sửa</router-link
                >
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
