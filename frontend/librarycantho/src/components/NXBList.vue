<script>
import { ref, onMounted } from "vue";
import NXBService from "@/services/nxb.service";
import Swal from "sweetalert2";

export default {
  name: "NXBTable",
  setup() {
    const nxbService = new NXBService();
    const nxbList = ref([]);

    const fetchNXBList = async () => {
      try {
        nxbList.value = await nxbService.getAll();
      } catch (error) {
        console.error("Error fetching NXB list:", error.message);
      }
    };

    const handleDelete = async (_id) => {
      try {
        const confirm = await Swal.fire({
          title: "Bạn có chắc chắn?",
          text: "Xóa nhà xuất bản này sẽ không thể hoàn tác!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Xóa",
          cancelButtonText: "Hủy",
        });

        if (confirm.isConfirmed) {
          await nxbService.deleteNXBbyId(_id);
          Swal.fire("Xóa thành công!", "Nhà xuất bản đã bị xóa.", "success");
          fetchNXBList(); // Refresh the list after deletion
        }
      } catch (error) {
        Swal.fire("Lỗi", "Không thể xóa nhà xuất bản này.", "error");
        console.error("Error deleting NXB:", error.message);
      }
    };

    onMounted(fetchNXBList);

    return { nxbList, handleDelete };
  },
};
</script>
<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4">Danh sách Nhà Xuất Bản</h1>
    <div>
      <h3>Số NXB: {{ nxbList.length }}</h3>
    </div>
    <div class="row">
      <div class="d-flex justify-content-end w-100 mr-3">
        <router-link to="/addnxb"
          ><button type="button" class="btn btn-primary mb-2">
            <i class="fa-solid fa-plus"></i> Thêm mới
          </button></router-link
        >
      </div>
    </div>
    <table class="table table-striped">
      <thead class="bg-success text-light">
        <tr>
          <th>#</th>
          <th>TÊN NXB</th>
          <th>ĐỊA CHỈ</th>
          <th>HOẠT ĐỘNG</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(nxb, index) in nxbList" :key="nxb._id">
          <td>{{ index + 1 }}</td>
          <td>{{ nxb.TenNXB }}</td>
          <td>{{ nxb.DiaChi }}</td>
          <td>
            <div class="row">
              <div class="mr-2 ml-1">
                <button class="btn btn-danger" @click="handleDelete(nxb._id)">
                  Xóa
                </button>
              </div>

              <router-link
                :to="{ name: 'updatenxb', params: { id: nxb._id } }"
                class="btn btn-warning"
                >Sửa</router-link
              >
            </div>
          </td>
        </tr>
        <tr v-if="nxbList.length === 0">
          <td colspan="4" class="text-center">Không có dữ liệu</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
