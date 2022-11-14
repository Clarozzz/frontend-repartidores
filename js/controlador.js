
var ordenes = [
    {
        codigo: 1,
        nombreCliente: 'Juan',
        descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
        direccion: 'Lorem, ipsum dolor.',
        cantidad: 1,
        total: 199,
        estado: 'En el destino'
    },
    {
        codigo: 2,
        nombreCliente: 'Maria',
        descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
        direccion: 'Lorem, ipsum dolor.',
        cantidad: 1,
        total: 199,
        estado: 'En camino'
    },
    {
        codigo: 3,
        nombreCliente: 'Alejandra',
        descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
        direccion: 'Lorem, ipsum dolor.',
        cantidad: 1,
        total: 199,
        estado: 'En el origen'
    }
]

function entrar() {
    document.getElementById("paginaPrincipalMotoristas").style.display = "none";
    document.getElementById('tipoDeOrdenes').style.display = 'block';
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

function verDisponibles() {
    document.getElementById('tipoDeOrdenes').style.display = 'none';
    document.getElementById('ordenesDisponibles').style.display = 'block';
    const disponibles = document.getElementById('disponibles');
    disponibles.innerHTML = '';

    ordenes.forEach((orden, indice) => {
        disponibles.innerHTML += 
        `
        <div class="tamano-opcion mt-4 border border-3 rounded-4 p-4 borde-color-primario" onclick="verOrden(${indice})">
            <h3 class="texto-mediano">Orden ${orden.codigo}</h3>
            <p>${orden.descripcion}</p>
            <p>${orden.direccion}</p>
        </div>
        `
    })
}

function verOrden(indice) {
    document.getElementById('ordenesDisponibles').style.display = 'none';
    document.getElementById('verOrden').style.display = 'block';
    const orden = ordenes[indice]

    document.getElementById('orden').innerHTML = 
    `
    <h1 class="text-center texto-grande">Orden ${orden.codigo}</h1>
    <h3 class="texto-mediano mt-5">${orden.nombreCliente}</h3>
    <p class="mt-4 fs-5"><strong>Descripcion: </strong>${orden.descripcion}</p>
    <p class="fs-5"><strong>Direccion: </strong>${orden.direccion}</p>
    <p class="fs-5"><strong>Cantidad: </strong>${orden.cantidad}</p>
    <p class="fs-5"><strong>Total: </strong>lps. ${orden.total}</p>
    `
}

function verTomadas() {
    document.getElementById('tipoDeOrdenes').style.display = 'none';
    document.getElementById('ordenesTomadas').style.display = 'block';
    const tomadas = document.getElementById('tomadas')
    tomadas.innerHTML = '';

    ordenes.forEach((orden, indice) => {
        tomadas.innerHTML += 
        `
        <div class="tamano-opcion mt-4 border border-3 rounded-4 p-2 borde-color-primario" onclick="verOrdenTomada(${indice})">
            <h3 class="texto-mediano">Orden ${orden.codigo}</h3>
            <p>${orden.descripcion}</p>
            <p>${orden.direccion}</p>
            <p>Estado: ${orden.estado}</p>
        </div>
        `
    })
}

function verOrdenTomada(indice) {
    document.getElementById('ordenesTomadas').style.display = 'none';
    document.getElementById('verOrdenTomada').style.display = 'block';
    const orden = ordenes[indice]

    document.getElementById('ordenTomada').innerHTML = 
    `
    <h1 class="text-center texto-grande">Orden ${orden.codigo}</h1>
    <h3 class="texto-mediano mt-5">${orden.nombreCliente}</h3>
    <p class="mt-4 fs-5"><strong>Descripcion: </strong>${orden.descripcion}</p>
    <p class="fs-5"><strong>Direccion: </strong>${orden.direccion}</p>
    <p class="fs-5"><strong>Cantidad: </strong>${orden.cantidad}</p>
    <p class="fs-5"><strong>Total: </strong>lps. ${orden.total}</p>
    `

    establecerEstado('estado', orden.estado);
}

function establecerEstado(nombre, estado) {
    const radios = document.querySelectorAll(`input[name=${nombre}]`)

    switch (estado) {
        case 'Tomada':
            radios[0].checked = true;
            break;
    
        case 'En camino':
            radios[1].checked = true;
            break;
        
        case 'En el origen':
            radios[2].checked = true;
            break;

        case 'En el destino':
            radios[3].checked = true;
            break;

        default:
            console.log('No valido')
            break;
    }
}

function regresarAPrincipal() {
    document.getElementById('ordenesDisponibles').style.display = 'none';
    document.getElementById('ordenesTomadas').style.display = 'none';
    document.getElementById('ordenesEntregadas').style.display = 'none';
    document.getElementById('tipoDeOrdenes').style.display = 'block';
}

function regresarADisponibles() {
    document.getElementById('ordenesDisponibles').style.display = 'block';
    document.getElementById('verOrden').style.display = 'none';
}

function regresarATomadas() {
    document.getElementById('ordenesTomadas').style.display = 'block';
    document.getElementById('verOrdenTomada').style.display = 'none';
}

function regresarAOrdenTomada() {
    document.getElementById('verOrdenTomada').style.display = 'block';
    document.getElementById('factura').style.display = 'none';
}

function verFacturaTomada() {
    document.getElementById('verOrdenTomada').style.display = 'none';
    document.getElementById('factura').style.display = 'block';
}

function verEntregadas() {
    document.getElementById('tipoDeOrdenes').style.display = 'none';
    document.getElementById('ordenesEntregadas').style.display = 'block';
    const entregadas = document.getElementById('entregadas');
    entregadas.innerHTML = '';

    ordenes.forEach((orden, indice) => {
        entregadas.innerHTML += 
        `
        <div class="tamano-opcion mt-4 border border-3 rounded-4 p-4 borde-color-primario" onclick="verOrdenEntregada(${indice})">
            <h3 class="texto-mediano">Orden ${orden.codigo}</h3>
            <p>${orden.descripcion}</p>
            <p>${orden.direccion}</p>
        </div>
        `
    })
}

function verOrdenEntregada(indice) {
    document.getElementById('ordenesEntregadas').style.display = 'none';
    document.getElementById('verOrdenEntregada').style.display = 'block';
    const orden = ordenes[indice]

    document.getElementById('ordenEntregada').innerHTML = 
    `
    <h1 class="text-center texto-grande">Orden ${orden.codigo}</h1>
    <h3 class="texto-mediano mt-5">${orden.nombreCliente}</h3>
    <p class="mt-4 fs-5"><strong>Descripcion: </strong>${orden.descripcion}</p>
    <p class="fs-5"><strong>Direccion: </strong>${orden.direccion}</p>
    <p class="fs-5"><strong>Cantidad: </strong>${orden.cantidad}</p>
    <p class="fs-5"><strong>Total: </strong>lps. ${orden.total}</p>
    `
}

function regresarAEntregadas() {
    document.getElementById('ordenesEntregadas').style.display = 'block';
    document.getElementById('verOrdenEntregada').style.display = 'none';
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