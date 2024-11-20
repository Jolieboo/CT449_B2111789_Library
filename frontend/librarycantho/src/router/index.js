import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import Login from "@/views/Login.vue";
import Admin from "@/views/Admin.vue";
import { userAuthStore } from "@/store/auth.store";
import { nextTick } from "vue";
import NXBList from "@/components/NXBList.vue";
import DocGiaList from "@/components/DocGiaList.vue";
import NhanVienList from "@/components/NhanVienList.vue";
import SachList from "@/components/SachList.vue";
import MuonSach from "@/components/MuonSachList.vue";
import MuonSachList from "@/components/MuonSachList.vue";
import addNXB from "@/components/addNXB.vue";
import UpdateNXB from "@/components/updateNXB.vue";
import AddDocGia from "@/components/addDocGia.vue";
import UpdateDocGia from "@/components/updateDocGia.vue";
import AddNhanVien from "@/components/addNhanVien.vue";
import UpdateNhanVien from "@/components/updateNhanVien.vue";
import AddSach from "@/components/addSach.vue";
import UpdateSach from "@/components/updateSach.vue";
import AddMuonSach from "@/components/addMuonSach.vue";
import ErrorPage from "@/components/errorPage.vue";
const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      requireAuth: true,
    },
    children: [
      {
        path: "/sach",
        name: "Sach",
        component: SachList,
      },
      {
        path: "/addsach",
        name: "addsach",
        component: AddSach,
      },
      {
        path: "/updatesach/:id",
        name: "updatesach",
        component: UpdateSach,
      },
      {
        path: "/nxb",
        name: "NXB",
        component: NXBList,
      },
      {
        path: "/addnxb",
        name: "addNXB",
        component: addNXB,
      },
      {
        path: "/updatenxb/:id",
        name: "updatenxb",
        component: UpdateNXB,
      },
      {
        path: "/docgia",
        name: "DocGia",
        component: DocGiaList,
      },
      {
        path: "/adddocgia",
        name: "addDocGia",
        component: AddDocGia,
      },
      {
        path: "/updatedocgia/:id",
        name: "updatedocgia",
        component: UpdateDocGia,
      },
      {
        path: "/nhanvien",
        name: "NhanVien",
        component: NhanVienList,
      },
      {
        path: "/addnhanvien",
        name: "addnhanvien",
        component: AddNhanVien,
      },
      {
        path: "/updatenhanvien/:id",
        name: "updatenhanvien",
        component: UpdateNhanVien,
      },
      {
        path: "/muonsach",
        name: "MuonSach",
        component: MuonSachList,
      },
      {
        path: "/addmuonsach",
        name: "addmuonsach",
        component: AddMuonSach,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*", // Tất cả các đường dẫn không hợp lệ
    name: "ErrorPage",
    component: ErrorPage, // Chỉ định trang lỗi
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
import Swal from "sweetalert2";
router.beforeEach(async (to) => {
  const authStore = userAuthStore();
  if (to.meta.requireAuth && !authStore.user) {
    authStore.returnURL = to.fullPath;
    return {
      path: "/login",
    };
  }
});
router.afterEach((to, from) => {
  nextTick(() => {
    document.title = to.name;
  });
});

export default router;
