const montanas = [
    'Macizo Galaico',
    'Montes de León',
    'Cordillera Cantábrica',
    'Pirineos',
    'Montes Vascos',
    'Depresión del Ebro',
    'Sistema Ibérico',
    'Submeseta Norte',
    'Cordillera del Guadarrama',
    'Sistema Central',
    'Montes de Toledo',
    'Submeseta Sur',
    'Sierra Morena',
    'Depresión del Guadalquivir',
    'Montes de Córdoba',
    'Cordillera Penibética',
    'Telde'
];

let aciertos = 0;
let seleccionada = null;
let seleccionadaZona = null;

// Inicializar el juego
function iniciarJuego() {
    // Crear botones de nombres
    const container = document.getElementById('nombresContainer');
    container.innerHTML = '';
    
    // Shuffle array para variar el orden
    const montanasShuffled = [...montanas].sort(() => Math.random() - 0.5);
    
    montanasShuffled.forEach(montana => {
        const btn = document.createElement('button');
        btn.className = 'nombre-btn';
        btn.textContent = montana;
        btn.dataset.montana = montana;
        btn.onclick = () => seleccionarNombre(btn, montana);
        container.appendChild(btn);
    });
    
    // Agregar click listeners a las zonas
    agregarListenerZonas();
    
    aciertos = 0;
    seleccionada = null;
    seleccionadaZona = null;
    actualizarPuntuacion();
    limpiarMensaje();
}

function seleccionarNombre(btn, montana) {
    if (btn.classList.contains('usado')) return;
    
    // Si hay una seleccionada, deselecciona
    if (seleccionada && seleccionada !== btn) {
        seleccionada.classList.remove('seleccionada');
    }
    
    // Alternar selección
    if (btn === seleccionada) {
        btn.classList.remove('seleccionada');
        seleccionada = null;
    } else {
        btn.classList.add('seleccionada');
        seleccionada = btn;
    }
}

function agregarListenerZonas() {
    const zonas = document.querySelectorAll('.zona');
    zonas.forEach(zona => {
        zona.onclick = () => seleccionarZona(zona);
    });
}

function seleccionarZona(zona) {
    if (!seleccionada) {
        mostrarMensaje('Primero selecciona un nombre ⬅️', false);
        return;
    }
    
    const montanaZona = zona.dataset.montana;
    const montanaSeleccionada = seleccionada.dataset.montana;
    
    if (montanaZona === montanaSeleccionada) {
        zona.classList.add('activa');
        zona.textContent = montanaZona.split(' ').slice(0, 2).join(' ');
        seleccionada.classList.add('usado');
        seleccionada.classList.remove('seleccionada');
        aciertos++;
        mostrarMensaje('✅ ¡Correcto!', true);
        seleccionada = null;
        actualizarPuntuacion();
        
        if (aciertos === montanas.length) {
            setTimeout(() => {
                mostrarMensaje('🏆 ¡Completaste el juego! ¡Excelente trabajo!', 'completo');
            }, 500);
        }
    } else {
        mostrarMensaje('❌ Intenta de nuevo', false);
        zona.style.animation = 'shake 0.5s';
        setTimeout(() => {
            zona.style.animation = '';
        }, 500);
    }
}

function actualizarPuntuacion() {
    document.getElementById('puntuacion').textContent = aciertos;
}

function mostrarMensaje(texto, tipo) {
    const mensajeDiv = document.getElementById('mensaje');
    mensajeDiv.textContent = texto;
    mensajeDiv.className = 'mensaje';
    if (tipo === true) {
        mensajeDiv.classList.add('exito');
    } else if (tipo === 'completo') {
        mensajeDiv.classList.add('completo');
    }
    
    if (tipo === true || tipo === 'completo') {
        setTimeout(() => limpiarMensaje(), 2000);
    }
}

function limpiarMensaje() {
    const mensajeDiv = document.getElementById('mensaje');
    mensajeDiv.className = 'mensaje';
    mensajeDiv.textContent = '';
}

// Reiniciar juego
document.getElementById('reiniciar').onclick = () => {
    location.reload();
};

// Agregar animación CSS dinámicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// Iniciar cuando carga la página
window.onload = iniciarJuego;