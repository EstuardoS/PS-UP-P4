new Vue({
    el: '#content',
    created() {
        this.cerrarSesion();
    },
    methods: {
      async cerrarSesion() {
        sessionStorage.removeItem('usuario');
        window.location.href = 'login.html'; // Redirigir al login
      }
    }
  });