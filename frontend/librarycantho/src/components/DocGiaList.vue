<script setup>
import { ref, reactive, onMounted } from "vue";
import DocGiaService from "@/services/docgia.service";
import Swal from "sweetalert2";

const docgiaService = new DocGiaService();
const docgia = reactive({
  HoLot: "",
  Ten: "",
  NgaySinh: "",
  Phai: "",
  DiaChi: "",
  DienThoai: "",
}); //Khai báo

const docgiaList = ref([]);
async function fetchDocGia() {
  try {
    const data = await docgiaService.getAll();
    console.log("Dữ liệu nhận được:", data); // Kiểm tra dữ liệu ở đây
    docgiaList.value = data; // Gán dữ liệu cho NXBList
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
      text: "Xóa độc giả này sẽ không thể hoàn tác!",
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
      await docgiaService.deleteDocGiabyId(_id);

      // Thông báo thành công
      Swal.fire("Xóa thành công!", "Độc giả đã bị xóa.", "success");

      // Làm mới danh sách độc giả
      await fetchDocGia();
    }
  } catch (error) {
    // Nếu có lỗi xảy ra trong quá trình xóa
    Swal.fire("Lỗi", "Bạn không có quyền xoá.", "error");
    console.error("Lỗi khi gọi API:", error);
  }
}
onMounted(fetchDocGia);
</script>
<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4">Danh sách Độc giả</h1>
    <div>
      <h3>Số độc giả: {{ docgiaList.length }}</h3>
    </div>
    <div class="d-flex justify-content-end w-100 mr-3">
      <router-link to="/adddocgia"
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
            <th>HỌ LÓT</th>
            <th>TÊN</th>
            <th>NGÀY SINH</th>
            <th>GIỚI TÍNH</th>
            <th>ĐỊA CHỈ</th>
            <th>SỐ ĐIỆN THOẠI</th>
            <th>HÀNH ĐỘNG</th>
          </tr>
        </thead>
        <tbody>
          <!-- Kiểm tra nếu không có dữ liệu -->
          <tr v-if="docgiaList.length === 0">
            <td colspan="7" class="text-center">Không có dữ liệu</td>
          </tr>
          <!-- Hiển thị danh sách nhà xuất bản -->
          <tr v-for="(docgia, index) in docgiaList" :key="docgia._id">
            <td>{{ index + 1 }}</td>
            <td>{{ docgia.HoLot }}</td>
            <td>{{ docgia.Ten }}</td>
            <td>{{ new Date(docgia.NgaySinh).toLocaleDateString() }}</td>
            <td>{{ docgia.Phai }}</td>
            <td>{{ docgia.DiaChi }}</td>
            <td>{{ docgia.DienThoai }}</td>
            <td>
              <div class="row">
                <div class="ml-3 mr-1">
                  <button
                    class="btn btn-danger"
                    @click="handleDelete(docgia._id)"
                  >
                    Xóa
                  </button>
                </div>
                <router-link
                  :to="{ name: 'updatedocgia', params: { id: docgia._id } }"
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
