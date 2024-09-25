document.addEventListener("DOMContentLoaded", function () {

  let usuario = JSON.parse(sessionStorage.getItem('usuario'));
  
  if(usuario)
  {
    document.querySelector('#nombreUsuario').textContent = `Usuario: ${usuario.nombre}`;
  }
  // Cargar el menú al iniciar
  loadMenu();

  // Escuchar los clics en los enlaces del menú para cargar las pantallas
  document.addEventListener('click', function (e) {
    if (e.target && e.target.tagName === 'A' && e.target.getAttribute('href')) {
      e.preventDefault();
      let url = e.target.getAttribute('href');
      loadContent(url);
    }
  });

  function loadMenu() {
    fetch('menu.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('menu').innerHTML = data;
      });
  }

  function loadContent(url) {
    verificarSesion();
    fetch(url)
      .then(response => response.text())
      .then(data => {
        document.getElementById('content').innerHTML = data;
        const baseName = getBaseName(url);

        const script = document.createElement('script');
        script.src = 'assets/js/'+ baseName +'.js';
        document.body.appendChild(script);
      })
      .catch(err => console.error('Error al cargar contenido:', err));
  }

  function verificarSesion()
  {
    usuario = JSON.parse(sessionStorage.getItem('usuario'));

    if (!usuario) {
      window.location.href = 'login.html'; // Redirige al login si no está autenticado
    }
  }

  function getBaseName(fileName) {
    // Encuentra el último punto en el nombre del archivo
    const lastDotIndex = fileName.lastIndexOf('.');
    
    // Si hay un punto y no está al inicio o final de la cadena
    if (lastDotIndex > 0) {
      // Devuelve la subcadena antes del punto
      return fileName.substring(0, lastDotIndex);
    }
    
    // Si no hay un punto, devuelve el nombre del archivo tal cual
    return fileName;
  }

  // Cargar la pantalla inicial (Solicitudes) al inicio
  loadContent('ordenes.html');

});
