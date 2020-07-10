window.addEventListener("load", inicia);
    
// Iniciamos los array
function inicia(){
    //alert("INICIA");
    elementoActivo="";
    tipoEvento = ["DE RATON", "DE TECLADO", "DE FORMULARIO"];
    NombreEvento = ["contextmenu",
                    "ondblclick",
                    "onkeyup",
                    "onselect"
                    ];
    concepto = ["Se pulsa el botón derecho del ratón (antes de que aparezca el menú contextual)",
                "Doble click sobre un elemento",
                "El usuario libera una tecla que tenía pulsada (para elementos de formulario y body)",
                "El usuario selecciona el texto de un elemento input o textarea"
                ];
    sintaxisHTML = ['&ltelement oncontextmenu="myScript"&gt&lt/element&gt',
                    '&ltelement ondblclick="myScript"&gt',
                    '&ltelement onkeyup="myScript"&gt',
                    '&ltelement onselect="myScript"&gt'
                ];
    sintaxisJS = ["object.oncontextmenu = function(){myScript};",
                "object.ondblclick = function(){myScript};",
                "object.onkeyup = function(){myScript};",
                "object.onselect = function(){myScript};"
                ];
    sintaxisListener = ["object.addEventListener(&quotcontextmenu&quot, myScript);",
                        'object.addEventListener("dblclick", myScript);',
                        'object.addEventListener("keyup", myScript);',
                        'object.addEventListener("select", myScript);'
                        ];


}

function muestraEvento(elemento, tipo, evento){
    if (elementoActivo != ""){
        elementoActivo.style.background= "white";
        elementoActivo.style.color = "black";
    }
    document.getElementById("derecho").style.visibility = "visible";
    elemento.style.background = "rgb(173, 216, 230)";
    elemento.style.color = "blue";
    elementoActivo = elemento;

    document.getElementById("tipo").innerHTML = tipoEvento[tipo];
    document.getElementById("nombre").innerHTML = NombreEvento[evento].toUpperCase();
    document.getElementById("concepto").innerHTML = concepto[evento];
    document.getElementById("sintaxisHTML").innerHTML = sintaxisHTML[evento]; 
    document.getElementById("sintaxisJS").innerHTML = sintaxisJS[evento];
    document.getElementById("sintaxisListener").innerHTML = sintaxisListener[evento];


};
