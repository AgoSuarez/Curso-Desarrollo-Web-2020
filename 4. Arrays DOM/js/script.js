window.addEventListener("load", inicia);
    
// Iniciamos los array
function inicia(){
    //alert("INICIA");
    titulo = ["OBJETO VENTANA",
            "OBJETO DOCUMENTO",
            "OBJETO LOCATION",
            "OBJETO NAVIGATOR"];
    concepto = ["El objeto de ventana representa una ventana abierta en un navegador. Si un documento contiene marcos (etiquetas iframe), el navegador crea un objeto de ventana para el documento HTML y un objeto de ventana adicional para cada marco.",
                "La interfaz Document representa cualquer página web cargada en el navegador y sirve como punto de entrada al contenido de la página (El árbol DOM). El DOM incluye elementos como body y table), entre muchos otros, y proporciona funcionalidad que es global al documento, como obtener la URL de la página y crear nuevos elementos en el documento.",
                "La interface Location representa la ubicación (URL) del objeto al que esta vinculado. Los cambios hechos en ella son reflejados en el objeto al cual está relacionado. Ambas interfaces, Document y Window tienen una interface Location asignada, accessible desde Document.location y Window.location respectivamente.",
                "La interfaz Navigator representa el estado y la identidad del user agent. Es completamente consultable y es posible registrar scripts para que ejecuten diversas actividades. Un objeto Navigator puede ser obtenido usando la propiedad de sólo lectura Window.navigator."
                ];
    propiedades = ["Window.closed: Esta propiedad indica si la actual ventana esta cerrada o abierta.<br>"+
                    "Window.console: Retorna una referencia al objeto de la consola proveyendo acceso a la consola debugger del navegador.<br>"+
                    "Window.document: Retorna una referencia al documento que esa ventana contiene.<br>"+
                    "Window.location: Obtiene/fija la location, o URL actual, del objeto de la ventana.<br>"+
                    "Window.localStorage: Retorna una referencia al objeto almacenamiento local usado para almacenar datos que pueden ser de accedidos por el origen que los creo.",
                     //Fin WINDOW
                    "Document.body: Devuelve el elemento BODY del actual documento.<br>"+
                    "Document.forms: Devuelve una de lista de los forms del actual documento.<br>"+
                    "Document.location: Devuelve la URI del actual documento.<br>"+
                    "Document.referrer: Devuelve la URI de la página que nos enlazo a la pagina actual.<br>"+
                    "Document.URL: Devuelve la URL del actual documento.",
                    //Fin DOCUMENT
                    "Location.href: Es un DOMString que contiene la URL completa. Si es cambiada, el documento asociado navegará a la nueva pagina. Puede ser cambiada desde un origen diferente que el asociado al documento.<br>"+
                    "Location.protocol: Es un DOMString que contiene el esquema del protocolo de la URL, incluyendo el ':' final.<br>"+
                    "Location.search: Es un DOMString que contiene un '?' seguido por los parametros o el 'querystring' de la URL. Navegadores modernos proveen URLSearchParams y URL.searchParams para hacer mas facil de obtener los parametros desde el querystring.<br>"+
                    "Location.host: Es un DOMString que contiene el host, el cual esta compuesta por: hostname,  ':', y el port de la URL.<br>"+
                    "Location.hostname: Es un DOMString que contiene el dominio de la URL.",
                    //Fin LOCATION
                    "appName: Devuelve el nombre del navegador<br>"+
                    "appVersion: Devuelve la informacion referente a la version del navegador<br>"+
                    "language: Devuelve el lenguaje del navegador<br>"+
                    "platform: Devuelve la plataforma en que esta compilado el navegador (sistema operativo)<br>"+
                    "NavigatorGeolocation.geolocation: Devuelve un objeto Geolocation que permite el acceso a la ubicación del dispositivo."
                    //Fin NAVIGATOR
                ];
    metodos = ["Window.alert(): Muestra una pequeña ventana de alerta.<br>"+
                "Window.open(): Abre una nueva ventana.<br>"+
                "Window.prompt(): Returns the text entered by the user in a prompt dialog.<br>"+
                "EventTarget.addEventListener(): Registra un controlador de eventos a un tipo de evento especifico en la ventana.<br>"+
                "Window.confirm(): Muestra una ventana de comfirmación con dos únicas y posibles respuestas. Confirmar y Cancelar.", 
                //Fin WINDOW
                "Document.getElementsByClassName(String className): Devuelve una lista de elementos que tenga la clase className.<br>"+
                "Document.getElementById(String id): Devuelve un objeto que hace referencia al elemento con el ID.<br>"+
                "Document.createElement(String name): Crea un nuevo elemento con el nombre pasado.<br>"+
                "Document.getElementsByTagName(String tagName): Devuelve una lista de elementos con el nombre pasado.<br>"+
                "Document.querySelector(String selector): Devuelve el primer elemento del documento (utilizando un recorrido primero en profundidad pre ordenado de los nodos del documento) que coincida con el grupo especificado de selectores.",
                //Fin DOCUMENT
                "Location.reload(): Recarga el recurso desde la URL actual. Si unico y opcional parametro es Boolean, el cual, cuando es true, hace que la pagina siempre sea recargada desde el servidor. Si es false o no es especificado, el navegador puede recargar la pagina desde su cache.<br>"+
                "Location.replace(): Reemplaza el recurso actual por el recibido como URL. La diferencia con el metodo assign() es que luego de usar replace() la pagina actual no va a ser guardada en la sesión History, esto significa que el usuario no podrá usar el boton Atras para navegar a esta.<br>"+
                "Location.toString(): Retorna un DOMString que contiene la URL completa. Es un sinonimo de URLUtils.href, aunque este no puede ser utilizado para modificar el valor.<br>"+
                "Location.assign(): Carga el recurso en la URL proporcionada en el parámetro.",
                //Fin LOCATION
                "Navigator.getVRDisplays(): Devuelve una promesa que se resuelve en un arreglo de objetos VRDisplay que representan cualquier dispositivo VR conectado a la computadora que esté disponible.<br>"+
                "NavigatorUserMedia.getUserMedia(): Después de solicitar permiso al usuario, devuelve el stream de audio o video asociado a la cámara o micrófono de la computadora local.<br>"+
                "Navigator.vibrate(): Causa vibración en el dispositivo que la soporta. No hace nada si el soporte para vibración no está disponible.<br>"+
                "Navigator.sendBeacon(): Usado para transferir, de forma asíncrona, conjuntos pequeños de datos HTTP del agente usuario al servidor.<br>"+
                "Navigator.registerProtocolHandler(): Permite a los sitios webs registrarse como posibles controladores de un protocolo determinado."
                //Fin NAVIGATOR
                ];
}

function muestraLista(datos, id){
//Mostramos los datos en el contenedor con el id.
    sDatos = datos.split("<br>");
    sContenedor = document.getElementById(id);
    sContenedor.innerHTML="";
    for (i=0; i<sDatos.length; i++){
        //Inyectamos en el contenedor los datos con el formato de lista.
        sContenedor.innerHTML += "<li>"+ sDatos[i] +"</li>";
    }
}
function muestra(n){
    //En n le pasamos el objeto del que vamos a mostrar la informacion.
    //Hacemos visible el lado derecho, donde se muestra el texto
    sderecho = document.getElementById("derecho");
    sderecho.style.visibility = "visible";
    //Mostramos el titulo principal
    stitulo = document.getElementById("tituloPrincipal");
    stitulo.innerHTML = titulo[n];
    //Mostramos el concepto
    sConcepto = document.getElementById("concepto");
    sConcepto.innerHTML = concepto[n] 
    //Mostramos las Propiedades
    sprop = propiedades[n];
    muestraLista(sprop, "propiedades");
    //Mostramos los metodos
    smet = metodos[n];
    muestraLista(smet, "metodos");
}