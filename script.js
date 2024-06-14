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

    // Función para el contador de visitas
    function obtenerContadorVisitas() {
        if (isHomePage() && !ignorarContador()) {
            let visitas = localStorage.getItem('contadorVisitas');
            if (!visitas) {
                visitas = 0;
            }
            visitas++;
            localStorage.setItem('contadorVisitas', visitas);
            document.getElementById('visitas').textContent = visitas;
        } else {
            const visitas = localStorage.getItem('contadorVisitas');
            document.getElementById('visitas').textContent = visitas;
        }
    }

    function isHomePage() {
        return window.location.pathname.includes('index.html');
    }

    function ignorarContador() {
        const ignoreCounter = localStorage.getItem('ignoreCounter');
        if (ignoreCounter) {
            localStorage.removeItem('ignoreCounter');
            return true;
        }
        return false;
    }

    document.querySelectorAll('button[data-ignore-counter="true"]').forEach(button => {
        button.addEventListener('click', () => {
            localStorage.setItem('ignoreCounter', true);
        });
    });

    obtenerContadorVisitas();

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
        document.getElementById('buscador').style.display = 'flex';
    }

    function mantenerBuscador() {
        clearTimeout(document.getElementById('buscador').hideTimeout);
        document.getElementById('buscador').style.display = 'flex';
    }

    function ocultarBuscador() {
        const buscador = document.getElementById('buscador');
        buscador.hideTimeout = setTimeout(() => {
            buscador.style.display = 'none';
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

    // Función para pedir la ubicación del usuario
    function pedirUbicacion() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                obtenerUbicacionGoogle(lat, lon);
            }, showError);
        } else {
            obtenerUbicacionPorIP();
        }
    }

    function obtenerUbicacionGoogle(lat, lon) {
        const geocoder = new google.maps.Geocoder();
        const latlng = { lat: parseFloat(lat), lng: parseFloat(lon) };

        geocoder.geocode({ 'location': latlng }, (results, status) => {
            if (status === 'OK') {
                if (results[0]) {
                    const ubicacion = results[0].formatted_address;
                    localStorage.setItem('ubicacion', JSON.stringify({ lat, lon, ubicacion }));
                    mostrarUbicacion({ lat, lon, ubicacion });
                } else {
                    alert('No se encontraron resultados.');
                }
            } else {
                alert('Geocoder falló debido a: ' + status);
            }
        });
    }

    function obtenerUbicacionPorIP() {
        fetch('https://ipapi.co/json/')
            .then(response => response.json())
            .then(data => {
                const ubicacion = `${data.city}, ${data.region}, ${data.country_name}`;
                localStorage.setItem('ubicacion', JSON.stringify({ ubicacion }));
                mostrarUbicacion({ ubicacion });
            })
            .catch(error => {
                console.error('Error al obtener la ubicación por IP:', error);
            });
    }

    function mostrarUbicacion({ ubicacion }) {
        const locationDisplay = document.getElementById('location-display');
        locationDisplay.textContent = `Ubicación: ${ubicacion}`;
    }

    function showError(error) {
        obtenerUbicacionPorIP();
    }

    // Mostrar ubicación si ya está en localStorage
    const ubicacionGuardada = localStorage.getItem('ubicacion');
    if (ubicacionGuardada) {
        mostrarUbicacion(JSON.parse(ubicacionGuardada));
    } else {
        pedirUbicacion();
    }
});
