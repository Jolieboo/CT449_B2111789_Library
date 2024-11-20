<script>
import { useRouter } from "vue-router";
import SachService from "@/services/sach.service";
import Swal from "sweetalert2";
import NXBService from "@/services/nxb.service";
import { ref, onMounted } from "vue";
export default {
  name: "AddSach",
  setup() {
    const sach = ref({
      TenSach: "",
      DonGia: "",
      SoQuyen: "",
      NamXuatBan: "",
      NguonGoc: "",
      MaNXB: "", // Lưu ID của NXB được chọn
    });
    const router = useRouter();

    const nxbList = ref([]); // Danh sách NXB
    const sachService = new SachService();
    const nxbService = new NXBService();

    onMounted(async () => {
      try {
        nxbList.value = await nxbService.getAll();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Không thể tải danh sách NXB.",
        });
        console.error("Lỗi khi tải danh sách NXB:", error.message);
      }
    });

    const addSach = async () => {
      try {
        await sachService.addSach(sach.value);
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: "Sách đã được thêm thành công!",
        });
        sach.value = {
          TenSach: "",
          DonGia: "",
          SoQuyen: "",
          NamXuatBan: "",
          NguonGoc: "",
          MaNXB: "",
        };
        router.push("/sach");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Không thể thêm sách.",
        });
        console.error("Lỗi khi thêm sách:", error.message);
      }
    };

    return {
      sach,
      nxbList,
      addSach,
    };
  },
};
</script>

<template>
  <div class="container mt-4">
    <h2 class="text-center">Thêm Sách Mới</h2>
    <div class="col-md-6 offset-md-3">
      <form @submit.prevent="addSach">
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

        <!-- Mã NXB -->
        <div class="form-group">
          <label for="MaNXB">Nhà Xuất Bản</label>
          <select id="MaNXB" v-model="sach.MaNXB" class="form-control" required>
            <option value="">Chọn Nhà Xuất Bản</option>
            <option v-for="nxb in nxbList" :key="nxb._id" :value="nxb._id">
              {{ nxb.TenNXB }}
            </option>
          </select>
        </div>

        <!-- Nút Thêm Sách -->
        <div class="form-group text-center">
          <button type="submit" class="btn btn-primary">Thêm Sách</button>
        </div>
      </form>
    </div>
  </div>
</template>
