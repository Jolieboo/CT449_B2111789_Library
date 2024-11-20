<script set up>
import { ref, onMounted } from "vue";
import NXBService from "@/services/nxb.service";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "UpdateNXB",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const nxb = ref({
      TenNXB: "",
      DiaChi: "",
    });

    // Lấy ID từ route params
    const id = route.params.id;

    // Lấy thông tin NXB theo ID khi trang được tải
    onMounted(async () => {
      const nxbService = new NXBService();
      const nxbData = await nxbService.getNXBbyId(id);
      nxb.value = nxbData;
    });

    // Cập nhật NXB
    const updateNXB = async () => {
      try {
        const nxbService = new NXBService();
        await nxbService.updateNXB(id, nxb.value);
        // Điều hướng lại trang danh sách NXB sau khi cập nhật thành công
        router.push("/nxb");
      } catch (error) {
        console.error("Có lỗi xảy ra khi cập nhật NXB:", error.message);
      }
    };

    return {
      nxb,
      updateNXB,
    };
  },
};
</script>
<template>
  <div>
    <h3>Cập nhật Nhà xuất bản</h3>
    <form @submit.prevent="updateNXB">
      <div class="form-group">
        <label for="TenNXB">Tên NXB:</label>
        <input
          type="text"
          id="TenNXB"
          v-model="nxb.TenNXB"
          class="form-control"
          required
        />
      </div>
      <div class="form-group">
        <label for="DiaChi">Địa chỉ:</label>
        <input
          type="text"
          id="DiaChi"
          v-model="nxb.DiaChi"
          class="form-control"
          required
        />
      </div>
      <button type="submit" class="btn btn-success">Cập nhật</button>
    </form>
  </div>
</template>
