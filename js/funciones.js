var clientes = [];

function limpiarCampos(campo1Incluir) {
    if (campo1Incluir === 1) {
        document.getElementById("campo1").value = "";
    }
    document.getElementById("campo2").value = "";
    document.getElementById("campo3").value = "";
    document.getElementById("campo4").value = "";
    document.getElementById("campo5").value = "";
    document.getElementById("campo6").value = "opcion1";
    document.getElementsByName("campo7").forEach(radio => radio.checked = false);
    document.getElementById("campo8").value = "";
    document.getElementById("campo9").value = "";
    document.getElementById("campo10").value = "opcion1";
    document.getElementsByName("campo11").forEach(radio => radio.checked = false);
    document.getElementById("campo12").value = "opcion1";
}

function listarClientes() {
    var filas = "";
    for (let i = 0; i < clientes.length; i++) {
        var e = clientes[i];
        filas += `<tr>
            <td>${e.campo1}</td>
            <td>${e.campo2}</td>
            <td>${e.campo3}</td>
            <td>${e.campo4}</td>
            <td>${e.campo5}</td>
            <td>${e.campo6}</td>
            <td>${e.campo7}</td>
            <td>${e.campo8}</td>
            <td>${e.campo9}</td>
            <td>${e.campo10}</td>
            <td>${e.campo11}</td>
            <td>${e.campo12}</td>
        </tr>`;
    }
    document.getElementById("tabladedatos").innerHTML = filas;
}

document.addEventListener("DOMContentLoaded", function() {
    listarClientes();
});

function consultar() {
    var campo1 = document.getElementById("campo1").value;
    if (campo1.trim().length !== 5) {
        alert("Debe ingresar un valor de 5 caracteres en el Campo 1 para buscar!");
        document.getElementById("campo1").focus();
        return;
    }
    let encontrado = false;
    for (let i = 0; i < clientes.length; i++) {
        var e = clientes[i];
        if (campo1 === e.campo1) {
            encontrado = true;
            document.getElementById("campo2").value = e.campo2;
            document.getElementById("campo3").value = e.campo3;
            document.getElementById("campo4").value = e.campo4;
            document.getElementById("campo5").value = e.campo5;
            document.getElementById("campo6").value = e.campo6;
            document.getElementsByName("campo7").forEach(radio => {
                if (radio.value === e.campo7) {
                    radio.checked = true;
                }
            });
            document.getElementById("campo8").value = e.campo8;
            document.getElementById("campo9").value = e.campo9;
            document.getElementById("campo10").value = e.campo10;
            document.getElementsByName("campo11").forEach(radio => {
                if (radio.value === e.campo11) {
                    radio.checked = true;
                }
            });
            document.getElementById("campo12").value = e.campo12;
            mostrarMensaje("Registro encontrado. Puede modificar o eliminar.", "alert-info");
            break;
        }
    }
    if (!encontrado) {
        limpiarCampos(0);
        mostrarMensaje("Registro no encontrado. Puede registrarlo.", "alert-warning");
    }
}

function registrar() {
    var campo1 = document.getElementById("campo1").value;
    var campo2 = document.getElementById("campo2").value;
    var campo3 = document.getElementById("campo3").value;
    var campo4 = document.getElementById("campo4").value;
    var campo5 = document.getElementById("campo5").value;
    var campo6 = document.getElementById("campo6").value;
    var campo7 = document.querySelector('input[name="campo7"]:checked') ? document.querySelector('input[name="campo7"]:checked').value : "";
    var campo8 = document.getElementById("campo8").value;
    var campo9 = document.getElementById("campo9").value;
    var campo10 = document.getElementById("campo10").value;
    var campo11 = document.querySelector('input[name="campo11"]:checked') ? document.querySelector('input[name="campo11"]:checked').value : "";
    var campo12 = document.getElementById("campo12").value;

    if (!validarCampos(campo1, campo2, campo3, campo4, campo5, campo6, campo7, campo8, campo9, campo10, campo11, campo12)) {
        return;
    }

    var nuevoCliente = {
        campo1,
        campo2,
        campo3,
        campo4,
        campo5,
        campo6,
        campo7,
        campo8,
        campo9,
        campo10,
        campo11,
        campo12
    };

    for (let i = 0; i < clientes.length; i++) {
        if (campo1 === clientes[i].campo1) {
            mostrarMensaje("El campo 1 debe ser único y no se puede repetir.", "alert-danger");
            return;
        }
    }

    clientes.push(nuevoCliente);
    listarClientes();
    limpiarCampos(1);
    mostrarMensaje("Cliente registrado correctamente.", "alert-success");
}

