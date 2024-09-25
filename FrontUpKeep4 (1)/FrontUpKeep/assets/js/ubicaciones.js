// ubicaciones.js
new Vue({
    el: '#content',
    data: {
        ubicaciones: [],
        nuevaUbicacion: {
            nombre: '',
            direccion: '',
        },
        ubicacionSeleccionada: null
    },
    created() {
        this.fetchUbicaciones();
    },
    methods: {
        async fetchUbicaciones() {
            try {
                const response = await fetch('http://192.168.10.196:5176/api/ubicacion');
                if (response.ok) {
                    const data = await response.json();
                    this.ubicaciones = data;
                } else {
                    console.error('Error al obtener ubicaciones', response.status);
                }
            } catch (error) {
                console.error('Error en la solicitud', error);
            }
        },
        async crearUbicacion() {
            try {
                alert(JSON.stringify(this.nuevaUbicacion));
                const response = await fetch('http://192.168.10.196:5176/api/ubicacion', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...this.nuevaUbicacion, activo: true }) // Agregar propiedad 'activo'
                });
                if (response.ok) {
                    await this.fetchUbicaciones(); // Actualizar lista después de crear
                    this.resetNuevaUbicacion();
                    new bootstrap.Modal(document.getElementById('createUbicacionModal')).hide();
                } else {
                    console.error('Error al crear ubicación', response.status);
                }
            } catch (error) {
                console.error('Error en la solicitud', error);
            }
        },
        async actualizarUbicacion() {
            try {
                const response = await fetch(`http://192.168.10.196:5176/api/Ubicacion/${this.ubicacionSeleccionada.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...this.ubicacionSeleccionada, activo: true }) // Agregar propiedad 'activo'
                });
                if (response.ok) {
                    await this.fetchUbicaciones(); // Actualizar lista después de actualizar
                    new bootstrap.Modal(document.getElementById('editUbicacionModal')).hide();
                } else {
                    console.error('Error al actualizar ubicación', response.status);
                }
            } catch (error) {
                console.error('Error en la solicitud', error);
            }
        },
        async eliminarUbicacion() {
            try {
                const response = await fetch(`http://192.168.10.196:5176/api/Ubicacion/${this.ubicacionSeleccionada.id}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    await this.fetchUbicaciones(); // Actualizar lista después de eliminar
                    new bootstrap.Modal(document.getElementById('deleteUbicacionModal')).hide();
                } else {
                    console.error('Error al eliminar ubicación', response.status);
                }
            } catch (error) {
                console.error('Error en la solicitud', error);
            }
        },
        mostrarModalEdicion(ubicacion) {
            this.ubicacionSeleccionada = { ...ubicacion };
            new bootstrap.Modal(document.getElementById('editUbicacionModal')).show();
        },
        mostrarModalEliminar(ubicacion) {
            this.ubicacionSeleccionada = ubicacion;
            new bootstrap.Modal(document.getElementById('deleteUbicacionModal')).show();
        },
        resetNuevaUbicacion() {
            this.nuevaUbicacion = {
                nombre: '',
                direccion: '',
                trabajadores: 0,
                equipo: '',
                proveedores: '',
                clientes: ''
            };
        }
    }
});
