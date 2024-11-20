<!-- <template>
  <div>
    <h2>{{ isEditMode ? "Sửa Sách" : "Thêm Sách" }}</h2>
    <input v-model="bookData.TenSach" placeholder="Tên sách" />
    <input v-model="bookData.MaNXB" placeholder="Mã NXB" />
    <input v-model="bookData.DonGia" placeholder="Đơn giá" />
    <button @click="submitForm">{{ isEditMode ? "Cập nhật" : "Thêm" }}</button>
    <button @click="cancelEdit">Hủy</button>
  </div>
</template>

<script>
export default {
  props: {
    bookToEdit: Object,
    isEditMode: Boolean,
  },
  data() {
    return {
      bookData: {
        TenSach: "",
        MaNXB: "",
        DonGia: "",
      },
    };
  },
  watch: {
    bookToEdit(newBook) {
      if (newBook) {
        this.bookData = { ...newBook };
      }
    },
  },
  methods: {
    submitForm() {
      this.$emit("submit-form", this.bookData);
      this.clearForm();
    },
    cancelEdit() {
      this.clearForm();
      this.$emit("cancel-edit");
    },
    clearForm() {
      this.bookData = { TenSach: "", MaNXB: "", DonGia: "" };
    },
  },
};
</script>

<style scoped>
/* Thêm các kiểu CSS cho BookForm */
input {
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
}
button {
  margin-top: 10px;
}
</style> -->
