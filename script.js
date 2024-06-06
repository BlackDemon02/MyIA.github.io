// Función para actualizar el reloj
function actualizarReloj() {
    const ahora = new Date();
    const horas = String(ahora.getHours()).padStart(2, '0');
    const minutos = String(ahora.getMinutes()).padStart(2, '0');
    const segundos = String(ahora.getSeconds()).padStart(2, '0');
    const dia = String(ahora.getDate()).padStart(2, '0');
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const mes = meses[ahora.getMonth()];
    const año = ahora.getFullYear();
    document.getElementById('reloj').textContent = `${dia} de ${mes} de ${año} ${horas}:${minutos}:${segundos}`;
}

// Actualizar el reloj cada segundo
setInterval(actualizarReloj, 1000);
actualizarReloj();

// Función para incrementar y mostrar el contador de visitas
function actualizarContador() {
    let visitas = localStorage.getItem('contadorVisitas');
    visitas = visitas ? parseInt(visitas) + 1 : 1;
    localStorage.setItem('contadorVisitas', visitas);
    document.getElementById('visitas').textContent = visitas;
}

// Actualizar el contador de visitas al cargar la página principal
if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
    window.onload = actualizarContador;
} else {
    let visitas = localStorage.getItem('contadorVisitas');
    document.getElementById('visitas').textContent = visitas;
}

// Función para mostrar el buscador
function mostrarBuscador() {
    document.getElementById('buscador').style.display = 'flex';
    document.getElementById('search-input').focus();
}

// Función para mantener el buscador visible
function mantenerBuscador() {
    document.getElementById('buscador').style.display = 'flex';
}

// Función para ocultar el buscador
function ocultarBuscador() {
    document.getElementById('buscador').style.display = 'none';
}

// Función de búsqueda
function buscar() {
    const query = document.getElementById('search-input').value;
    alert('Buscando: ' + query);
}

// Buscar al presionar Enter
document.getElementById('search-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        buscar();
    }
});

// Eventos de mostrar/ocultar buscador
document.getElementById('buscador-btn').addEventListener('mouseover', mostrarBuscador);
document.getElementById('buscador-btn').addEventListener('mouseout', ocultarBuscador);
document.getElementById('buscador').addEventListener('mouseover', mantenerBuscador);
document.getElementById('buscador').addEventListener('mouseout', ocultarBuscador);

// Función para cambiar entre modo oscuro y claro
function toggleMode() {
    const body = document.body;
    const modeToggle = document.getElementById('mode-toggle');
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    if (body.classList.contains('dark-mode')) {
        modeToggle.textContent = 'Modo Claro';
    } else {
        modeToggle.textContent = 'Modo Oscuro';
    }
}
