const montanas = [
    'Macizo Galaico',
    'Montes de León',
    'Cordillera Cantábrica',
    'Montes de Toledo',
    'Sistema Central',
    'Cordillera del Guadarrama',
    'Depresión del Ebro',
    'Sistema Ibérico',
    'Submeseta Norte',
    'Pirineos',
    'Montes Vascos',
    'Submeseta Sur',
    'Sierra Morena',
    'Depresión del Guadalquivir',
    'Montes de Córdoba',
    'Cordillera Penibética',
    'Telde'
];

let aciertos = 0;
let seleccionada = null;

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
    
    // Posicionar zonas en el mapa (según el mapa proporcionado)
    posicionarZonas();
    
    aciertos = 0;
    seleccionada = null;
    actualizarPuntuacion();
    limpiarMensaje();
}

function seleccionarNombre(btn, montana) {
    if (btn.classList.contains('usado')) return;
    
    // Si hay una seleccionada, deselecciona
    if (seleccionada && seleccionada !== btn) {
        seleccionada.style.opacity = '1';
    }
    
    // Alternar selección
    if (btn === seleccionada) {
        btn.style.opacity = '1';
        seleccionada = null;
    } else {
        btn.style.opacity = '0.7';
        seleccionada = btn;
    }
}

function seleccionarZona(zona) {
    if (!seleccionada) {
        mostrarMensaje('Primero selecciona un nombre', false);
        return;
    }
    
    const montanaZona = zona.dataset.montana;
    const montanaSeleccionada = seleccionada.dataset.montana;
    
    if (montanaZona === montanaSeleccionada) {
        zona.classList.add('activa');
        zona.textContent = montanaZona;
        seleccionada.classList.add('usado');
        seleccionada.style.opacity = '1';
        aciertos++;
        mostrarMensaje('¡Correcto! 🎉', true);
        seleccionada = null;
        actualizarPuntuacion();
        
        if (aciertos === montanas.length) {
            setTimeout(() => {
                mostrarMensaje('¡Completaste el juego! Excelente trabajo 🏆', 'completo');
            }, 500);
        }
    } else {
        mostrarMensaje('Intenta de nuevo ❌', false);
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

function posicionarZonas() {
    const zonas = document.querySelectorAll('.zona');
    // Posiciones basadas en el mapa proporcionado con números del 1-17
    const posiciones = [
        { top: '20%', left: '8%' },   // 1. Macizo Galaico
        { top: '15%', left: '18%' },  // 2. Montes de León
        { top: '12%', left: '28%' },  // 3. Cordillera Cantábrica
        { top: '50%', left: '35%' },  // 4. Montes de Toledo
        { top: '38%', left: '42%' },  // 5. Sistema Central
        { top: '32%', left: '50%' },  // 6. Cordillera del Guadarrama
        { top: '28%', left: '55%' },  // 7. Depresión del Ebro
        { top: '35%', left: '62%' },  // 8. Sistema Ibérico
        { top: '28%', left: '45%' },  // 9. Submeseta Norte
        { top: '8%', left: '50%' },   // 10. Pirineos
        { top: '20%', left: '38%' },  // 11. Montes Vascos
        { top: '52%', left: '50%' },  // 12. Submeseta Sur
        { top: '58%', left: '35%' },  // 13. Sierra Morena
        { top: '62%', left: '42%' },  // 14. Depresión del Guadalquivir
        { top: '60%', left: '48%' },  // 15. Montes de Córdoba
        { top: '72%', left: '60%' },  // 16. Cordillera Penibética
        { top: '85%', left: '15%' }   // 17. Telde (Canarias)
    ];
    
    zonas.forEach((zona, index) => {
        zona.style.top = posiciones[index].top;
        zona.style.left = posiciones[index].left;
        zona.onclick = () => seleccionarZona(zona);
    });
}

// Reiniciar juego
document.getElementById('reiniciar').onclick = () => {
    location.reload();
};

// Añadir animación CSS dinámicamente
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