
function ocultar() {
    document.getElementById("paginaPrincipalMotoristas").style.display = "none";
}

function validarCampoInicio() {

    const usuario = document.getElementById("usuarioMotorista");
    const contrasena = document.getElementById("contrasenaMotorista");
    const boton = document.querySelector("#btnSubmit");

    if (usuario.value == '' || contrasena.value == '') {
        usuario.classList.remove('input-success');
        usuario.classList.add('input-error');
        contrasena.classList.remove('input-success');
        contrasena.classList.add('input-error');
        boton.disabled = true;
    }
    else {
        usuario.classList.remove('input-error');
        usuario.classList.add('input-success');
        contrasena.classList.remove('input-error');
        contrasena.classList.add('input-success');
        boton.disabled = false;
    }
}

function validarCampoRegistro() {
    
    const nombre = document.getElementById('nombreMotorista');
    const apellido = document.getElementById('apellidoMotorista');
    const usuario = document.getElementById('usuarioRegistroMotorista');
    const contrasena = document.getElementById('contrasenaRegistroMotorista');
    const btnRegistro = document.getElementById('btnSubmitRegistro');

    if (nombre.value == '' || apellido.value == '' || contrasena.value == '' || usuario.value == '') {
        nombre.classList.remove('input-success')
        nombre.classList.add('input-error')
        apellido.classList.remove('input-success')
        apellido.classList.add('input-error')
        usuario.classList.remove('input-success')
        usuario.classList.add('input-error')
        contrasena.classList.remove('input-success')
        contrasena.classList.add('input-error')
        btnRegistro.disabled = true
    }
    else {
        nombre.classList.remove('input-error');
        nombre.classList.add('input-success');
        apellido.classList.remove('input-error');
        apellido.classList.add('input-success');
        usuario.classList.remove('input-error');
        usuario.classList.add('input-success');
        contrasena.classList.remove('input-error');
        contrasena.classList.add('input-success');
        btnRegistro.disabled = false
    }
}

function abrirRegistro() {
    document.getElementById('paginaPrincipalMotoristas').style.display = 'none';
    document.getElementById('paginaRegistroMotoristas').style.display = 'block';
}

function inicioSesion() {
    document.getElementById('paginaPrincipalMotoristas').style.display = 'block';
    document.getElementById('paginaRegistroMotoristas').style.display = 'none';
}

function esperarAprobacion() {
    document.getElementById('paginaRegistroMotoristas').style.display = 'none';
    document.getElementById('esperaAprobacion').style.display = 'block';
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})()