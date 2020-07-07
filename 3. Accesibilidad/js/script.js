dyx = false;
function cambiatema(tipo) {
  switch (tipo) {
    case 1:
      document.getElementById("fondo").style.background = "white";
      document.getElementById("fondo").style.color = "black";
      break;
    case 2:
      document.getElementById("fondo").style.background = "blue";
      document.getElementById("fondo").style.color = "yellow";
      break;
    case 3:
      document.getElementById("fondo").style.background = "black";
      document.getElementById("fondo").style.color = "white";
      break;
    case 4:
      document.getElementById("fondo").style.background = "red";
      document.getElementById("fondo").style.color = "white";
      break;
  }
  document.getElementById("numero").style.color = "black";
}

function TamanoLetra(indice) {
  tope = parseInt(document.getElementById("numero").innerHTML);
  // console.log(tope)
  if (indice == 0 && tope > 1) {
    tope = tope - 1;
  } else if (tope < 7 && indice == 1) {
    tope = tope + 1;
  }

  switch (tope) {
    case 1:
      document.getElementById("fondo").style.fontSize = "xx-small";
      break;
    case 2:
      document.getElementById("fondo").style.fontSize = "x-small";
      break;
    case 3:
      document.getElementById("fondo").style.fontSize = "small";
      break;
    case 4:
      document.getElementById("fondo").style.fontSize = "medium";
      break;
    case 5:
      document.getElementById("fondo").style.fontSize = "large";
      break;
    case 6:
      document.getElementById("fondo").style.fontSize = "x-large";
      break;
    case 7:
      document.getElementById("fondo").style.fontSize = "xx-large";
      break;
  }
  document.getElementById("numero").innerHTML = tope;
}

function dislexia() {
  if (!dyx) {
    document.getElementById("fondo").style.letterSpacing = "6px";
    document.getElementById("fondo").style.fontFamily = "sans-serif";
    dyx = true;
  } else {
    document.getElementById("fondo").style.letterSpacing = "normal";
    document.getElementById("fondo").style.fontFamily = "Segoe UI";
    dyx = false;
  }
}
