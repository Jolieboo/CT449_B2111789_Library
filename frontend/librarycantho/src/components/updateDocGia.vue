<script>
import { ref, onMounted } from "vue";
import DocGiaService from "@/services/docgia.service";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "UpdateDocGia",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const docgia = ref({
      HoLot: "",
      Ten: "",
      NgaySinh: "",
      Phai: "",
      DiaChi: "",
      DienThoai: "",
    });

    // Lấy ID từ route params
    const id = route.params.id;

    // Lấy thông tin NXB theo ID khi trang được tải
    onMounted(async () => {
      const docgiaService = new DocGiaService();
      const dgData = await docgiaService.getDocGiabyId(id);
      docgia.value = dgData;
    });

    // Cập nhật NXB
    const updateDocGia = async () => {
      try {
        const docgiaService = new DocGiaService();
        await docgiaService.updateDocGia(id, docgia.value);
        // Điều hướng lại trang danh sách NXB sau khi cập nhật thành công
        router.push("/docgia");
      } catch (error) {
        console.error("Có lỗi xảy ra khi cập nhật độc giả:", error.message);
      }
    };

    return {
      docgia,
      updateDocGia,
    };
  },
};
</script>
<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4">Cập nhật Thông tin Độc giả</h1>
    <div class="col-md-6 offset-md-3">
      <form @submit.prevent="updateDocGia">
        <div class="form-group">
          <label for="HoLot">Họ Lót</label>
          <input
            type="text"
            id="HoLot"
            v-model="docgia.HoLot"
            class="form-control"
            placeholder="Nhập họ lót"
            required
          />
        </div>

        <div class="form-group">
          <label for="Ten">Tên</label>
          <input
            type="text"
            id="Ten"
            v-model="docgia.Ten"
            class="form-control"
            placeholder="Nhập tên"
            required
          />
        </div>

        <div class="form-group">
          <label for="NgaySinh">Ngày Sinh</label>
          <input
            type="date"
            id="NgaySinh"
            v-model="docgia.NgaySinh"
            class="form-control"
            required
          />
        </div>

        <div class="form-group">
          <label for="Phai">Giới Tính</label>
          <select id="Phai" v-model="docgia.Phai" class="form-control" required>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>
        </div>

        <div class="form-group">
          <label for="DiaChi">Địa Chỉ</label>
          <input
            type="text"
            max="10"
            id="DiaChi"
            v-model="docgia.DiaChi"
            class="form-control"
            placeholder="Nhập địa chỉ"
            required
          />
        </div>

        <div class="form-group">
          <label for="DienThoai">Số Điện Thoại</label>
          <input
            type="text"
            id="DienThoai"
            v-model="docgia.DienThoai"
            class="form-control"
            placeholder="Nhập số điện thoại"
            required
          />
        </div>

        <div class="form-group text-center">
          <button type="submit" class="btn btn-success">
            Cập nhật Độc giả
          </button>
          <router-link to="/docgia" class="btn btn-secondary ml-2">
            Hủy
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>
