
var ordenSeleccionada;
var repartidorSeleccionado;
var ordenTomada;
var indiceOrdenTomada;
var ordenes;

async function obtenerOrdenes() {
    const result = await fetch('http://localhost:5005/ordenes', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    ordenes = await result.json();
}
obtenerOrdenes();

async function abrirRepartidores() {
    let usuario = document.getElementById('usuarioMotorista').value;
    let contrasena = document.getElementById('contrasenaMotorista').value;


    let repartidorBack = await obtenerRepartidor(usuario);

    if (usuario == repartidorBack.usuarioRepartidor && contrasena == repartidorBack.contrasenaRepartidor) {
        repartidorSeleccionado = repartidorBack;
        entrar();
    } else {
        document.getElementById('aviso').innerHTML = 'Usuario o contrasena incorrectos'
    }

}

async function obtenerRepartidor(usuario) {
    const result = await fetch(`http://localhost:5005/repartidores/usuario/${usuario}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return result.json();
}

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

async function esperarAprobacion() {
    document.getElementById('paginaRegistroMotoristas').style.display = 'none';
    document.getElementById('esperaAprobacion').style.display = 'block';

    let nombre = document.getElementById('nombreMotorista').value;
    let apellido = document.getElementById('apellidoMotorista').value;
    let usuario = document.getElementById('usuarioRegistroMotorista').value;
    let contrasena = document.getElementById('contrasenaRegistroMotorista').value;

    const result = await fetch('http://localhost:5005/repartidorespendientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nombre: nombre,
            apellido: apellido,
            usuario: usuario,
            contrasena: contrasena
        })
    })
}

function verDisponibles() {
    document.getElementById('tipoDeOrdenes').style.display = 'none';
    document.getElementById('ordenesDisponibles').style.display = 'block';
    document.getElementById('verOrden').style.display = 'none';
    const disponibles = document.getElementById('disponibles');
    disponibles.innerHTML = '';

    ordenes.forEach((orden) => {
        disponibles.innerHTML +=
            `
        <div class="tamano-opcion mt-4 border border-3 rounded-4 p-4 borde-color-primario" onclick="verOrden('${orden._id}')">
            <h3 class="texto-mediano">Orden ${orden.idOrden}</h3>
            <p>${orden.descripcion}</p>
            <p>${orden.direccion}</p>
        </div>
        `
    })
}

async function verOrden(idOrden) {
    document.getElementById('ordenesDisponibles').style.display = 'none';
    document.getElementById('verOrden').style.display = 'block';

    const result = await fetch(`http://localhost:5005/ordenes/${idOrden}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    ordenSeleccionada = await result.json();

    document.getElementById('orden').innerHTML =
        `
    <h1 class="text-center texto-grande">Orden ${ordenSeleccionada.idOrden}</h1>
    <h3 class="texto-mediano mt-5">${ordenSeleccionada.nombreCliente}</h3>
    <p class="mt-4 fs-5"><strong>Descripcion: </strong>${ordenSeleccionada.descripcion}</p>
    <p class="fs-5"><strong>Direccion: </strong>${ordenSeleccionada.direccion}</p>
    <p class="fs-5"><strong>Total: </strong>lps. ${ordenSeleccionada.total}</p>
    `
}

async function tomarOrden() {

    ordenSeleccionada.estado = 'Tomada';
    repartidorSeleccionado.ordenesTomadas.push(ordenSeleccionada);

    const resultado = await fetch(`http://localhost:5005/ordenes/${ordenSeleccionada._id}`, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const result = await fetch(`http://localhost:5005/repartidores/${repartidorSeleccionado._id}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idRepartidor: repartidorSeleccionado.idRepartidor,
            nombreRepartidor: repartidorSeleccionado.nombreRepartidor,
            apellidoRepartidor: repartidorSeleccionado.apellidoRepartidor,
            usuarioRepartidor: repartidorSeleccionado.usuarioRepartidor,
            contrasenaRepartidor: repartidorSeleccionado.contrasenaRepartidor,
            ordenesTomadas: repartidorSeleccionado.ordenesTomadas,
            ordenesEntregadas: repartidorSeleccionado.ordenesEntregadas
        })
    })

    repartidorSeleccionado = await obtenerRepartidor(repartidorSeleccionado.usuarioRepartidor);
    obtenerOrdenes().then(() => {
        verDisponibles();
    })
}

function verTomadas() {
    document.getElementById('tipoDeOrdenes').style.display = 'none';
    document.getElementById('ordenesTomadas').style.display = 'block';
    const tomadas = document.getElementById('tomadas')
    tomadas.innerHTML = '';

    repartidorSeleccionado.ordenesTomadas.forEach((orden, indice) => {
        tomadas.innerHTML +=
            `
        <div class="tamano-opcion mt-4 border border-3 rounded-4 p-2 borde-color-primario" onclick="verOrdenTomada(${indice})">
            <h3 class="texto-mediano">Orden ${orden.idOrden}</h3>
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
    ordenTomada = repartidorSeleccionado.ordenesTomadas[indice];
    indiceOrdenTomada = indice;

    document.getElementById('ordenTomada').innerHTML =
        `
    <h1 class="text-center texto-grande">Orden ${ordenTomada.idOrden}</h1>
    <h3 class="texto-mediano mt-5">${ordenTomada.nombreCliente}</h3>
    <p class="mt-4 fs-5"><strong>Descripcion: </strong>${ordenTomada.descripcion}</p>
    <p class="fs-5"><strong>Direccion: </strong>${ordenTomada.direccion}</p>
    <p class="fs-5"><strong>Total: </strong>lps. ${ordenTomada.total}</p>
    `

    establecerEstado('estado', ordenTomada.estado);
}

function establecerEstado(nombre, estado) {
    const radios = document.querySelectorAll(`input[name=${nombre}]`)

    switch (estado) {
        case 'Tomada':
            radios[0].checked = true;
            ordenTomada.estado = 'Tomada';
            break;

        case 'En camino':
            radios[1].checked = true;
            ordenTomada.estado = 'En camino';
            break;

        case 'En el origen':
            radios[2].checked = true;
            ordenTomada.estado = 'En el origen';
            break;

        case 'En el destino':
            radios[3].checked = true;
            ordenTomada.estado = 'En el destino';
            break;

        default:
            console.log('No valido')
            break;
    }
}

async function definirEstado() {
    let radio1 = document.getElementById('estado1').checked;
    let radio2 = document.getElementById('estado2').checked;
    let radio3 = document.getElementById('estado3').checked;
    let radio4 = document.getElementById('estado4').checked;

    if (radio1 == true) {
        repartidorSeleccionado.ordenesTomadas[indiceOrdenTomada].estado = 'Tomada';
    } else if (radio2 == true) {
        repartidorSeleccionado.ordenesTomadas[indiceOrdenTomada].estado = 'En camino';
    } else if (radio3 == true) {
        repartidorSeleccionado.ordenesTomadas[indiceOrdenTomada].estado = 'En el origen';
    } else if (radio4 == true) {
        repartidorSeleccionado.ordenesTomadas[indiceOrdenTomada].estado = 'En el destino';
    }

    const result = await fetch(`http://localhost:5005/repartidores/${repartidorSeleccionado._id}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idRepartidor: repartidorSeleccionado.idRepartidor,
            nombreRepartidor: repartidorSeleccionado.nombreRepartidor,
            apellidoRepartidor: repartidorSeleccionado.apellidoRepartidor,
            usuarioRepartidor: repartidorSeleccionado.usuarioRepartidor,
            contrasenaRepartidor: repartidorSeleccionado.contrasenaRepartidor,
            ordenesTomadas: repartidorSeleccionado.ordenesTomadas,
            ordenesEntregadas: repartidorSeleccionado.ordenesEntregadas
        })
    })

    repartidorSeleccionado = await obtenerRepartidor(repartidorSeleccionado.usuarioRepartidor);
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
    document.getElementById('factura').style.display = 'none';
    verTomadas();
}

async function verFacturaTomada() {
    document.getElementById('verOrdenTomada').style.display = 'none';
    document.getElementById('factura').style.display = 'block';

    document.getElementById('facturaOrden').innerHTML =
        `
    <div class="fs-5 mt-4">
                <strong>Tipo de pago: </strong>
                <p class="float-end m-0">Pago con tarjeta</p>
            </div>

            <div class="fs-5 mt-3">
                <strong>Subtotal: </strong>
                <p class="float-end m-0">lps. ${parseFloat(ordenTomada.total * 0.5).toFixed(2)}</p>
            </div>

            <div class="fs-5 mt-3">
                <strong>Impuesto: </strong>
                <p class="float-end m-0">lps. ${parseFloat(ordenTomada.total * 0.2).toFixed(2)}</p>
            </div>

            <div class="fs-5 mt-3">
                <strong>Comision total: </strong>
                <p class="float-end m-0">lps. ${parseFloat(ordenTomada.total * 0.3).toFixed(2)}</p>
            </div>

            <div class="fs-5 mt-3">
                <strong>Comision motorista: </strong>
                <p class="float-end m-0">lps. ${parseFloat((ordenTomada.total * 0.3) * 0.5).toFixed(2)}</p>
            </div>

            <div class="fs-5 mt-3">
                <strong>Comision admin: </strong>
                <p class="float-end m-0">lps. ${parseFloat((ordenTomada.total * 0.3) * 0.5).toFixed(2)}</p>
            </div>

            <div class="fs-1 mt-5">
                <strong>Total: </strong>
                <p class="float-end m-0">lps. ${ordenTomada.total}</p>
            </div>
    `

    ordenTomada.estado = 'Entregada'
    repartidorSeleccionado.ordenesEntregadas.push(ordenTomada);
    let index = repartidorSeleccionado.ordenesTomadas.indexOf(ordenTomada)
    if (index > -1) {
        repartidorSeleccionado.ordenesTomadas.splice(index, 1);
    }

    const result = await fetch(`http://localhost:5005/repartidores/${repartidorSeleccionado._id}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idRepartidor: repartidorSeleccionado.idRepartidor,
            nombreRepartidor: repartidorSeleccionado.nombreRepartidor,
            apellidoRepartidor: repartidorSeleccionado.apellidoRepartidor,
            usuarioRepartidor: repartidorSeleccionado.usuarioRepartidor,
            contrasenaRepartidor: repartidorSeleccionado.contrasenaRepartidor,
            ordenesTomadas: repartidorSeleccionado.ordenesTomadas,
            ordenesEntregadas: repartidorSeleccionado.ordenesEntregadas
        })
    })

    repartidorSeleccionado = await obtenerRepartidor(repartidorSeleccionado.usuarioRepartidor);
}

function verEntregadas() {
    document.getElementById('tipoDeOrdenes').style.display = 'none';
    document.getElementById('ordenesEntregadas').style.display = 'block';
    const entregadas = document.getElementById('entregadas');
    entregadas.innerHTML = '';

    repartidorSeleccionado.ordenesEntregadas.forEach((orden, indice) => {
        entregadas.innerHTML +=
            `
        <div class="tamano-opcion mt-4 border border-3 rounded-4 p-4 borde-color-primario" onclick="verOrdenEntregada(${indice})">
            <h3 class="texto-mediano">Orden ${orden.idOrden}</h3>
            <p>${orden.descripcion}</p>
            <p>${orden.direccion}</p>
        </div>
        `
    })
}

function verOrdenEntregada(indice) {
    document.getElementById('ordenesEntregadas').style.display = 'none';
    document.getElementById('verOrdenEntregada').style.display = 'block';
    const orden = repartidorSeleccionado.ordenesEntregadas[indice]

    document.getElementById('ordenEntregada').innerHTML =
        `
    <h1 class="text-center texto-grande">Orden ${orden.idOrden}</h1>
    <h3 class="texto-mediano mt-5">${orden.nombreCliente}</h3>
    <p class="mt-4 fs-5"><strong>Descripcion: </strong>${orden.descripcion}</p>
    <p class="fs-5"><strong>Direccion: </strong>${orden.direccion}</p>
    <p class="fs-5"><strong>Total: </strong>lps. ${orden.total}</p>
    `
}

function regresarAEntregadas() {
    document.getElementById('ordenesEntregadas').style.display = 'block';
    document.getElementById('verOrdenEntregada').style.display = 'none';
}