let secuenciaMaquina = [];
let secuenciaUsuario = [];
let ronda = 0;

actualizarEstado('Tocá "Empezar" para jugar');

document.querySelector('button[type=button]').onclick = comenzarJuego;

function comenzarJuego(){
    reiniciarEstado();
    manejarRonda();
};

function reiniciarEstado(){
    secuenciaMaquina = [];
    secuenciaUsuario = [];
    ronda = 0;
};

function resaltar($cuadro){
    $cuadro.style.opacity = 1;
    setTimeout(function(){
        $cuadro.style.opacity = 0.5;
    }, 500);
};

function obtenerCuadroAleatorio(){
    const $cuadros = document.querySelectorAll('.cuadro');
    const indice = Math.floor(Math.random() * $cuadros.length);
    return $cuadros[indice];
};

function bloquearInputUsuario() {
    document.querySelectorAll('.cuadro').forEach(function ($cuadro) {
        $cuadro.onclick = function () {
        };
    });
};

function actualizarEstado(estado, error = false){
    const $estado = document.querySelector('#estado');
    $estado.textContent = estado;

    if(error){
        $estado.classList.remove('alert-primary');
        $estado.classList.add('alert-danger');
    }else{
        $estado.classList.remove('alert-danger');
        $estado.classList.add('alert-primary');
    }

};

function actualizarNumeroRonda(ronda){
    document.querySelector('#ronda').textContent = ronda;
};


function manejarRonda(){
    actualizarEstado('Turno de la máquina');
    bloquearInputUsuario();

    const $nuevoCuadro = obtenerCuadroAleatorio();
    secuenciaMaquina.push($nuevoCuadro);

    const RETRASO_TURNO_JUGADOR = (secuenciaMaquina.length + 1) * 1000;

    secuenciaMaquina.forEach(function($cuadro, index){
        const RETRASO_MAQUINA = (index + 1) * 1000;
        setTimeout(function(){
            resaltar($cuadro)
        }, 
        RETRASO_MAQUINA)
    });

    setTimeout(function(){
        actualizarEstado('Turno del jugador');
        desbloquearInputUsuario()
    }, RETRASO_TURNO_JUGADOR);

    secuenciaUsuario = [];
    ronda++;
    actualizarNumeroRonda(ronda);
};

function desbloquearInputUsuario(){
    document.querySelectorAll('.cuadro').forEach(function($cuadro){
        $cuadro.onclick = manejarInputUsuario;
    });
};

function manejarInputUsuario(e){
    const $cuadro = e.target;
    resaltar($cuadro);
    secuenciaUsuario.push($cuadro);

    const $cuadroMaquina = secuenciaMaquina[secuenciaUsuario.length - 1];

    if($cuadro.id !== $cuadroMaquina.id){
        perder();
        return;
    };

    if(secuenciaUsuario.length === secuenciaMaquina.length){
        bloquearInputUsuario();
        setTimeout(manejarRonda, 1000);
    };
};

function perder(){
    bloquearInputUsuario();
    actualizarEstado('¡Perdiste! Tocá "Empezar" para volver a jugar', true);
};
