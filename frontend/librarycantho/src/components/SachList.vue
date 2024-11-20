<script>
import { ref, onMounted } from "vue";
import SachService from "@/services/sach.service";
import NXBService from "@/services/nxb.service"; // Thêm service NXB
import Swal from "sweetalert2";

export default {
  name: "SachList",
  setup() {
    const sachService = new SachService();
    const nxbService = new NXBService(); // Sử dụng service NXB
    const sachList = ref([]);
    const searchQuery = ref("");

    // Hàm tải danh sách sách
    const getSachList = async (TenSach = "") => {
      try {
        const sachData = TenSach
          ? await sachService.getSachByTen(TenSach)
          : await sachService.getAll();

        // Lấy tên NXB cho từng sách
        const enrichedSachData = await Promise.all(
          sachData.map(async (sach) => {
            if (sach.MaNXB) {
              try {
                const nxb = await nxbService.getNXBbyId(sach.MaNXB);
                sach.TenNXB = nxb?.TenNXB || "Không xác định";
              } catch (error) {
                sach.TenNXB = "Lỗi tải tên NXB";
              }
            } else {
              sach.TenNXB = "Không xác định";
            }
            return sach;
          })
        );

        sachList.value = enrichedSachData;
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Không thể tải danh sách sách.",
        });
        console.error("Lỗi khi tải danh sách sách:", error.message);
      }
    };

    // Các hàm khác giữ nguyên
    const deleteSach = async (id) => {
      try {
        await sachService.deleteSachbyId(id);
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: "Sách đã được xóa.",
        });
        getSachList(searchQuery.value);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Bạn không có quyền xoá",
        });
        console.error("Lỗi khi xóa sách:", error.message);
      }
    };

    const searchSach = () => {
      getSachList(searchQuery.value);
    };

    onMounted(() => {
      getSachList();
    });

    return {
      sachList,
      deleteSach,
      searchQuery,
      searchSach,
    };
  },
};
</script>

<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4">Danh sách Sách</h1>
    <div>
      <h3>Số sách: {{ sachList.length }}</h3>
    </div>

    <!-- Thanh tìm kiếm -->
    <div class="mb-3">
      <input
        type="text"
        v-model="searchQuery"
        class="form-control"
        placeholder="Tìm kiếm sách theo tên"
        @input="searchSach"
      />
    </div>

    <div class="d-flex justify-content-end w-100 mr-3">
      <router-link to="/addsach">
        <button type="button" class="btn btn-primary mb-2">
          <i class="fa-solid fa-plus"></i> Thêm mới
        </button>
      </router-link>
    </div>

    <div class="table-responsive">
      <table class="table table-hover table-striped table-bordered">
        <thead class="bg-success text-light">
          <tr>
            <th>#</th>
            <th>TÊN SÁCH</th>
            <th>ĐƠN GIÁ</th>
            <th>SỐ QUYỂN</th>
            <th>NĂM XUẤT BẢN</th>
            <th>NGUỒN GỐC</th>
            <th>KHO</th>
            <th>NHÀ XUẤT BẢN</th>
            <th>HOẠT ĐỘNG</th>
          </tr>
        </thead>
        <tbody>
          <!-- Kiểm tra nếu không có dữ liệu -->
          <tr v-if="sachList.length === 0">
            <td colspan="8" class="text-center">Không có dữ liệu</td>
          </tr>
          <!-- Hiển thị danh sách sách -->
          <tr v-for="(sach, index) in sachList" :key="sach._id">
            <td>{{ index + 1 }}</td>
            <td>{{ sach.TenSach }}</td>
            <td>{{ sach.DonGia }}</td>
            <td>{{ sach.SoQuyen }}</td>
            <td>{{ sach.NamXuatBan }}</td>
            <td>{{ sach.NguonGoc }}</td>
            <td>{{ sach.kho }}</td>
            <td>{{ sach.TenNXB }}</td>
            <td>
              <div class="row">
                <div class="ml-2 mr-1">
                  <button
                    @click="deleteSach(sach._id)"
                    class="btn btn-danger ml-1 mr-1"
                    :title="'Xóa ' + sach.TenSach"
                  >
                    Xóa
                  </button>
                </div>

                <router-link
                  :to="{ name: 'updatesach', params: { id: sach._id } }"
                  class="btn btn-warning"
                >
                  Sửa
                </router-link>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
