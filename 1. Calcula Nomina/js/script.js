window.addEventListener("load", inicia);

function inicia() {
  //Creo variables para las deducciones y si cambia algun porcentaje solo cambiarlo aqui y
  //no en todos los sitios de la página
  PorcentajeContComun = 4.7;
  PorcentajeDesempleo = 1.0;
  PorcentajeFP = 0.1;
  PorcentajeSS = 2.0;
  PorcentajeIRPF = 2.0;
  //Inicializo el Recargo por hora extra
  RecargoHoraExtra = 35;
}

function ObtenerFecha() {
  //Genero y muestro la fecha que aparece al final de la nomina
  //Creo un array con el nombre de los meses
  nombreMeses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];
  hoy = new Date();
  //Obtengo el dia, mes y año
  dia = hoy.getDate();
  numMes = hoy.getMonth();
  mes = nombreMeses[numMes];
  year = hoy.getFullYear();
  //Concateno para formar la fecha con el formato necesario y lo inyecto en el html
  fecha = " " + dia + " de " + mes + " de " + year;
  document.getElementById("ponerFecha").innerHTML = fecha;
}
function validaNombre(nombre) {
  // Comprobamos que el nombre no sea vacio y que sea mayor a 3 caracteres
  if (nombre != "" && nombre.length > 3) {
    return true;
  } else {
    return false;
  }
}
function validaNumero(num) {
  // Validamos que el numero pasamos (horas trabajadas y el salario por hora) sea positivo
  if (num != "" && num > 0) {
    return true;
  } else {
    return false;
  }
}
function calculaNomina() {
  //Variable donde almaceno los errores o datos no validos del formulario
  textoError = "";
  hayError = false;
  //Iniciamos el contenedor de errores
  document.getElementById("error").innerHTML = "";
  document.getElementById("error").style.visibility = "hidden";
  //Leemos los datos del formulario
  nombre = document.getElementById("nombre").value;
  salarioHora = parseFloat(document.getElementById("salarioHora").value);
  numHoraTotales = parseFloat(document.getElementById("horas").value);

  //Validamos los campos, si alguno no se valido almaceno mensaje para mostrarlo
  if (!validaNombre(nombre)) {
    textoError = "Debe introducir un nombre valido<br>";
    hayError = true;
  }
  if (!validaNumero(numHoraTotales)) {
    textoError += "Debe introducir un número de horas validas<br>";
    hayError = true;
  }
  if (!validaNumero(salarioHora)) {
    textoError += "Debe introducir un Salario Básico valido<br>";
    hayError = true;
  }
  if (!hayError) {
    //Si todos los campos estan correctos
    HorasExtras = 0;
    //Verificamos si hay horas extras
    if (numHoraTotales > 40) {
      HorasExtras = numHoraTotales - 40;
      numHoras = 40;
    } else {
      numHoras = numHoraTotales;
    }
    //Colocamos en la nomina el nombre
    document.getElementById("trabajador").innerHTML = nombre;
    //Calculo el salario base y colocamos en la nomina su valor
    salarioBase = numHoras * salarioHora;
    document.getElementById("SalarioBase").innerHTML = salarioBase.toFixed(2);
    salarioHoraPlus = salarioHora + salarioHora * (RecargoHoraExtra / 100);
    //Calculo el salario de pluses
    salarioPluses = HorasExtras * salarioHoraPlus;
    if (HorasExtras > 0) {
      //Si hay horas extras inyectamos los valores en la nomina
      document.getElementById("cantHoras").innerHTML =
        "(" + HorasExtras + "h. x " + salarioHoraPlus.toFixed(2) + ")";
      document.getElementById(
        "PlusHoraExtra"
      ).innerHTML = salarioPluses.toFixed(2);
    } else {
      //No ha hecho horas extras mostramos vacio
      document.getElementById("cantHoras").innerHTML = "";
      document.getElementById("PlusHoraExtra").innerHTML = "";
    }
    //Calculo el salarioBruto y lo colocamos en la nomina;
    salarioBruto = salarioBase + salarioPluses;
    document.getElementById("SalarioBruto").innerHTML = salarioBruto.toFixed(2);
    document.getElementById(
      "SalarioBrutoIRPF"
    ).innerHTML = salarioBruto.toFixed(2);
    //Calculo las deducciones y colocamos en la nomina el porcentaje de deduccion y el valor
    //contingencias comunes
    ContComunes = salarioBruto * (PorcentajeContComun / 100);
    document.getElementById("PorContCom").innerHTML =
      PorcentajeContComun.toFixed(2) + "%";
    document.getElementById(
      "ContingenciaComun"
    ).innerHTML = ContComunes.toFixed(2);
    //Contingencia por desempleo
    Desempleo = salarioBruto * (PorcentajeDesempleo / 100);
    document.getElementById("PorDesem").innerHTML =
      PorcentajeDesempleo.toFixed(2) + "%";
    document.getElementById(
      "ContingenciaDesempleo"
    ).innerHTML = Desempleo.toFixed(2);
    //Contingencia por formacion profesional
    FormProf = salarioBruto * (PorcentajeFP / 100);
    document.getElementById("PorFP").innerHTML = PorcentajeFP.toFixed(2) + "%";
    document.getElementById(
      "ContingenciaFormacion"
    ).innerHTML = FormProf.toFixed(2);
    // Contingencia por seguridad social
    SegSocial = salarioBruto * (PorcentajeSS / 100);
    document.getElementById("PorSS").innerHTML = PorcentajeSS.toFixed(2) + "%";
    document.getElementById("ContingenciaSegSoc").innerHTML = SegSocial.toFixed(
      2
    );
    //Tributacion por IRPF
    Irpf = salarioBruto * (PorcentajeIRPF / 100);
    document.getElementById("PorIRPF").innerHTML =
      PorcentajeIRPF.toFixed(2) + "%";
    document.getElementById("ContingenciaIRPF").innerHTML = Irpf.toFixed(2);
    //Calculamos la deduccion total sumando todas las deducciones y mostramos en la nomina
    deduccionTotal = ContComunes + Desempleo + FormProf + SegSocial + Irpf;
    document.getElementById(
      "deduccionesTotales"
    ).innerHTML = deduccionTotal.toFixed(2);
    //Calculamos el liquido a percibir y lo mostramos en la nomina
    Liquido = salarioBruto - deduccionTotal;
    document.getElementById("TotalPercibir").innerHTML = Liquido.toFixed(2);
    //Mostramos la nomina y ocultamos el formulario
    document.getElementById("formulario-recogida").style.display = "none";
    document.getElementById("contenedor-nomina").style.display = "block";
    //Obtenemos la fecha de hoy y se inyecta en el formulario.
    ObtenerFecha();
    //guardamos los datos en el localStorage
    //Clave= nombre del empleado; valor= cadena con nombreValor=Valor y separados por & para su
    //posterior recuperacion.
    guardar = "horas=" + numHoraTotales + "&" + "salarioHora=" + salarioHora;
    localStorage.setItem(nombre, guardar);
  } else {
    //Si hay algun dato no valido
    //alert("Debe introducir valores validos");
    document.getElementById("error").style.visibility = "visible";
    document.getElementById("error").innerHTML = textoError;
    textoError = "";
  }
}

function nuevaNomina() {
  //Para calcular una nueva nomina
  //Reiniciamos el formulario de datos y lo volvemos a mostrar
  //Ocultamos la nomina.
  document.getElementById("nombre").value = "";
  document.getElementById("salarioHora").value = "";
  document.getElementById("horas").value = "";
  document.getElementById("error").innerHTML = "";
  document.getElementById("contenedor-nomina").style.display = "none";
  document.getElementById("formulario-recogida").style.display = "block";
}
