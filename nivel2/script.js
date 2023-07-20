//Initial References
let draggableObjects;
let dropPoints;
let usedImages = [];
let verificador = 0;// cuenta aciertos y no aciertos
let final = 0;// es una copia de verificador

//tiempo del juego
const TIEMPO_DEL_JUEGO = 120;
const timer = document.getElementById("tiempo"); // Obtener el elemento del cronómetro
// Establecer el tiempo inicial
let timeLeft = TIEMPO_DEL_JUEGO; // Tiempo restante del juego
var countdown; // Identificador del intervalo de tiempo del cronómetro del juego
//let num = 20;
let generatedValues = new Set();
//let randomData;

const startButton = document.getElementById("start");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
const dragContainer = document.querySelector(".draggable-objects");
const dropContainer = document.querySelector(".drop-points");
const data = [
  "0111 1101",
  "1000 0000",
  "1100 0000",
  "1110 0001",
  "1111 1111",
  "0001 0111",
  "0001 1100",
  "0001 1110",
  "0001",
  "0010",
  "0101",
  "1000 0010",
  "1000 0100",
  "1010 1111",
  "1010",
  "1100",
  "1111 0101",
  "1111"
];

let deviceType = "";
let initialX = 0,
  initialY = 0;
let currentElement = "";
let moveElement = false;

largarTiempo();
//detectar si el dispositivo en el que se ejecuta es táctil
const isTouchDevice = () => {
  try {
    //capturando errores
    document.createEvent("TouchEvent");
    deviceType = "touch"; // se establece en "mouse" para indicar que el dispositivo tiene un ratón
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false; // indicar que no es un dispositivo táctil.
  }
};

let count = 0; //cuenta aciertos

//genera un valor aleatorio a partir de un arreglo llamado data.
/*const randomValueGenerator = () => {
  return data[Math.floor(Math.random() * data.length)];
};*/
const randomValueGenerator = () => {
  if (generatedValues.size === data.length) {
    return -1;
  }

  let randomValue;

  do {
    randomValue = data[Math.floor(Math.random() * data.length)];
  } while (generatedValues.has(randomValue));

  generatedValues.add(randomValue);
  return randomValue;
};

// Crear la función que se encargará de actualizar el cronómetro cada segundo
function largarTiempo() {
  countdown = setInterval(() => {   // Iniciar un intervalo de tiempo que se ejecuta cada segundo, 
    timeLeft--;      // Restar un segundo al tiempo restante

    // Actualizar el texto del cronómetro con el tiempo restante
    timer.innerText = timeLeft;

    // Si el tiempo llega a 0 o si termina de responder todas las preguntas, detener el cronómetro, mostrar el resultado y reiniciar el número de pregunta actual
    if ((timeLeft <= 0) || (final == data.length)) {
      clearInterval(countdown);
      startButton.classList.add("hide");
      verificador = 0;
      controls.classList.add("hide");
      var container = document.querySelector(".container");
      container.style.display = "none";
      document.getElementById("pantalla-final").style.display = "block";
      document.getElementById("acertadas").textContent = count;
      document.getElementById("score1").textContent = ((count * 100) / data.length).toFixed(2) + "% de acierto";
      if (count >= 1) {
        document.getElementById("pasar-nivel").style.display = "block";//pasa de nivel
      } else {
        document.getElementById("no-pasar-nivel").style.display = "block";//no pasa de nivel
      }
    }
  }, 1000);
}

function obtenerAciertosNivel2() {
  return count;
}






//Detener el juego
const stopGame = () => {
  controls.classList.remove("hide");//Esto significa que se está mostrando el elemento que anteriormente estaba oculto mediante la clase "hide".
  startButton.classList.remove("hide");// Esto significa que se está mostrando el botón de inicio (startButton) que anteriormente estaba oculto mediante la clase "hide"
};

//Drag & Drop Funciones,Esta función se ejecuta cuando se inicia la acción de arrastrar un elemento.
function dragStart(e) {
  if (isTouchDevice()) {
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
    // indicar que se debe iniciar el movimiento del elemento.
    moveElement = true;
    currentElement = e.target;
  } else {
    //dispositivos no tactil 
    e.dataTransfer.setData("text", e.target.id);
  }
}
//Esta función se ejecuta cuando un elemento arrastrado se encuentra sobre el área de soltar (drop zone).
function dragOver(e) {
  e.preventDefault();
}

