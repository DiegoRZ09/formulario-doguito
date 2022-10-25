export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }

    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = ""
    } else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput,input);

    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
]

const mensajesDeError = {
    nombre: {
        valueMissing: "El campo Nombre no puede estar vacío",
    },
    email: {
        valueMissing: "El campo E-Mail no puede estar vacío",
        typeMismatch: "El correo no es válido",
    },
    password: {
        valueMissing: "El campo Contraseña no puede estar vacío",
        patternMismatch: "Min: 6 Max: 12. Al menos una letra mayuscula, una minuscula, un número y no puede contener caracteres especiales",
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacío",
        customError: "Debes tener al menos 18 años de edad",
    },
    numero:{
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "El formato requerido son 10 dígitos"
    },
    domicilio:{
        patternMismatch: "Debe contener entre 10 y 40 caracteres"
    },
    ciudad:{
        patternMismatch: "Debe contener entre 3 y 20caracteres"
    },
    estado:{
        patternMismatch: "Debe contener entre 3 y 20 caracteres"
    }
};

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
}

function mostrarMensajeDeError(tipoDeInput,input){
    let mensaje = "";
    tipoDeErrores.forEach(error =>{
        if(input.validity[error]){
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    })


    return mensaje;
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if(!mayorEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años de edad";
    }

    input.setCustomValidity(mensaje);

}

function mayorEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());
    return diferenciaFechas <= fechaActual;
}