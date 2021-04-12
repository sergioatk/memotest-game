const colores = ['red', 'red', 'blue', 'blue', 'brown', 'brown', 'violet', 'violet', 'yellow', 'yellow', 'black', 'black'];
const $tablero = document.querySelector('#tablero');
const $cuadros = document.querySelectorAll('.cuadro');


let primeraSeleccion = null;

let movimientos = 0;

const coloresMezclados = mezclarColores(colores);



armarTablero();

manejarJuego();

function manejarJuego() {

    $tablero.onclick = function (e) {

        const $elemento = e.target;

        if ($elemento.classList.contains('cuadro')) {
            manejarClickCudaro($elemento);
        }
    }

}

function manejarClickCudaro(nuevoCuadro) {
    
        
    if (primeraSeleccion === null) {
        primeraSeleccion = nuevoCuadro;
        mostrarCuadro(primeraSeleccion);
    } else {

        if (primeraSeleccion === nuevoCuadro) {
            return;
        }
        
        mostrarCuadro(nuevoCuadro);
        movimientos++;
        console.log(`movimientos = ${movimientos}`)

        

        if (!evaluarSeleccion(primeraSeleccion, nuevoCuadro)) {
            ocultarCuadro(primeraSeleccion);
            ocultarCuadro(nuevoCuadro);
            primeraSeleccion = null;
        } else {
            eliminarCuadro(primeraSeleccion);
            eliminarCuadro(nuevoCuadro);
            primeraSeleccion = null;
        }
        

    }
    
    
}

function evaluarFinJuego() {
    if (document.querySelectorAll('.cuadro').length === 0) {
        $tablero.style.display = 'none';
        document.querySelector('#exito').classList.remove('oculto');
        document.querySelector('strong').textContent = movimientos;
    }
}

function eliminarCuadro(cuadro) {
    setTimeout(function() {
        cuadro.parentElement.classList.add('completo');
        cuadro.remove();
        evaluarFinJuego();
    }, 500)

    
    
}
function evaluarSeleccion(cuadro1, cuadro2) {
    if (cuadro1.className === cuadro2.className) {
        return 'match';
    } else {
        return '';
    }
}

function armarTablero() {
    $cuadros.forEach(function($cuadro, index) {
        $cuadro.classList.add(coloresMezclados[index]);
    })
}

function mezclarColores(arr) {
    const coloresMezclados = arr.sort(() => Math.random() - 0.5)
    return coloresMezclados;
}


function mostrarCuadro(cuadro) {
    cuadro.style.opacity = '1';
}

function ocultarCuadro(cuadro) {

    setTimeout(function() {
        cuadro.style.opacity = '0';
    }, 500)
    
}
