new Vue({
    el: '#content',
    data: {
        solicitudes: [],
        nuevoSolicitud: {
            titulo: '',
            descripcion: '',
            prioridadId: null,
            categoriaId: null,
            ubicacionId: null,
            personaId: null
        },
        imagen: null, // Se agregó para almacenar la imagen seleccionada
        prioridades: [],
        categorias: [],
        ubicaciones: [],
        personas: [],
        solicitudSeleccionada: null, // Inicializar como objeto vacío
        modalEditarSolicitud: null,
        modalEliminarSolicitud: null
    },
    created() {
        this.fetchSolicitudes();
        this.fetchPrioridades();
        this.fetchCategorias();
        this.fetchUbicaciones();
        this.fetchPersonas();
    },
    methods: {
        async fetchSolicitudes() {
            try {
                const response = await fetch('http://192.168.10.196:5176/api/Solicitud');
                if (response.ok) {
                    const data = await response.json();
                    this.solicitudes = data;
                } else {
                    console.error('Error al obtener solicitudes', response.status);
                }
            } catch (error) {
                console.error('Error en la solicitud', error);
            }
        },

        // Método para manejar la selección del archivo de imagen
        handleFileChange(event) {
            this.imagen = event.target.files[0]; // Almacenar la imagen seleccionada
        },

        async crearSolicitud() {
            try {
                // Enviar primero los datos de la solicitud sin la imagen
                const response = await fetch('http://192.168.10.196:5176/api/Solicitud', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.nuevoSolicitud)
                });

                if (response.ok) {
                    const solicitudCreada = await response.json(); // Obtener la solicitud creada con su ID

                    // Si hay una imagen seleccionada, hacer el envío de la imagen por separado
                    if (this.imagen) {
                        await this.subirImagen(); // Cambié esta línea para que no envíe el ID de la solicitud
                    }

                    // Refrescar la lista de solicitudes
                    await this.fetchSolicitudes();
                    this.resetNuevaSolicitud();

                    // Cerrar el modal de creación
                    const modalEl = document.getElementById('createSolicitudModal');
                    const modalInstance = bootstrap.Modal.getInstance(modalEl);
                    modalInstance.hide();
                } else {
                    console.error('Error al crear solicitud', response.status);
                }
            } catch (error) {
                console.error('Error en la solicitud', error);
            }
        },

        // Método para subir la imagen directamente a la carpeta fotos_solicitudes
        async subirImagen() {
            try {
                const formData = new FormData();
                formData.append('imagen', this.imagen); // Agregar la imagen al FormData

                // Realizar la solicitud POST para subir la imagen
                const response = await fetch('http://localhost:3000/upload-image', { // Cambia esta URL a la que hayas configurado en tu servidor
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    console.error('Error al subir la imagen', response.status);
                }
            } catch (error) {
                console.error('Error en la solicitud de subida de imagen', error);
            }
        },

        async actualizarSolicitud() {
            try {
                const response = await fetch(`http://192.168.10.196:5176/api/Solicitud/${this.solicitudSeleccionada.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ...this.solicitudSeleccionada,
                        activo: true
                    })
                });
                if (response.ok) {
                    await this.fetchSolicitudes();
                    this.modalEditarSolicitud.hide();
                } else {
                    console.error('Error al actualizar solicitud', response.status);
                }
            } catch (error) {
                console.error('Error en la solicitud', error);
            }
        },

        async eliminarSolicitud() {
            try {
                const response = await fetch(`http://192.168.10.196:5176/api/Solicitud/${this.solicitudSeleccionada.id}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    await this.fetchSolicitudes();
                    this.modalEliminarSolicitud.hide();
                } else {
                    console.error('Error al eliminar solicitud', response.status);
                }
            } catch (error) {
                console.error('Error en la solicitud', error);
            }
        },

        mostrarModalEdicion(solicitud) {
            this.solicitudSeleccionada = { ...solicitud };
            this.modalEditarSolicitud = new bootstrap.Modal(document.getElementById('editSolicitudModal'));
            this.modalEditarSolicitud.show();
        },

        mostrarEliminarModal(solicitud) {
            this.solicitudSeleccionada = { ...solicitud };
            this.modalEliminarSolicitud = new bootstrap.Modal(document.getElementById('deleteSolicitudModal'));
            this.modalEliminarSolicitud.show();
        },

        resetNuevaSolicitud() {
            this.nuevoSolicitud = {
                titulo: '',
                descripcion: '',
                prioridadId: null,
                categoriaId: null,
                ubicacionId: null,
                personaId: null
            };
            this.imagen = null; // Reiniciar la imagen
        },

        async fetchPrioridades() {
            try {
                const response = await fetch('http://192.168.10.196:5176/api/Prioridad');
                if (response.ok) {
                    const data = await response.json();
                    this.prioridades = data;
                } else {
                    console.error('Error al obtener prioridades', response.status);
                }
            } catch (error) {
                console.error('Error en la solicitud', error);
            }
        },

        async fetchCategorias() {
            try {
                const response = await fetch('http://192.168.10.196:5176/api/Categoria');
                if (response.ok) {
                    const data = await response.json();
                    this.categorias = data;
                } else {
                    console.error('Error al obtener categorías', response.status);
                }
            } catch (error) {
                console.error('Error en la solicitud', error);
            }
        },

        async fetchUbicaciones() {
            try {
                const response = await fetch('http://192.168.10.196:5176/api/Ubicacion');
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

        async fetchPersonas() {
            try {
                const response = await fetch('http://192.168.10.196:5176/api/Persona');
                if (response.ok) {
                    const data = await response.json();
                    this.personas = data;
                } else {
                    console.error('Error al obtener personas', response.status);
                }
            } catch (error) {
                console.error('Error en la solicitud', error);
            }
        }
    }
});
