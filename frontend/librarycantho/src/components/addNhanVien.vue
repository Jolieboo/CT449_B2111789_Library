<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import NVService from "@/services/nhanvien.service";
import Swal from "sweetalert2";

export default {
  name: "AddNV",
  setup() {
    // Khởi tạo form dữ liệu
    const nvForm = ref({
      HoTenNV: "",
      isAdmin: "",
      Password: "",
      ConfirmPassword: "",
      DiaChi: "",
      SoDienThoai: "",
    });

    const nvService = new NVService();
    const router = useRouter();

    // Hàm xử lý thêm Nhà Xuất Bản
    const handleAddNV = async () => {
      try {
        const response = await nvService.addNV(nvForm.value);
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: "Nhân viên đã được thêm thành công!",
        });
        // Điều hướng về trang danh sách Nhà Xuất Bản
        router.push("/nhanvien");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Có lỗi xảy ra khi thêm nhân viên",
        });
        console.error("Lỗi thêm Nhà Xuất Bản:", error);
      }
    };

    return {
      nvForm,
      handleAddNV,
    };
  },
};
</script>
<template>
  <div class="container mt-4">
    <h2 class="text-center">Thêm Nhân Viên</h2>
    <div class="col-md-6 offset-md-3">
      <form @submit.prevent="handleAddNV">
        <!-- Họ Tên Nhân Viên -->
        <div class="form-group">
          <label for="HoTenNV">Họ và Tên</label>
          <input
            type="text"
            id="HoTenNV"
            v-model="nvForm.HoTenNV"
            class="form-control"
            placeholder="Nhập họ và tên"
            required
          />
        </div>

        <!-- Vai trò -->
        <div class="form-group">
          <label for="isAdmin">Vai trò</label>
          <select
            id="isAdmin"
            v-model="nvForm.isAdmin"
            class="form-control"
            required
          >
            <option value="">Chọn vai trò</option>
            <option value="true">Admin</option>
            <option value="false">Nhân viên</option>
          </select>
        </div>

        <!-- Mật khẩu -->
        <div class="form-group">
          <label for="Password">Mật khẩu</label>
          <input
            type="password"
            id="Password"
            v-model="nvForm.Password"
            class="form-control"
            placeholder="Nhập mật khẩu"
            required
          />
        </div>

        <!-- Xác nhận mật khẩu -->
        <div class="form-group">
          <label for="ConfirmPassword">Xác nhận Mật khẩu</label>
          <input
            type="password"
            id="ConfirmPassword"
            v-model="nvForm.ConfirmPassword"
            class="form-control"
            placeholder="Nhập lại mật khẩu"
            required
          />
        </div>

        <!-- Địa chỉ -->
        <div class="form-group">
          <label for="DiaChi">Địa chỉ</label>
          <input
            type="text"
            id="DiaChi"
            v-model="nvForm.DiaChi"
            class="form-control"
            placeholder="Nhập địa chỉ"
            required
          />
        </div>

        <!-- Số điện thoại -->
        <div class="form-group">
          <label for="SoDienThoai">Số điện thoại</label>
          <input
            type="text"
            id="SoDienThoai"
            v-model="nvForm.SoDienThoai"
            class="form-control"
            placeholder="Nhập số điện thoại"
            required
          />
        </div>

        <!-- Nút thêm nhân viên -->
        <div class="form-group text-center">
          <button type="submit" class="btn btn-primary">Thêm Nhân Viên</button>
          <router-link to="/nv" class="btn btn-secondary ml-2">
            Hủy
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>
