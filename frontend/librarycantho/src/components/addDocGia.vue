<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import DocGiaService from "@/services//docgia.service";
import Swal from "sweetalert2";
export default {
  name: "AddDocGia",
  setup() {
    // Khởi tạo form dữ liệu
    const docgiaForm = ref({
      HoLot: "",
      Ten: "",
      NgaySinh: "",
      Phai: "",
      DiaChi: "",
      DienThoai: "",
    });
    const docgiaService = new DocGiaService();
    const router = useRouter();

    const handleAddDocGia = async () => {
      try {
        const response = await docgiaService.addDocGia(docgiaForm.value);
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: "Độc giả đã được thêm thành công!",
        });
        router.push("/docgia");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Có lỗi xảy ra khi thêm độc giả.",
        });
        console.error("Lỗi Độc giả:", error);
      }
    };
    return {
      docgiaForm,
      handleAddDocGia,
    };
  },
};
</script>
<template>
  <div class="container mt-5">
    <h2 class="mb-4">Thêm Mới Độc Giả</h2>
    <form @submit.prevent="handleAddDocGia">
      <!-- Họ và tên lót -->
      <div class="form-group">
        <label for="HoLot">Họ và tên lót</label>
        <input
          v-model="docgiaForm.HoLot"
          id="HoLot"
          type="text"
          class="form-control"
          placeholder="Nhập họ và tên lót"
          required
        />
      </div>

      <!-- Tên -->
      <div class="form-group">
        <label for="Ten">Tên</label>
        <input
          v-model="docgiaForm.Ten"
          id="Ten"
          type="text"
          class="form-control"
          placeholder="Nhập tên"
          required
        />
      </div>

      <!-- Ngày sinh -->
      <div class="form-group">
        <label for="NgaySinh">Ngày sinh</label>
        <input
          v-model="docgiaForm.NgaySinh"
          id="NgaySinh"
          type="date"
          class="form-control"
          required
        />
      </div>

      <!-- Giới tính -->
      <div class="form-group">
        <label for="Phai">Giới tính</label>
        <select
          v-model="docgiaForm.Phai"
          id="Phai"
          class="form-control"
          required
        >
          <option value="Nam">Nam</option>
          <option value="Nu">Nữ</option>
          <option value="Khác">Khác</option>
        </select>
      </div>

      <!-- Địa chỉ -->
      <div class="form-group">
        <label for="DiaChi">Địa chỉ</label>
        <input
          v-model="docgiaForm.DiaChi"
          id="DiaChi"
          type="text"
          class="form-control"
          placeholder="Nhập địa chỉ"
          required
        />
      </div>

      <!-- Điện thoại -->
      <div class="form-group">
        <label for="DienThoai">Điện thoại</label>
        <input
          v-model="docgiaForm.DienThoai"
          id="DienThoai"
          type="tel"
          class="form-control"
          placeholder="Nhập số điện thoại"
          required
        />
      </div>

      <!-- Nút submit -->
      <div class="d-flex justify-content-center mb-5">
        <button type="submit" class="btn btn-primary">Thêm mới</button>
      </div>
    </form>
  </div>
</template>
