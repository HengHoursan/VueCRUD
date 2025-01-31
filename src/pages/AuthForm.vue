<template>
  <div class="form-container">
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
    >
      <!-- Logo Section -->
      <div class="logo-container">
        <img
          src="../assets/images/element-plus-logo.svg"
          alt="App Logo"
          class="logo"
        />
      </div>
      <h1>{{ isLogin ? "Login" : "Sign Up" }}</h1>
      <!-- Username Field -->
      <el-form-item label="Username" prop="username" v-if="!isLogin">
        <el-input v-model="ruleForm.username" type="text" style="width: 100%" />
      </el-form-item>
      <!-- Email Field -->
      <el-form-item label="Gmail" prop="email">
        <el-input v-model="ruleForm.email" type="email" style="width: 100%" />
      </el-form-item>
      <!-- Password Field -->
      <el-form-item label="Password" prop="password">
        <el-input
          v-model="ruleForm.password"
          :type="showPassword ? 'text' : 'password'"
          autocomplete="off"
          style="width: 100%"
        />
      </el-form-item>
      <!-- Confirm Password Field -->
      <el-form-item v-if="!isLogin" label="Confirm" prop="confirmPassword">
        <el-input
          v-model="ruleForm.confirmPassword"
          :type="showPassword ? 'text' : 'password'"
          autocomplete="off"
          style="width: 100%"
        />
      </el-form-item>
      <!-- Show Password Checkbox -->
      <el-form-item>
        <el-checkbox v-model="showPassword">Show Password</el-checkbox>
      </el-form-item>
      <!-- Submit Button -->
      <el-form-item>
        <div class="btn-container">
          <el-button type="primary" class="btn-login" @click="handleSubmit">
            {{ isLogin ? "Log In" : "Sign Up" }}
          </el-button>
          <div class="register">
            <p>
              {{
                isLogin ? "Don't have an account?" : "Already have an account?"
              }}
            </p>
            <el-link
              type="primary"
              @click="toggleForm"
              v-loading.fullscreen.lock="loading"
              >{{ isLogin ? "Sign up now" : "Log in" }}</el-link
            >
          </div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useRouter } from "vue-router";

// Reactive state
const ruleForm = ref({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});
const loading = ref(false);
const dataItem = ref([]);
const isLogin = ref(true);
const showPassword = ref(false);

const router = useRouter();

// Fetch user data
const fetchData = async () => {
  try {
    const data = await getDocs(collection(db, "Users"));
    if (data.empty) {
      ElMessage.error("No user data found.");
      return;
    }
    dataItem.value = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("Fetched users:", dataItem.value);
  } catch (error) {
    ElMessage.error("Error fetching user data.");
    console.error(error);
  }
};

onMounted(() => {
  fetchData();
});

// Toggle between login and signup forms
const toggleForm = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    isLogin.value = !isLogin.value;
    ruleForm.value = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    showPassword.value = false;
  }, 1000);
};

// Handle form submission
const handleSubmit = async () => {
  if (isLogin.value) {
    handleLogin();
  } else {
    handleSignUp();
  }
};
// Handle Login
const handleLogin = () => {
  const email = ruleForm.value.email.trim();
  const password = ruleForm.value.password.trim();

  if (!email || !password) {
    ElMessage.error("Please fill out all fields.");
    return;
  }

  const user = dataItem.value.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      const username = user.username;
      localStorage.setItem("user", JSON.stringify(username));
      ElMessage({
        type: "success",
        message: "Login successful.",
        duration: 1500,
        offset: 20,
      });
      router.push("/home");
    }, 2000);
  } else {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      ElMessage({
        type: "error",
        message: "Incorrect email or password.",
        duration: 1500,
        offset: 20,
      });
    }, 2000);
  }
};

// Handle Sign Up
const handleSignUp = async () => {
  const username = ruleForm.value.username.trim();
  const email = ruleForm.value.email.trim();
  const password = ruleForm.value.password.trim();
  const confirmPassword = ruleForm.value.confirmPassword.trim();
  if (!email || !password || !confirmPassword) {
    ElMessage.error("Please fill out all fields.");
    return;
  }

  if (password !== confirmPassword) {
    ElMessage.error("Passwords do not match.");
    return;
  }
  try {
    await addDoc(collection(db, "Users"), {
      username: username,
      email: email,
      password: password,
    });
  } catch (error) {
    console.error("Error adding user:", error);
    ElMessage.error("Error adding user.");
  }
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    ElMessage({
      type: "success",
      message: "Sign Up successful. Please log in.",
      duration: 1500,
      offset: 20,
    });
    fetchData();
    isLogin.value = true;
    showPassword.value = false;
  }, 2000);
  ruleForm.value = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
};

// Validation rules
const rules = {
  username: [
    { required: true, message: "Please input your username.", trigger: "blur" },
  ],
  email: [
    { required: true, message: "Please input your email.", trigger: "blur" },
    { type: "email", message: "Please enter a valid email.", trigger: "blur" },
  ],
  password: [
    { required: true, message: "Please input your password.", trigger: "blur" },
  ],
  confirmPassword: [
    {
      required: true,
      message: "Please confirm your password.",
      trigger: "blur",
    },
    {
      validator: (rule, value, callback) => {
        if (value !== ruleForm.value.password) {
          callback(new Error("Passwords do not match!"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
};
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    150deg,
    rgba(255, 255, 255, 1) 50%,
    rgba(64, 158, 255, 1) 50%
  );
}
.logo {
  width: 195px;
  height: auto;
  object-fit: cover;
  margin-bottom: 20px;
}
.demo-ruleForm {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 600px;
  height: 600px;
  padding: 10px;
  outline: solid 1px #d9dce3;
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  gap: 10px;
}
.el-form-item {
  width: 80%;
}
.btn-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  width: 100%;
}
.register {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}
.btn-login {
  width: 100px;
}
h1 {
  font-size: 2rem;
  color: #333;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  letter-spacing: 2.5px;
}
</style>