function modificar() {
    var campo1 = document.getElementById("campo1").value;
    var campo2 = document.getElementById("campo2").value;
    var campo3 = document.getElementById("campo3").value;
    var campo4 = document.getElementById("campo4").value;
    var campo5 = document.getElementById("campo5").value;
    var campo6 = document.getElementById("campo6").value;
    var campo7 = document.querySelector('input[name="campo7"]:checked') ? document.querySelector('input[name="campo7"]:checked').value : "";
    var campo8 = document.getElementById("campo8").value;
    var campo9 = document.getElementById("campo9").value;
    var campo10 = document.getElementById("campo10").value;
    var campo11 = document.querySelector('input[name="campo11"]:checked') ? document.querySelector('input[name="campo11"]:checked').value : "";
    var campo12 = document.getElementById("campo12").value;

    if (!validarCampos(campo1, campo2, campo3, campo4, campo5, campo6, campo7, campo8, campo9, campo10, campo11, campo12)) {
        return;
    }

    let encontrado = false;
    for (let i = 0; i < clientes.length; i++) {
        if (campo1 === clientes[i].campo1) {
            encontrado = true;
            clientes[i] = {
                campo1,
                campo2,
                campo3,
                campo4,
                campo5,
                campo6,
                campo7,
                campo8,
                campo9,
                campo10,
                campo11,
                campo12
            };
            listarClientes();
            limpiarCampos(1);
            mostrarMensaje("Cliente modificado correctamente.", "alert-success");
            break;
        }
    }

    if (!encontrado) {
        mostrarMensaje("Registro no encontrado para modificar.", "alert-warning");
    }
}

function eliminar() {
    var campo1 = document.getElementById("campo1").value;

    if (campo1.trim().length !== 5) {
        mostrarMensaje("Debe ingresar un valor de 5 caracteres en el Campo 1 para eliminar!", "alert-danger");
        document.getElementById("campo1").focus();
        return;
    }

    let index = -1;
    for (let i = 0; i < clientes.length; i++) {
        if (campo1 === clientes[i].campo1) {
            index = i;
            break;
        }
    }

    if (index > -1) {
        clientes.splice(index, 1);
        listarClientes();
        limpiarCampos(1);
        mostrarMensaje("Cliente eliminado correctamente.", "alert-success");
    } else {
        mostrarMensaje("Registro no encontrado para eliminar.", "alert-warning");
    }
}

function mostrarMensaje(mensaje, tipo) {
    var divMensajes = document.getElementById("mensajes");
    divMensajes.innerHTML = `<div class="alert ${tipo} alert-dismissible fade show" role="alert">
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
}

function validarCampos(campo1, campo2, campo3, campo4, campo5, campo6, campo7, campo8, campo9, campo10, campo11, campo12) {
    if (campo1.trim().length !== 5) {
        mostrarMensaje("El Campo 1 debe tener exactamente 5 caracteres.", "alert-danger");
        return false;
    }
    if (campo2.trim() === "" || campo3.trim() === "" || campo4.trim() === "" || campo5.trim() === "") {
        mostrarMensaje("Los campos 2, 3, 4 y 5 no deben estar vacíos y deben tener un máximo de 30 caracteres.", "alert-danger");
        return false;
    }
    if (campo2.trim().length > 30 || campo3.trim().length > 30 || campo4.trim().length > 30 || campo5.trim().length > 30) {
        mostrarMensaje("Los campos 2, 3, 4 y 5 no deben tener más de 30 caracteres.", "alert-danger");
        return false;
    }
    if (campo8.trim() === "" || campo9.trim() === "" || isNaN(campo8) || isNaN(campo9) || campo8 < 0 || campo9 < 0) {
        mostrarMensaje("Los campos 8 y 9 deben ser números positivos.", "alert-danger");
        return false;
    }
    if (!campo7) {
        mostrarMensaje("Debe seleccionar una opción en el Campo 7.", "alert-danger");
        return false;
    }
    if (!campo11) {
        mostrarMensaje("Debe seleccionar una opción en el Campo 11.", "alert-danger");
        return false;
    }
    return true;
}