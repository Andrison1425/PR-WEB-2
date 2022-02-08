const displayValorAnterior = document.getElementById('valor-anterior');
const displayValorActual = document.getElementById('valor-actual');
const botonesNumeros = document.querySelectorAll('.numero');
const botonesOperadores = document.querySelectorAll('.operador');
const operadorAnterior = document.querySelector("#operador-anterior");
const contHistorial = document.querySelector("ul");
let ultimoOperador = '';
let storage = '';
let contenidoAgregar = '';

botonesNumeros.forEach(boton => {
    boton.onclick = () => {
        displayValorActual.innerHTML += boton.innerHTML;
    }
});

const ejecutarOperacion = operador =>{
    let nuevoValor = 0;
    ultimoOperador = operador;
    operadorAnterior.innerHTML = operador; 

    storage = localStorage.getItem("operaciones");

    if(displayValorAnterior.innerHTML == ''){
        displayValorAnterior.innerHTML = displayValorActual.innerHTML;

    }else{
        if (operador == '+') {
            nuevoValor = 
                parseInt(displayValorAnterior.innerHTML) + 
                parseInt(displayValorActual.innerHTML) ;
        }
    
        if (operador == '-') {
            nuevoValor = 
                parseInt(displayValorAnterior.innerHTML) -
                parseInt(displayValorActual.innerHTML);  
        }
    
        if (operador == '/') {
            nuevoValor = 
                parseInt(displayValorAnterior.innerHTML) / 
                parseInt(displayValorActual.innerHTML);   
        }
    
        if (operador == 'X') {
            nuevoValor = 
                parseInt(displayValorAnterior.innerHTML) * 
                parseInt(displayValorActual.innerHTML);    
        }

        if(storage != null){
            contenidoAgregar = `${storage} 
                <li>${displayValorActual.innerHTML} ${operador} 
                ${displayValorAnterior.innerHTML}
                = ${nuevoValor}</li>`
            localStorage.setItem("operaciones", contenidoAgregar);       
            contHistorial.innerHTML = contenidoAgregar;
        }else{
            contenidoAgregar = `<li>${displayValorActual.innerHTML} ${operador} 
                ${displayValorAnterior.innerHTML}
                = ${nuevoValor}</li>`
            localStorage.setItem("operaciones", contenidoAgregar);       
            contHistorial.innerHTML = contenidoAgregar;  
        }

        displayValorAnterior.innerHTML = nuevoValor;
    }


};

botonesOperadores.forEach(boton => {
    boton.onclick = () => {
        if (boton.innerHTML == '=') {
            ejecutarOperacion(ultimoOperador); 
            operadorAnterior.innerHTML = '';
        }else{
            ejecutarOperacion(boton.innerHTML);
        }
        displayValorActual.innerHTML = ''; 
    }
});

const borrarTodo = () => {
    displayValorActual.innerHTML = '';
    displayValorAnterior.innerHTML = '';
};

const borrar = () => {
    displayValorActual.innerHTML = displayValorActual.innerHTML.toString().slice(0,-1);
}

const borrarHistorial = () => {
    localStorage.removeItem("operaciones");
    contHistorial.innerHTML = '';
    contenidoAgregar = '';
};

window.onload = () => {
    storage = localStorage.getItem("operaciones");

    if(storage != null){
        contHistorial.innerHTML = storage;
    }
}