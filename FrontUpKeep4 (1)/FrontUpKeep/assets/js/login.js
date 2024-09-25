new Vue({
    el: '#content',
    data() {
      return {
        usuario: {
          email: '',
          password: ''
        },
        error: null
      };
    },
    methods: {
      async iniciarSesion() {
        try {
          const response = await fetch('http://192.168.10.196:5176/api/Login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.usuario)
          });
  
          if (response.ok) {
            const data = await response.json();
            // Guardar datos en sesión
            sessionStorage.setItem('usuario', JSON.stringify(data));
            window.location.href = 'index.html'; // Redirigir al index
          } else {
            const errorMsg = await response.json();
            this.error = errorMsg.mensajeError; // Mensaje de error del backend
          }
        } catch (error) {
          this.error = error;
        }
      }
    }
  });
  