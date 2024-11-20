<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import NhanVienService from "@/services/nhanvien.service";
import Swal from "sweetalert2";

export default {
  name: "UpdateNhanVien",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const nhanvien = ref({
      HoTenNV: "",
      isAdmin: "",
      Password: "",
      ConfirmPassword: "",
      DiaChi: "",
      SoDienThoai: "",
    });

    // Lấy ID nhân viên từ route params
    const id = route.params.id;

    // Lấy thông tin nhân viên khi trang được tải
    onMounted(async () => {
      const nhanvienService = new NhanVienService();
      try {
        const nvData = await nhanvienService.getNVbyId(id);
        nhanvien.value = {
          HoTenNV: nvData.HoTenNV,
          isAdmin: nvData.isAdmin,
          DiaChi: nvData.DiaChi,
          SoDienThoai: nvData.SoDienThoai,
          Password: "", // Không gán mật khẩu cũ
          ConfirmPassword: "", // Không gán xác nhận mật khẩu
        };
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Không thể tải thông tin nhân viên.",
        });
        console.error("Lỗi khi lấy thông tin nhân viên:", error.message);
      }
    });

    // Cập nhật thông tin nhân viên
    const updateNhanVien = async () => {
      try {
        // Kiểm tra mật khẩu và xác nhận mật khẩu
        if (nhanvien.value.Password || nhanvien.value.ConfirmPassword) {
          if (nhanvien.value.Password !== nhanvien.value.ConfirmPassword) {
            Swal.fire({
              icon: "error",
              title: "Lỗi",
              text: "Mật khẩu và xác nhận mật khẩu không khớp!",
            });
            return;
          }
        }

        const nhanvienService = new NhanVienService();
        await nhanvienService.updateNV(id, nhanvien.value);

        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: "Thông tin nhân viên đã được cập nhật!",
        });
        router.push("/nhanvien");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Không thể cập nhật thông tin nhân viên.",
        });
        console.error("Lỗi khi cập nhật nhân viên:", error.message);
      }
    };

    return {
      nhanvien,
      updateNhanVien,
    };
  },
};
</script>

<template>
  <div class="container mt-4">
    <h2 class="text-center">Cập nhật Nhân Viên</h2>
    <div class="col-md-6 offset-md-3">
      <form @submit.prevent="updateNhanVien">
        <!-- Họ Tên Nhân Viên -->
        <div class="form-group">
          <label for="HoTenNV">Họ và Tên</label>
          <input
            type="text"
            id="HoTenNV"
            v-model="nhanvien.HoTenNV"
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
            v-model="nhanvien.isAdmin"
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
            v-model="nhanvien.Password"
            class="form-control"
            placeholder="Nhập mật khẩu mới"
            required
          />
        </div>

        <!-- Xác nhận mật khẩu -->
        <div class="form-group">
          <label for="ConfirmPassword">Xác nhận Mật khẩu</label>
          <input
            type="password"
            id="ConfirmPassword"
            v-model="nhanvien.ConfirmPassword"
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
            v-model="nhanvien.DiaChi"
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
            v-model="nhanvien.SoDienThoai"
            class="form-control"
            placeholder="Nhập số điện thoại"
            required
          />
        </div>

        <!-- Nút cập nhật nhân viên -->
        <div class="form-group text-center">
          <button type="submit" class="btn btn-primary">
            Cập nhật Nhân Viên
          </button>
          <router-link to="/nhanvien" class="btn btn-secondary ml-2">
            Hủy
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>
