<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2 custom-card">
      <h2 class="brand-text text-success ml-1">Iniciar sesión</h2>
      <form @submit.prevent="submitForm" class="auth-login-form mt-2">
        <div class="form-group">
          <label for="username">Nombre de usuario:</label>
          <input type="text" id="username" v-model="username" class="form-control" autocomplete="on">
        </div>
        <div class="form-group">
          <label for="password">Contraseña:</label>
          <input type="password" id="password" v-model="password" class="form-control" autocomplete="on">
        </div>
        <button type="submit" class="btn btn-success btn-block" :disabled="!username || !password">
          Iniciar sesión
        </button>
      </form>
      <div v-if="loading" class="loading-overlay">
        <div class="spinner"></div>
      </div>
      <div v-if="success" class="alert alert-success mt-2">
        Credenciales correctas. Redirigiendo a la página de dispositivos...
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import './LoginView.css';
 
  export default {
    name: 'LoginView',
    data() {
      return {
        username: '',
        password: '',
        loading: false,
        success: false
      };
    },
    methods: {
      submitForm(event) {
        event.preventDefault(); // prevenir la recarga de la página
        const api = axios.create({
            baseURL: `${process.env.VUE_APP_API_URL}`,
          });
        this.loading = true;
        api.post(`/login`, {
          username: this.username,
          password: this.password
        })
        .then(response => {
          localStorage.setItem('authToken', response.data.token);
          this.loading = false;
          this.success = true;
          setTimeout(() => {
            this.$router.push('/devices');
          }, 2000); // Redirigir a la página de dispositivos después de 2 segundos
        })
        .catch(error => {
          this.loading = false;
          console.log('Error de inicio de sesión:', error.response.data.message);
        });
      }
    } ,mounted() {
    document.title = 'Login';
  },
  };
</script>
