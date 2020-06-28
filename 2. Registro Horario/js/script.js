window.addEventListener("load", comenzar);

function comenzar(){
    document.getElementById("nombreEmpleado").style.display = "inline";
    document.getElementById("nombre").style.display = "none";
    //Iniciamos el array para la lista de nombre de empleados
    listaEmpleados = [];
    //Iniciamos el array para la lista de los horarios de una fecha
    registrosFecha = [];
    //Ponemos nuevo a false ya que en principio suponemos que el empleado ya esta dado de 
    //alta
    nuevo = false;
    //Como codigo de empleado cogemos el indice que ocupa en el array de Empleados
    codigo = -1;
    registro = [];
    posicionRegistro = -1;
    //Cargamos los datos del localStorage y generamos el select de nombre empleados
    cargarSelectEmpleados();

    //CUANDO REGISTRAMOS EL EMPLEADO CON LA FECHA
    form = document.getElementById("registroHorario");
    form.addEventListener("submit", (e)=>{
        e.preventDefault();
        Guardar();
    });//FIN DEL ACEPTAR EL FORMULARIO

    //CUANDO CAMBIAMOS EL VALOR DE NOMBRE
    empleado = document.getElementById("nombreEmpleado");
    empleado.addEventListener("change", ()=>{
        document.getElementById("fecha").value="";
        document.getElementById("horaSalida").value="";
        document.getElementById("horaEntrada").value="";
        document.getElementById("apellidos").value="";
        posicion = document.registroHorario.nombreEmpleado.selectedIndex;
        //En posicion 0 del select esta Seleccionar y en los siguientes
        //Estan los nombres de los empleados
        //value de cada posicion es la (posicion-1) para que coincida con el index del
        //array donde estan los nombres
        codigo = document.registroHorario.nombreEmpleado[posicion].value;
        if (posicion){
            if (codigo == "Nuevo" ){//Seleccionamos un Nuevo empleado
                form.reset();
                mostrarFormularioAlta();
                nuevo = true;    
            }else{
            //Si hemos seleccionado un empleado existente
                rellenaFormulario();
                nuevo = false;
            }
        }else{//Si hemos seleccionado a Seleccionar Empleado
            codigo=-1;
            nuevo = false;
        }
        //Como seleccionamos un empleado del select decimos que no es un empleado nuevo       
    });//FIN CHANGE NOMBRE EMPLEADO

    //Cuando introducimos un empleado nuevo.
    //Introducimos el nombre
    nombreEscrito = document.getElementById("nombre");
    nombreEscrito.addEventListener("change", ()=>{
        //Habilitamos para escribir el apellido
        document.getElementById("apellidos").removeAttribute("disabled");
        document.getElementById("apellidos").focus();
    });//FIN CHANGE nombreEscrito

    //Cuando introducimos el apellido del nuevo empleado
    apellidosEscrito = document.getElementById("apellidos");
    apellidosEscrito.addEventListener("change", ()=>{
        //Insertamos la hora de entrada
        document.getElementById("horaEntrada").value = obtenerHoraTexto();
    });//FIN CHANGE ApellidoEscrito


    //CUANDO PULSAMOS EL BOTON CANCELAR
    btnCancelar = document.getElementById("btn-cancelar");
    btnCancelar.addEventListener("click", ()=>{
        location.reload();
    });//FIN boton cancelar

}//FIN del comenzar

function obtenerHoyTexto(){
    //Obtenemos la fecha con un formato especifico y con un tipo string
    hoy = new Date();
    mes = (hoy.getMonth()+1);
    if (mes<10) mes= "0"+mes;
    hoy = hoy.getFullYear() +"-" + mes + "-" + hoy.getDate();
    return hoy;
}//FIN obtenerHoyTexto

function obtenerHoraTexto(){
    //Obtenemos la hora en formato especifico y en tipo string
    hoy = new Date();
    hora = hoy.toTimeString();
    hora= hora.substring(0,8);
    return hora;
}//FIN obtenerHoraTexto

function generaSelect(empleados){
    // Rellenamos el select de empleados
    numElementos = empleados.length;
    document.registroHorario.nombreEmpleado.length = numElementos+2;
    //Primero ponemos Selecciona un empleado para que guie al usuario en que debe introducir
    document.registroHorario.nombreEmpleado[0].value = "Selecciona un empleado";
    document.registroHorario.nombreEmpleado[0].text = "Selecciona un empleado";
    //Rellenamos el select con los empleados que tenemos en el array empleados
    for (i=0; i<numElementos; i++){
        document.registroHorario.nombreEmpleado[i+1].value = i;
        document.registroHorario.nombreEmpleado[i+1].text = empleados[i].nombre;
    }//Insertamos la opcion de crear nuevo empleado
    document.registroHorario.nombreEmpleado[numElementos+1].value = "Nuevo";
    document.registroHorario.nombreEmpleado[numElementos+1].text = "Nuevo empleado...";

}//FIN generaSelect

function cargarSelectEmpleados(){
    //Recuperamos el array empleados del localstorage y lo guardamos en listaEmpleados
    listaEmpleados = JSON.parse(localStorage.getItem("Empleados"));
    if (!listaEmpleados){//Si no hay empleados
    //Inicializamos a vacio
        listaEmpleados = [];
    }
    generaSelect(listaEmpleados);
}//FIN cargarSelectEmpleados


