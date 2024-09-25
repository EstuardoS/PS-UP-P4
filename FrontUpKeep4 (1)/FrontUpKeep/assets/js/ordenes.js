new Vue({
    el: '#content',
    data: {
        ordenes: [],
        nuevaOrden: {
            titulo: '',
            descripcion: '',
            fechaInicio: null,
            fechaFin: null,
            prioridadId: null,
            categoriaId: null,
            ubicacionId: null,
            personaId: null
        },
        ordenSeleccionada: null,
        modalEditarOrden: null,
        modalEliminarOrden: null,
        prioridades: [],
        categorias: [],
        ubicaciones: [],
        personas: [],
        estados: []
    },
    created() {
        this.fetchOrdenes();
        this.fetchPrioridades();
        this.fetchCategorias();
        this.fetchUbicaciones();
        this.fetchPersonas();
        this.fetchEstados();
    },
    methods: {
        async fetchOrdenes() {
            try {
                const response = await fetch('http://192.168.10.196:5176/api/OrdenTrabajo');
                if (response.ok) {
                    const data = await response.json();
                    this.ordenes = data;
                } else {
                    console.error('Error al obtener órdenes', response.status);
                }
            } catch (error) {
                console.error('Error en la solicitud', error);
            }
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
        },
        async fetchEstados() {
            try {
                const response = await fetch('http://192.168.10.196:5176/api/Estado/OT');
                if (response.ok) {
                    const data = await response.json();
                    this.estados = data;
                } else {
                    console.error('Error al obtener estados', response.status);
                }
            } catch (error) {
                console.error('Error en la solicitud', error);
            }
        },
        mostrarModalEdicion(orden) {
            this.ordenSeleccionada = { ...orden };
            this.modalEditarOrden = new bootstrap.Modal(document.getElementById('editOrdenTrabajoModal'));
            this.modalEditarOrden.show();
        },
        mostrarModalEliminar(orden) {
            this.ordenSeleccionada = orden;
            this.modalEliminarOrden = new bootstrap.Modal(document.getElementById('eliminarOrdenTrabajoModal'));
            this.modalEliminarOrden.show();

        },
        async crearOrden() {
            // Lógica para crear una nueva orden
            try {
                const response = await fetch('http://192.168.10.196:5176/api/OrdenTrabajo', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json'},
                    body: JSON.stringify(this.nuevaOrden),
                });
                if (response.ok) {
                    await this.fetchOrdenes();
                    this.limpiarFormulario(); // Limpia el formulario

                    const modalEl = document.getElementById('createOrdenTrabajoModal');
                    const modalInstance = bootstrap.Modal.getInstance(modalEl); 
                    modalInstance.hide();
                } else {
                    console.error('Error al crear orden', response.status);
                }
            } catch (error) {
                console.error('Error en la solicitud', error);
            }
        },
        async editarOrden() {
            try {
                const response = await fetch(`http://192.168.10.196:5176/api/OrdenTrabajo/${this.ordenSeleccionada.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.ordenSeleccionada),
                });

                if (response.ok) {
                    await this.fetchOrdenes();
                    this.modalEditarOrden.hide();
                } else {
                    console.error('Error al editar orden', response.status);
                }
            } catch (error) {
                console.error('Error en la solicitud', error);
            }
        },
        async eliminarOrden() {
            try {
                const response = await fetch(`http://192.168.10.196:5176/api/OrdenTrabajo/${this.ordenSeleccionada.id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    await this.fetchOrdenes();
                    this.modalEliminarOrden.hide();
                } else {
                    console.error('Error al eliminar orden', response.status);
                }
            } catch (error) {
                console.error('Error en la solicitud', error);
            }
        },
        limpiarFormulario() {
            this.nuevaOrden = {
                titulo: '',
                descripcion: '',
                fechaInicio: null,
                fechaFin: null,
                horasDuracion: null,
                prioridadId: null,
                categoriaId: null,
                ubicacionId: null,
                personaId: null
            };
        }
    },
});
