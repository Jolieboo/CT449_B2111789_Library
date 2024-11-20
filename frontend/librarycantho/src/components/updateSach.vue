<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";
import SachService from "@/services/sach.service";
import NXBService from "@/services/nxb.service";

export default {
  name: "UpdateSach",
  setup() {
    const sachService = new SachService();
    const nxbService = new NXBService();
    const route = useRoute();
    const router = useRouter();

    const sach = ref({
      TenSach: "",
      DonGia: "",
      SoQuyen: "",
      NamXuatBan: "",
      NguonGoc: "",
      MaNXB: "", // Lưu ID của NXB
    });

    const nxbList = ref([]); // Danh sách các NXB
    const id = route.params.id; // Lấy id từ URL

    // Tải thông tin sách và danh sách NXB khi trang được mở
    onMounted(async () => {
      try {
        const sachData = await sachService.getSachbyId(id);
        sach.value = {
          TenSach: sachData.TenSach,
          DonGia: sachData.DonGia,
          SoQuyen: sachData.SoQuyen,
          NamXuatBan: sachData.NamXuatBan,
          NguonGoc: sachData.NguonGoc,
          MaNXB: sachData.MaNXB,
        };

        nxbList.value = await nxbService.getAll();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Không thể tải thông tin sách hoặc danh sách NXB.",
        });
        console.error("Lỗi khi tải dữ liệu:", error.message);
      }
    });

    // Hàm cập nhật sách
    const updateSach = async () => {
      try {
        await sachService.updateSach(id, sach.value);
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: "Thông tin sách đã được cập nhật!",
        });
        router.push("/sach");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Không thể cập nhật sách.",
        });
        console.error("Lỗi khi cập nhật sách:", error.message);
      }
    };

    return {
      sach,
      nxbList,
      updateSach,
    };
  },
};
</script>

<template>
  <div class="container mt-4">
    <h2 class="text-center">Cập nhật Thông Tin Sách</h2>
    <div class="col-md-6 offset-md-3">
      <form @submit.prevent="updateSach">
        <!-- Tên Sách -->
        <div class="form-group">
          <label for="TenSach">Tên Sách</label>
          <input
            type="text"
            id="TenSach"
            v-model="sach.TenSach"
            class="form-control"
            placeholder="Nhập tên sách"
            required
          />
        </div>

        <!-- Đơn Giá -->
        <div class="form-group">
          <label for="DonGia">Đơn Giá</label>
          <input
            type="number"
            id="DonGia"
            v-model="sach.DonGia"
            class="form-control"
            placeholder="Nhập đơn giá"
            required
          />
        </div>

        <!-- Số Quyển -->
        <div class="form-group">
          <label for="SoQuyen">Số Quyển</label>
          <input
            type="number"
            id="SoQuyen"
            v-model="sach.SoQuyen"
            class="form-control"
            placeholder="Nhập số quyển"
            required
          />
        </div>

        <!-- Năm Xuất Bản -->
        <div class="form-group">
          <label for="NamXuatBan">Năm Xuất Bản</label>
          <input
            type="number"
            id="NamXuatBan"
            v-model="sach.NamXuatBan"
            class="form-control"
            placeholder="Nhập năm xuất bản"
            required
          />
        </div>

        <!-- Nguồn Gốc -->
        <div class="form-group">
          <label for="NguonGoc">Nguồn Gốc</label>
          <input
            type="text"
            id="NguonGoc"
            v-model="sach.NguonGoc"
            class="form-control"
            placeholder="Nhập nguồn gốc"
            required
          />
        </div>

        <!-- Nhà Xuất Bản -->
        <div class="form-group">
          <label for="MaNXB">Nhà Xuất Bản</label>
          <select id="MaNXB" v-model="sach.MaNXB" class="form-control" required>
            <option value="">Chọn Nhà Xuất Bản</option>
            <option v-for="nxb in nxbList" :key="nxb._id" :value="nxb._id">
              {{ nxb.TenNXB }}
            </option>
          </select>
        </div>

        <!-- Nút Lưu -->
        <div class="form-group text-center">
          <button type="submit" class="btn btn-primary">Cập nhật</button>
          <router-link to="/sach" class="btn btn-secondary ml-2"
            >Hủy</router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>