//Esta función se ejecuta cuando se mueve el dedo sobre la pantalla en un dispositivo táctil.
const touchMove = (e) => {
  if (moveElement) {
    e.preventDefault();
    let newX = e.touches[0].clientX;
    let newY = e.touches[0].clientY;
    let currentSelectedElement = document.getElementById(e.target.id);
    currentSelectedElement.parentElement.style.top =
      currentSelectedElement.parentElement.offsetTop - (initialY - newY) + "px";
    currentSelectedElement.parentElement.style.left =
      currentSelectedElement.parentElement.offsetLeft -
      (initialX - newX) +
      "px";
    initialX = newX;
    initialY - newY;
  }
};
// se encarga de manejar la acción de soltar un elemento arrastrado en un área de soltar.
const drop = (e) => {
  e.preventDefault();//si no se llama a este metodo, puede haber interacción no deseada, por parte del navegador, puede abrir el elemento como enlace

  if (isTouchDevice()) {
    moveElement = false;//indica que se ha finalizado el movimiento del elemento arrastrable.

    const currentDrop = document.querySelector(`div[data-id='${e.target.id}']`);
    //Get boundaries of div
    const currentDropBound = currentDrop.getBoundingClientRect();
    //if the position of flag falls inside the bounds of the countru name
    if (
      //verifica posicion de arrastre
      initialX >= currentDropBound.left &&
      initialX <= currentDropBound.right &&
      initialY >= currentDropBound.top &&
      initialY <= currentDropBound.bottom
    ) {
      currentDrop.classList.add("dropped");
      //hide actual image
      currentElement.classList.add("hide");
      currentDrop.innerHTML = ``;//Se vacía el contenido del elemento  
      //Se inserta un nuevo elemento <img>
      currentDrop.insertAdjacentHTML(
        "afterbegin",
        `<img src= "${currentElement.id}.png">`
      );
      const newImageSrc = `${currentElement.id}.png`; // Ruta de la nueva imagen
      usedImages.push(newImageSrc); // Agregar la ruta a la lista de imágenes utilizadas
      count += 1;
      final += 1;
      verificador += 1;
    } else {
      //dropped class
      /*const draggedElement = document.getElementById(draggedElementData);
      draggedElement.classList.add("hide");
      e.target.classList.add("dropped");
      e.target.classList.add("drop");
      e.target.insertAdjacentHTML(
        "afterbegin",
        `<img src="${draggedElementData}.png">`
      );*/
      currentDrop.classList.add("drop");//Se agrega la clase "drop" al elemento de nombre de país utilizando 
      //hide actual image
      currentElement.classList.add("hide");
      currentDrop.innerHTML = ``;
      verificador += 1;
      final += 1;
      //Se inserta un nuevo elemento <img>
      currentDrop.insertAdjacentHTML(
        "afterbegin",
        `<img src= "${currentElement.id}.png">`
      );
      const newImageSrc = `${currentElement.id}.png`; // Ruta de la nueva imagen
      usedImages.push(newImageSrc);
      //count -= 1;


    }
  } else {
    //Access data
    const draggedElementData = e.dataTransfer.getData("text");
    //Get custom attribute value
    const droppableElementData = e.target.getAttribute("data-id");
    if (draggedElementData === droppableElementData) {
      const draggedElement = document.getElementById(draggedElementData);
      //dropped class
      e.target.classList.add("dropped");
      //hide current img
      draggedElement.classList.add("hide");
      //draggable set to false
      draggedElement.setAttribute("draggable", "false");
      e.target.innerHTML = ``;
      //insert new img
      e.target.insertAdjacentHTML(
        "afterbegin",
        `<img src="${draggedElementData}.png">`
      );
      const newImageSrc = `${draggedElementData}.png`; // Ruta de la nueva imagen
      usedImages.push(newImageSrc);
      count += 1;
      final += 1;
      verificador += 1;
    } else {
      //dropped class
      const draggedElement = document.getElementById(draggedElementData);
      draggedElement.classList.add("hide");
      e.target.classList.add("drop");
      final += 1;
      verificador += 1;
      e.target.insertAdjacentHTML(
        "afterbegin",
        `<img src="${draggedElementData}.png">`

      );
      // Agregar la ruta a la lista de imágenes utilizadas
      //count -= 1;


    }
  }
  //Win
  // presentacion final
  while (verificador == 3) {
    /* result.innerText = `Ganaste!`;*/
    /* document.getElementById("controls-container").style.display = "none";
     document.getElementById("acertadas").textContent = count;
     document.getElementById("score1").textContent = (count * 100) / 10 + "% de acierto";
     document.getElementById("pantalla-final").style.display = "block";*/
    stopGame();
    verificador = 0;
  }
  if (final == data.length) {
    startButton.classList.add("hide");
    document.getElementById("pantalla-final").style.display = "block";
    document.getElementById("acertadas").textContent = count;
    document.getElementById("score1").textContent = ((count * 100) / data.length).toFixed(2) + "% de acierto";
  }




};

