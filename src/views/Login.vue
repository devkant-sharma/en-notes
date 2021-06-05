<template>
  <div class="view-login">
    <form @submit.prevent="handleSubmit" class="form-login">
      <div class="title">The Notes App</div>

      <label for="email" class="form-label">Email</label>
      <input
        v-model="form.email"
        type="email"
        placeholder="Enter Email"
        class="form-input"
        name="email"
        required
      />

      <label for="psw" class="form-label">Password</label>
      <input
        v-model="form.psw"
        type="password"
        placeholder="Enter Password"
        class="form-input"
        name="psw"
        required
      />

      <button type="submit" class="btn btn-primary">Login</button>

      <div class="hint">
        email: admin@gmail.com <br />
        pwd: 12345
      </div>

      <div v-if="error" class="error">
        {{ error }}
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      form: {
        email: "",
        psw: "",
      },
      error: "",
      timeout: null,
    };
  },
  methods: {
    handleSubmit() {
      if (this.form.email !== "admin@gmail.com" && this.form.psw !== "12345")
        return this.handleError("Invalid credentials");
      localStorage.setItem("isLoggedin", true);
      this.$router.push("/notes");
    },

    handleError(msg) {
      this.error = msg;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.error = "";
      }, 3000);
    },
  },

  beforeDestroy() {
    clearTimeout(this.timeout);
  },
};
</script>
