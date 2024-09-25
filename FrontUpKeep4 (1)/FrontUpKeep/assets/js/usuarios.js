// usuarios.js
new Vue({
    el: '#content',
    data: {
      usuarios: [],
      roles: [],
      nuevoUsuario: {
        email: '',
        rolid: ''
      },
      usuarioSeleccionado: null,
      modalEditarUsuario: null,
      modalEliminarUsuario: null
    },
    created() {
      this.fetchUsuarios();
      this.fetchRoles();
    },
    methods: {
      async fetchUsuarios() {
        try {
          const response = await fetch('http://192.168.10.196:5176/api/Persona');
          if (response.ok) {
            const data = await response.json();
            this.usuarios = data;
          } else {
            console.error('Error al obtener usuarios', response.status);
          }
        } catch (error) {
          console.error('Error en la solicitud', error);
        }
      },
      async fetchRoles() {
        try {
          const response = await fetch('http://192.168.10.196:5176/api/Rol');
          if (response.ok) {
            const data = await response.json();
            this.roles = data;
          } else {
            console.error('Error al obtener roles', response.status);
          }
        } catch (error) {
          console.error('Error en la solicitud', error);
        }
      },
      async crearUsuario() {
        try {
          const response = await fetch('http://192.168.10.196:5176/api/Persona', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.nuevoUsuario)
          });
          if (response.ok) {
            await this.fetchUsuarios(); // Actualizar lista después de crear
            this.resetNuevoUsuario();

            const modalEl = document.getElementById('crearUsuarioModal');
            const modalInstance = bootstrap.Modal.getInstance(modalEl); 
            modalInstance.hide();
          } else {
            console.error('Error al crear usuario', response.status);
          }
        } catch (error) {
          console.error('Error en la solicitud', error);
        }
      },
      async actualizarUsuario() {
        try {
          const response = await fetch(`http://192.168.10.196:5176/api/Persona/${this.usuarioSeleccionado.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.usuarioSeleccionado)
          });
          if (response.ok) {
            await this.fetchUsuarios(); // Actualizar lista después de actualizar
            this.modalEditarUsuario.hide();
          } else {
            console.error('Error al actualizar usuario', response.status);
          }
        } catch (error) {
          console.error('Error en la solicitud', error);
        }
      },
      async eliminarUsuario() {
        try {
          const response = await fetch(`http://192.168.10.196:5176/api/Persona/${this.usuarioSeleccionado.id}`, {
            method: 'DELETE'
          });
          if (response.ok) {
            await this.fetchUsuarios(); // Actualizar lista después de eliminar
            this.modalEliminarUsuario.hide();
          } else {
            console.error('Error al eliminar usuario', response.status);
          }
        } catch (error) {
          console.error('Error en la solicitud', error);
        }
      },
      editarUsuario(usuario) {
        this.usuarioSeleccionado = { ...usuario };
        this.modalEditarUsuario = new bootstrap.Modal(document.getElementById('editarUsuarioModal'));
        this.modalEditarUsuario.show();
      },
      mostrarEliminarModal(usuario) {
        this.usuarioSeleccionado = usuario;
        this.modalEliminarUsuario = new bootstrap.Modal(document.getElementById('eliminarUsuarioModal'));
        this.modalEliminarUsuario.show();
      },
      resetNuevoUsuario() {
        this.nuevoUsuario = { email: '', rolid: '' };
      }
    }
  });  