function rellenaFormulario(){
    //Rellenamos el formulario con los datos referentes al empleado.
    fechatxt = obtenerHoyTexto();
    horatxt = obtenerHoraTexto();
    apellidos = listaEmpleados[codigo].apellidos;
    //Cargamos el apellido del empleado seleccionado
    document.getElementById("apellidos").value = apellidos;
    document.getElementById("fecha").value = fechatxt;
    document.getElementById("horaEntrada").value = horatxt;
    document.getElementById("horaSalida").value ="";
    //Obtenemos todos los registros del dia de hoy
    registrosHoy = JSON.parse(localStorage.getItem(fechatxt));
    posicionRegistro = -1;//Suponemos que no existe datos para ese empleado
    if (registrosHoy){ //Si hay registros en localStorage con esa fecha
        registro ={};
        for(i=0; i<registrosHoy.length;i++){//Buscamos los datos del empleado
            if (registrosHoy[i].codigo == codigo){//Si encontramos
                registro = registrosHoy[i];//guardamos los datos
                posicionRegistro = i;//guardamos la posicion que ocupan los datos del Empleado 
            }
        }
        if (posicionRegistro > -1){//Si hemos encontrado datos los mostramos
            if (registro.horaEntrada){//Si tiene hora de entrada la mostramos
                document.getElementById("horaEntrada").value = registro.horaEntrada;
            }
            //Si hay datos de la hora de entrada habilitamos la hora de salida
            document.getElementById("horaSalida").value = registro.horaSalida;
            if (! registro.horaSalida && registro.horaEntrada){
                //Si tenia hora de entrada y no hora de salida le asignamos la hora de salida
                document.getElementById("horaSalida").value = horatxt;
                
            }
        }
    }  
} 


function mostrarFormularioAlta(){
    //Cambiamos el select por un input texto para el nombre y los apellidos
    document.getElementById("nombreEmpleado").style.display = "none";
    document.getElementById("nombre").style.display = "inline";
    document.getElementById("fecha").value = obtenerHoyTexto();
    //cambiamos el flag nuevo a true
    nuevo = true;
    codigo=-1;
}

function Guardar(){
    nombre = document.registroHorario.nombre.value;
    apellidos = document.registroHorario.apellidos.value;
    fecha = document.registroHorario.fecha.value;
    if ((nombre != "" && apellidos !="") || codigo>-1){
        //Verificamos si existe el empleado => tiene codigo
        //o si es nuevo => nombre y apellido distinto de vacio
        horaEntrada = document.registroHorario.horaEntrada.value;
        horaSalida = document.registroHorario.horaSalida.value;
        fechatxt = fecha.toString();
        //Obtenemos los registros del dia indicado
        registrosHoy = JSON.parse(localStorage.getItem(fechatxt));
        if (! registrosHoy){ //Si no hay registro iniciamos los regiostrosHoy
            registrosHoy=[];
        }
        if (nuevo){//Si es un empleado nuevo
            // GUARDAMOS EN EL array y en el LOCALSTORAGE EL EMPLEADO
            empleadoNuevo = {"nombre":nombre, "apellidos":apellidos};
            listaEmpleados.push(empleadoNuevo);
            // codigo = posicion del recien agregado
            codigo = listaEmpleados.length - 1;
            localStorage.setItem("Empleados", JSON.stringify(listaEmpleados));
            //Añadimos los datos de entrada/salida del empleado actual 
            //al array y lo guardamos en el localStorage
            guardarRegistroEnLocalStorage(codigo, horaEntrada,horaSalida);
        }else{//Si no es usuario nuevo.
            if (registrosHoy){ //Si hay registros en localStorage con esa fecha
                registro ={};
                posicionRegistro = -1;
                for(i=0; i<registrosHoy.length;i++){
                    //Buscamos el registro del empleado actual
                    if (registrosHoy[i].codigo == codigo){
                        registro = registrosHoy[i];
                        posicionRegistro = i;
                        break;
                    }
                }
                if (posicionRegistro > -1){//Si ya existe datos de ese empleado en esa fecha sobreescribimos
                    registrosHoy[posicionRegistro].horaEntrada = document.getElementById("horaEntrada").value ;
                    registrosHoy[posicionRegistro].horaSalida = document.getElementById("horaSalida").value;
                    localStorage.setItem(fecha.toString(), JSON.stringify(registrosHoy));
                }
                else{//Sino existe en esa fecha creamos uno nuevo con esa fecha
                    guardarRegistroEnLocalStorage(codigo, horaEntrada,horaSalida);
                }
            }else{//Sino hay registro a esa fecha
                guardarRegistroEnLocalStorage(codigo, horaEntrada,horaSalida);
            }
        }
        location.reload();
    }else{
        alert("Debe seleccionar o Introducir un Empleado válido y una fecha");
    }
}

function guardarRegistroEnLocalStorage(codigo, horaEntrada, horaSalida){
    // guardamos los datos en el localStorageº
    registro = {"codigo":parseInt(codigo), "horaEntrada":horaEntrada,"horaSalida":horaSalida};
    registrosHoy.push(registro);
    localStorage.setItem(fecha.toString(), JSON.stringify(registrosHoy));
}
