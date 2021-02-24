const url = "./../controlador/persona.controlador.php"
const btnConsultar = document.getElementById('btn-consultar');
const btnGuardar = document.getElementById('btn-guardar');
const btnModificar = document.getElementById('btn-modificar');
const tablaPersona = document.getElementById('tabla-persona');

$(document).ready(function() {
    consultar();
});

const consultar = () => {
    $.ajax({
        url,
        data: { 'accion': 'consultar' },
        type: 'POST',
        dataType: 'json'
    }).done((response) => {

        var template = "";
        console.log(response);
        response.forEach(persona => {
            template += `
            <tr>
                <td>${persona.nombre}</td>
                <td>${persona.apellido}</td>
                <td>${persona.fechaNacimiento}</td>
                <td>${persona.direccion}</td>
                <td>${persona.telefono}</td>
                <td>
                    <button class="btn btn-warning" onclick='consultarPorId(${persona.id})'> <i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger" onclick='eliminar(${persona.id})'> <i class="fas fa-trash-alt"></i></button>
                </td>
            </tr>
        `
        });

        document.getElementById('datos').innerHTML = template;
        // $('#tabla-persona').DataTable();
        $('#tabla-persona').DataTable({
            ordering: false,
            searching: true
        });
    }).fail((response) => {
        console.log(response);
    })
}

const consultarPorId = (id) => {
    $.ajax({
        url,
        data: { 'id': id, 'accion': 'consultar_id' },
        type: 'POST',
        dataType: 'json'
    }).done((response) => {
        document.getElementById('nombre').value = response.nombre;
        document.getElementById('apellido').value = response.apellido;
        document.getElementById('fechaNacimiento').value = response.fechaNacimiento;
        document.getElementById('direccion').value = response.direccion;
        document.getElementById('telefono').value = response.telefono;
        document.getElementById('id').value = response.id;
        desabilitarBoton(false);
    }).fail((response) => {
        console.log(response);
    })
}

const guardar = () => {
    // if (validar()) {
    datos = {
        'nombre': document.getElementById('nombre').value,
        'apellido': document.getElementById('apellido').value,
        'fechaNacimiento': document.getElementById('fechaNacimiento').value,
        'direccion': document.getElementById('direccion').value,
        'telefono': document.getElementById('telefono').value,
        'accion': 'guardar'
    }
    console.log('Datos a enviar', datos);
    $.ajax({
            url,
            data: datos,
            type: 'POST',
            dataType: 'json'
        }).done((response) => {
            if (response == 'OK') {
                // alert('Datos Guardados con exito')
                mostrarAlerta('Exito!', 'Datos guardados exitosamente', 'success')
                consultar();
                limpiar();
            } else {
                mostrarAlerta('Error!', response, 'error')
            }

        }).fail((response) => {
            console.log(response);
        })
        // }
        // alert('Ingrese todos los campos')

}

const modificar = () => {
    // if (validar()) {
    datos = {
        'nombre': document.getElementById('nombre').value,
        'apellido': document.getElementById('apellido').value,
        'fechaNacimiento': document.getElementById('fechaNacimiento').value,
        'direccion': document.getElementById('direccion').value,
        'telefono': document.getElementById('telefono').value,
        'accion': 'modificar',
        'id': document.getElementById('id').value
    }
    console.log(datos);
    $.ajax({
            url,
            data: datos,
            type: 'POST',
            dataType: 'json'
        }).done((response) => {
            if (response == 'OK') {
                mostrarAlerta('Exito!', 'Datos modificados exitosamente', 'success')
                limpiar();
                consultar();
            } else {
                mostrarAlerta('Error!', response, 'error')
            }

        }).fail((response) => {
            console.log(response);
        })
        // }
        // alert('Ingrese todos los campos')
}

const eliminar = (id) => {
    // if (confirm('Are you sure you want to delte it?')) {

    Swal.fire({
        title: '¿Seguro que desea eliminar este registro?',
        showCancelButton: true,
        confirmButtonText: `Confirmar`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            $.ajax({
                url,
                data: { 'id': id, 'accion': 'eliminar' },
                type: 'POST',
                dataType: 'json'
            }).done((response) => {
                if (response == 'OK') {
                    mostrarAlerta('Exito!', 'Registro eliminado con exito', 'success')
                    consultar();
                } else {
                    mostrarAlerta('Error!', response, 'error')
                }
            }).fail((response) => {
                console.log(response);
            })
        }
    })

    // }
}

const validar = () => {
    // nombre = document.getElementById('nombre').value;
    // apellido = document.getElementById('apellido').value;
    // fechaNacimiento = document.getElementById('fechaNacimiento').value;
    // direccion = document.getElementById('direccion').value;
    // telefono = document.getElementById('telefono').value;

    // if (nombre == '' || apellido == '' || fechaNacimiento == '' || direccion == '' || telefono == '') {
    //     return false
    // }
    // return true;
    return true;
}

const limpiar = () => {
    nombre = document.getElementById('nombre').value = '';
    apellido = document.getElementById('apellido').value = '';
    fechaNacimiento = document.getElementById('fechaNacimiento').value = '';
    direccion = document.getElementById('direccion').value = '';
    telefono = document.getElementById('telefono').value = '';
    desabilitarBoton(true);
}

const desabilitarBoton = (guardar) => {
    if (guardar) {
        btnGuardar.disabled = false;
        btnModificar.disabled = true;
    } else {
        btnGuardar.disabled = true;
        btnModificar.disabled = false;
    }
}

const mostrarAlerta = (titulo, descripcion, tipo) => {
    Swal.fire(
        titulo,
        descripcion,
        tipo
    )

}

btnConsultar.addEventListener('click', () => {
    consultar();
})

btnGuardar.addEventListener('click', () => {
    if (validar()) {
        guardar();
    } else {
        alert('Complete todos los campos')
    }

})

btnModificar.addEventListener('click', () => {
    if (validar()) {
        modificar();
    } else {
        alert('Complete todos los campos')
    }

})