//crear y configurar los elementos dentro de los contenedores
const creator = () => {
  dragContainer.innerHTML = "";
  dropContainer.innerHTML = "";
  let randomData = [];
  //for string random values in array
  for (let i = 1; i <= 3; i++) {
    let randomValue = randomValueGenerator();//cantidad de imagenes a presentar
    if (randomValue != -1) {
      if (!randomData.includes(randomValue)) {
        randomData.push(randomValue);
        // Agrega la imagen a la lista de imágenes utilizadas
        //usedImages.push(`${i}.png`);//NEW -------------------------------------------------------------------------
      } else {
        //If value already exists then decrement i by 1
        i -= 1;
      }
    } else {

    }
  }

  for (let i of randomData) {
    const flagDiv = document.createElement("div");
    flagDiv.classList.add("draggable-image");
    flagDiv.setAttribute("draggable", true);
    if (isTouchDevice()) {
      flagDiv.style.position = "absolute";
    }
    flagDiv.innerHTML = `<img src="${i}.png" id="${i}">`;
    dragContainer.appendChild(flagDiv);
    // Obtener la siguiente pregunta no utilizada
    usedImages.push(flagDiv);
  }
  //Sort the array randomly before creating country divs
  randomData = randomData.sort(() => 0.5 - Math.random());
  for (let i of randomData) {
    const countryDiv = document.createElement("div");
    countryDiv.innerHTML = `<div class='countries' data-id='${i}'>
    ${i.charAt(0).toUpperCase() + i.slice(1).replace("-", " ")}
    </div>
    `;
    dropContainer.appendChild(countryDiv);
  }
  // return randomData;//---------------------------------------------------------------------------------------
};

//Start Game
startButton.addEventListener(
  "click",
  (startGame = async () => {
    currentElement = "";
    controls.classList.add("hide");
    startButton.classList.add("hide");
    //This will wait for creator to create the images and then move forward
    await creator();//crea los elementos en los contenedores
    /*const previousImages = usedImages; // Almacenar las imágenes utilizadas anteriormente-----------------------
    randomData = creator(); // Obtener randomData desde creator()
    
    // Filtrar el randomData para eliminar imágenes utilizadas anteriormente
    randomData = randomData.filter((image) => !previousImages.includes(image));
    
    usedImages = [...previousImages, ...randomData]; // Actualizar las imágenes utilizadas*/

    // count = 0;
    dropPoints = document.querySelectorAll(".countries");
    draggableObjects = document.querySelectorAll(".draggable-image");

    //Events
    draggableObjects.forEach((element) => {
      element.addEventListener("dragstart", dragStart);//Para cada elemento arrastrable, se agrega un evento "dragstart" 
      //for touch screen
      element.addEventListener("touchstart", dragStart);
      element.addEventListener("touchend", drop);
      element.addEventListener("touchmove", touchMove);
    });
    dropPoints.forEach((element) => {
      element.addEventListener("dragover", dragOver);
      element.addEventListener("drop", drop);
    });

  })
);
/*function obtenerAciertosNivel2() {
  return num;
}
export{obtenerAciertosNivel2};
//obtenerAciertosNivel2();*/