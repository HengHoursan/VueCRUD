<template>
  <div class="table-container">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="productID" label="Product ID" width="120" />
      <el-table-column prop="productName" label="Product Name" width="150" />
      <el-table-column prop="productPrice" label="Product Price" width="150" />
      <el-table-column prop="productQTY" label="Product Quantity" width="300" />
      <el-table-column fixed="right" label="Operations" min-width="120">
        <template #default="{ row }">
          <el-button type="primary" plain @click="editProduct(row)"
            >Edit</el-button
          >
          <el-button
            type="danger"
            plain
            @click="confirmDelete(row.id, row.productName)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" plain @click="showForm = true">Add New</el-button>
    <el-dialog
      v-model="showForm"
      :title="isEditing ? 'Edit Product' : 'Add New Product'"
      @close="handleClose"
    >
      <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
      >
        <el-form-item label="Product ID" prop="productID">
          <el-input v-model="ruleForm.productID" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Product Name" prop="productName">
          <el-input v-model="ruleForm.productName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Product Price" prop="productPrice">
          <el-input v-model.number="ruleForm.productPrice" />
        </el-form-item>
        <el-form-item label="Product Quantity" prop="productQTY">
          <el-input v-model.number="ruleForm.productQTY" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">{{
            isEditing ? "Update" : "Create"
          }}</el-button>
          <el-button v-if="isEditing" @click="cancelEdit">Cancel</el-button>
          <el-button v-else @click="resetForm">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { ElMessage, ElMessageBox } from "element-plus";

const tableData = ref([]);
const showForm = ref(false);
const isEditing = ref(false);
const ruleFormRef = ref(null);

const fetchData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "Products"));
    if (querySnapshot.empty) {
      console.log("No matching documents.");
      tableData.value = [""];
      return;
    }
    tableData.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("Data fetched successfully:", tableData.value);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onMounted(() => {
  fetchData();
});

const ruleForm = ref({
  productID: "",
  productName: "",
  productPrice: 0,
  productQTY: 0,
});
const handleClose = () => {
  showForm.value = false;
  ruleForm.value = {
    productID: "",
    productName: "",
    productPrice: 0,
    productQTY: 0,
  };
};
const cancelEdit = () => {
  ElMessage({
    type: "info",
    message: "Edit operation canceled",
    duration: 1500,
    offset: 20,
  });
  showForm.value = false;
  isEditing.value = false;
  ruleForm.value = {
    productID: "",
    productName: "",
    productPrice: 0,
    productQTY: 0,
  };
};
const rules = ref({
  productID: [
    { required: true, message: "Please input the product ID", trigger: "blur" },
  ],
  productName: [
    {
      required: true,
      message: "Please input the product name",
      trigger: "blur",
    },
  ],
  productPrice: [
    {
      required: true,
      type: "number",
      message: "Please input the product price",
      trigger: "blur",
    },
  ],
  productQTY: [
    {
      required: true,
      type: "number",
      message: "Please input the product quantity",
      trigger: "blur",
    },
  ],
});
// Function to confirm deletion before executing it
const confirmDelete = (id, productName) => {
  ElMessageBox.confirm(
    `Are you sure you want to delete this product: ${productName}?`,
    "Delete Confirmation",
    {
      confirmButtonText: "Yes, Delete it.",
      type: "warning",
      showCancelButton: true,
      center: true,
    }
  )
    .then(() => deleteProduct(id))
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Delete operation canceled",
        duration: 1500,
        offset: 20,
      });
    });
};
// Function to handle deletion of a document
const deleteProduct = async (id) => {
  try {
    await deleteDoc(doc(db, "Products", id));
    ElMessage({
      type: "success",
      message: "Product deleted successfully!",
      duration: 1500,
      offset: 20,
      onClose: () => fetchData(),
    });
  } catch (error) {
    console.error("Error deleting document:", error);
    ElMessage({
      type: "error",
      message: "Failed to delete product!",
      duration: 1500,
      offset: 20,
    });
  }
};
const addProduct = async () => {
  try {
    await addDoc(collection(db, "Products"), {
      productID: ruleForm.value.productID,
      productName: ruleForm.value.productName,
      productPrice: ruleForm.value.productPrice,
      productQTY: ruleForm.value.productQTY,
    });
    ElMessage({
      type: "success",
      message: "Product added successfully",
      showClose: true,
      duration: 1500,
      offset: 20,
    });
    showForm.value = false;
    fetchData();
  } catch (error) {
    console.error("Error adding product:", error);
    ElMessage({
      type: "error",
      message: "Error adding product",
      showClose: true,
      duration: 1500,
      offset: 20,
    });
  }
};
const updateProduct = async (id) => {
  try {
    await updateDoc(doc(db, "Products", id), {
      productID: ruleForm.value.productID,
      productName: ruleForm.value.productName,
      productPrice: ruleForm.value.productPrice,
      productQTY: ruleForm.value.productQTY,
    });
    ElMessage({
      type: "success",
      message: "Product updated successfully",
      showClose: true,
      duration: 1500,
      offset: 20,
    });
    showForm.value = false;
    fetchData();
    isEditing.value = false;
  } catch (error) {
    console.error("Error updating product:", error);
    ElMessage({
      type: "error",
      message: "Error updating product",
      showClose: true,
      duration: 1500,
      offset: 20,
    });
    showForm.value = false;
  }
};
const editProduct = (row) => {
  showForm.value = true;
  isEditing.value = true;

  ruleForm.value.id = row.id;
  ruleForm.value.productID = row.productID;
  ruleForm.value.productName = row.productName;
  ruleForm.value.productPrice = row.productPrice;
  ruleForm.value.productQTY = row.productQTY;
};
const submitForm = async () => {
  const formEl = ruleFormRef.value;
  if (!formEl) return;
  try {
    if (isEditing.value) {
      await updateProduct(ruleForm.value.id);
    } else {
      await addProduct();
    }
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};
const resetForm = () => {
  const formEl = ruleFormRef.value;
  if (formEl) {
    formEl.resetFields();
  }
};
</script>
<style scoped>
  
</style>
