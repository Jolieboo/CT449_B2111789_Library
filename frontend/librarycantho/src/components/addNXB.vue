<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import NXBService from "@/services/nxb.service";
import Swal from "sweetalert2";

export default {
  name: "AddNXB",
  setup() {
    // Khởi tạo form dữ liệu
    const nxbForm = ref({
      TenNXB: "",
      DiaChi: "",
    });

    const nxbService = new NXBService();
    const router = useRouter();

    // Hàm xử lý thêm Nhà Xuất Bản
    const handleAddNXB = async () => {
      try {
        const response = await nxbService.addNXB(nxbForm.value);
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: "Nhà xuất bản đã được thêm thành công!",
        });
        // Điều hướng về trang danh sách Nhà Xuất Bản
        router.push("/nxb");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Có lỗi xảy ra khi thêm nhà xuất bản.",
        });
        console.error("Lỗi thêm Nhà Xuất Bản:", error);
      }
    };

    return {
      nxbForm,
      handleAddNXB,
    };
  },
};
</script>
<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4">Thêm Nhà Xuất Bản</h1>
    <form @submit.prevent="handleAddNXB">
      <div class="form-group mb-3">
        <label for="TenNXB">Tên Nhà Xuất Bản</label>
        <input
          type="text"
          id="TenNXB"
          v-model="nxbForm.TenNXB"
          class="form-control"
          placeholder="Nhập tên nhà xuất bản"
          required
        />
      </div>
      <div class="form-group mb-3">
        <label for="DiaChi">Địa Chỉ</label>
        <input
          type="text"
          id="DiaChi"
          v-model="nxbForm.DiaChi"
          class="form-control"
          placeholder="Nhập địa chỉ"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Thêm</button>
      <router-link to="/nxb" class="btn btn-secondary ml-2">Hủy</router-link>
    </form>
  </div>
</template>
