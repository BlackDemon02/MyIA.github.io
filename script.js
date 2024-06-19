document.addEventListener('DOMContentLoaded', function() {
    // Función para actualizar el reloj y la fecha
    function actualizarReloj() {
        const now = new Date();
        const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const dayName = days[now.getDay()];
        const dayNumber = now.getDate().toString().padStart(2, '0');
        const month = now.toLocaleString('es-ES', { month: 'long' });
        const year = now.getFullYear();
        const time = now.toLocaleTimeString('es-ES');
        document.getElementById('reloj').textContent = `${time} ${dayName} ${dayNumber}, ${month}, ${year}`;
    }

    setInterval(actualizarReloj, 1000);

    // Función para cambiar entre modo oscuro y modo claro
    function toggleMode() {
        document.body.classList.toggle('dark-mode');
        const modeToggle = document.getElementById('mode-toggle');
        modeToggle.textContent = document.body.classList.contains('dark-mode') ? 'Modo Claro' : 'Modo Oscuro';
        localStorage.setItem('mode', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    }

    document.getElementById('mode-toggle').addEventListener('click', toggleMode);

    // Cargar el modo preferido al cargar la página
    if (localStorage.getItem('mode') === 'dark') {
        document.body.classList.add('dark-mode');
        document.getElementById('mode-toggle').textContent = 'Modo Claro';
    }

    // Función para el buscador
    function mostrarBuscador() {
        document.getElementById('buscador').style.display = 'block';
        document.getElementById('buscador').classList.add('slide-in');
        document.getElementById('buscador').classList.remove('slide-out');
    }

    function mantenerBuscador() {
        clearTimeout(document.getElementById('buscador').hideTimeout);
        document.getElementById('buscador').style.display = 'block';
    }

    function ocultarBuscador() {
        const buscador = document.getElementById('buscador');
        buscador.hideTimeout = setTimeout(() => {
            buscador.style.display = 'none';
            buscador.classList.add('slide-out');
            buscador.classList.remove('slide-in');
        }, 500);
    }

    document.getElementById('buscador-btn').addEventListener('mouseover', mostrarBuscador);
    document.getElementById('buscador').addEventListener('mouseover', mantenerBuscador);
    document.getElementById('buscador').addEventListener('mouseout', ocultarBuscador);

    // Función para enviar el correo desde el formulario de contacto
    function sendEmail(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const sex = document.getElementById('sex').value;
        const age = document.getElementById('age').value;
        const message = document.getElementById('message').value;

        const mailtoLink = `mailto:hooneyia20@outlook.com?subject=Mensaje de ${name}&body=Nombre: ${name}%0AEmail: ${email}%0ASexo: ${sex}%0AEdad: ${age}%0AMensaje: ${message}`;
        window.location.href = mailtoLink;
    }

    document.getElementById('contact-form').addEventListener('submit', sendEmail);

    // Función para mostrar y ocultar la sección de sobre mí
    function toggleAboutMe() {
        const content = document.getElementById('about-me-content');
        const triangle = document.getElementById('triangle');
        if (content.style.display === 'none' || content.style.display === '') {
            content.style.display = 'block';
            triangle.textContent = '▲';
        } else {
            content.style.display = 'none';
            triangle.textContent = '▼';
        }
    }

    document.querySelector('#about-me h2').addEventListener('click', toggleAboutMe);

    // Función para mostrar la ubicación del usuario
    function mostrarUbicacion() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                var url = `https://www.google.com/maps?q=${lat},${lng}`;
                window.open(url, '_blank');
            }, function(error) {
                alert('Error al obtener la ubicación: ' + error.message);
            });
        } else {
            alert('Tu navegador no soporta geolocalización.');
        }
    }

    document.getElementById('ubicacion-btn').addEventListener('click', mostrarUbicacion);

    // Función para actualizar el contador de visitas
    function actualizarContador() {
        let visitas = localStorage.getItem('visitas');
        if (!visitas) {
            visitas = 0;
        }
        const deviceID = localStorage.getItem('deviceID');
        if (!deviceID) {
            const newDeviceID = 'device-' + Date.now();
            localStorage.setItem('deviceID', newDeviceID);
            visitas++;
            localStorage.setItem('visitas', visitas);
        }
        document.getElementById('visit-counter').textContent = `Visitas: ${visitas}`;
    }

    actualizarContador();
});
