// Lista de imágenes para el juego
// const images = [
//   'imagen1.jpg',
//   'imagen2.jpg',
//   'imagen3.jpg',
//   'imagen4.jpg',
//   'imagen5.jpg',
//   'imagen6.jpg',
//   'imagen1.jpg',
//   'imagen2.jpg',
//   'imagen3.jpg',
//   'imagen4.jpg',
//   'imagen5.jpg',
//   'imagen6.jpg'
// ];

/*import {obtenerAciertosNivel1} from '../nivel1/script1.js';
import {obtenerAciertosNivel2} from '../nivel2/script.js';*/
const pairs = [
  { image1: 'im1.jpg', image2: 'im2.jpg' },
  { image1: 'im3.jpg', image2: 'im4.jpg' },
  { image1: 'im5.jpg', image2: 'im6.jpg' },
  { image1: 'im7.jpg', image2: 'im8.jpg' },
  { image1: 'im9.jpg', image2: 'im10.jpg' },
  { image1: 'im11.jpg', image2: 'im12.jpg' }
];



const images = pairs.flatMap(pair => [pair.image1, pair.image2]);

let startTime;
let timerInterval;
let moves;
let matches;
let count = 0;
let timerLimit = 350; // Límite de tiempo en segundos
let flippedCards = [];
let isCardFlipping = false;
let isClicked = false; // Variable para realizar el seguimiento del estado del clic


function mostrarImagen(rutaImagen) {
  var imagen = document.getElementById("imagenMostrada");
  //imagen.src = rutaImagen;
  // Verificar si la imagen ya está visible
  if (imagen.src === window.location.href + rutaImagen) {
    // Ocultar la imagen
    imagen.src = "";
  } else {
    // Mostrar la imagen
    imagen.src = rutaImagen;
  }
}


// generando el tablero con las cartas 
const cardContainer = document.getElementById('card-container');
const shuffledImages = shuffle(images);
const cardsHTML = generateCardsHTML(shuffledImages);// Genera el código HTML para las cartas
cardContainer.innerHTML = cardsHTML;// Inserta el código HTML generado dentro del contenedor de cartas

// Función que se ejecuta cuando se hace clic en el elemento
function handleClick() {
  isClicked = true;
}

var jugar = document.getElementById("jugar");
jugar.addEventListener("click", function (event) {
  document.getElementById("pantalla-inicial").style.display = "block";
  document.getElementById("pantalla-ejemplo").style.display = "block";
  document.getElementById("pantalla-instrucciones").style.display = "none";
  document.getElementById("pantalla-juego").style.display = "none";

});

//Boton Iniciar Juego
document.getElementById("startButton").addEventListener('click', function () {
  handleClick();
  startGame();
  // Obtén las cartas después de que se hayan insertado en el contenedor
  const cards = Array.from(cardContainer.getElementsByClassName('card'));
  if (isClicked) {
    cards.forEach((card) => {
      card.addEventListener('click', flipCard);
    });
  } else {
    // No se realiza ninguna acción adicional en este caso
  }
});


//Boton Finalizar Juego
document.getElementById("finishButton").addEventListener('click', function () {
  finalResumen();
});


// Resto del código del juego de memoria

function generateCardsHTML(images) {
  let cardsHTML = '';

  images.forEach((image) => {
    const cardHTML = `
      <div class="card" data-image="${image}"></div>
    `;
    cardsHTML += cardHTML;
  });

  return cardsHTML;
}
function finalResumen() {//matches contabiliza aciertos
  finishGame();
  document.getElementById("pantalla-final").style.display = "block";
  
  document.getElementById("pantalla-inicial").style.display = "none";
  document.getElementById("pantalla-ejemplo").style.display = "none";
  /*if (matches >= 4) {
    document.getElementById("pasar-nivel").style.display = "block";
  } else {
    document.getElementById("no-pasar-nivel").style.display = "block";
  }*/
}


// Barajar las imágenes de forma aleatoria
function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//Crear el tablero de juego con las cartas
function createGameBoard() {
  const shuffledImages = shuffle(images);
  const gameBoard = document.getElementById('gameBoard');

  for (let i = 0; i < shuffledImages.length; i++) {
    if (i % 3 === 0) {
      const row = document.createElement('div');
      row.classList.add('row');
      gameBoard.appendChild(row);
    }

    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.image = shuffledImages[i];
    card.addEventListener('click', flipCard);

    const currentRow = gameBoard.lastChild;
    currentRow.appendChild(card);
  }
}





// Voltear una carta y verificar si hay una coincidencia
// function flipCard() {
//   if (isCardFlipping || this.classList.contains('flipped') || this.classList.contains('matched')) {
//     return;
//   }

//   this.classList.add('flipped');
//   this.style.backgroundImage = `url(${this.dataset.image})`;

//   flippedCards.push(this);

//   if (flippedCards.length === 2) {
//     isCardFlipping = true;
//     const card1 = flippedCards[0];
//     const card2 = flippedCards[1];

//     card1.removeEventListener('click', flipCard);
//     card2.removeEventListener('click', flipCard);

//     if (card1.dataset.image === card2.dataset.image) {
//       card1.classList.add('matched');
//       card2.classList.add('matched');
//       matches++;

//       if (matches === images.length / 2) {
//         finishGame();
//       }

//       flippedCards = [];
//       isCardFlipping = false;
//     } else {
//       setTimeout(() => {
//         card1.classList.remove('flipped');
//         card2.classList.remove('flipped');
//         card1.style.backgroundImage = '';
//         card2.style.backgroundImage = '';
//         card1.addEventListener('click', flipCard);
//         card2.addEventListener('click', flipCard);

//         flippedCards = [];
//         isCardFlipping = false;
//       }, 1000);
//     }

//     moves++;
//     updateMoves();
//   }
// }


function flipCard() {
  if (isCardFlipping || this.classList.contains('flipped') || this.classList.contains('matched')) {
    return;
  }

  this.classList.add('flipped');
  this.style.backgroundImage = `url(${this.dataset.image})`;

  flippedCards.push(this);

  if (flippedCards.length === 2) {
    isCardFlipping = true;
    const card1 = flippedCards[0];
    const card2 = flippedCards[1];

    card1.removeEventListener('click', flipCard);
    card2.removeEventListener('click', flipCard);

    const image1 = card1.dataset.image;
    const image2 = card2.dataset.image;

    const pair = pairs.find(p => (p.image1 === image1 && p.image2 === image2) || (p.image1 === image2 && p.image2 === image1));

    if (pair) {
      card1.classList.add('matched');
      card2.classList.add('matched');
      matches++;

      if (matches === pairs.length) { //si la cantidad de aciertos es igual a todos los pares encontrados
        finalResumen();
      }

      flippedCards = [];
      isCardFlipping = false;
    } else {
      setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.style.backgroundImage = '';
        card2.style.backgroundImage = '';
        card1.addEventListener('click', flipCard);
        card2.addEventListener('click', flipCard);

        flippedCards = [];
        isCardFlipping = false;
      }, 1000);
    }

    moves++;
    updateMoves();
  }
}



// Actualizar el número de movimientos
function updateMoves() {
  const movesElement = document.getElementById('moves');
  movesElement.textContent = `Movimientos: ${moves}`;
}

// Iniciar el juego
function startGame() {

  const startButton = document.getElementById('startButton');
  const timerElement = document.getElementById('timer');
  const finishButton = document.getElementById('finishButton');
  const gameDetails = document.getElementById('gameDetails');


  // Reiniciar variables
  startTime = Date.now();
  moves = 0;
  matches = 0;

  // Habilitar botón de finalizar juego
  finishButton.disabled = false;

  // Mostrar el temporizador
  timerElement.textContent = `Tiempo restante: ${timerLimit} segundos`;
  timerInterval = setInterval(updateTimer, 1000);

  // Crear el tablero de juego
  //const gameBoard = document.getElementById('gameBoard');
  // gameBoard.innerHTML = '';
  //createGameBoard();

  // Ocultar los detalles del juego
  gameDetails.style.display = 'none';

  // Deshabilitar botón de inicio
  startButton.disabled = true;
}


// Finalizar el juego
function finishGame() {
  const startButton = document.getElementById('startButton');
  const finishButton = document.getElementById('finishButton');
  const gameDetails = document.getElementById('gameDetails');
  const timeElapsedElement = document.getElementById('timeElapsed');
  const matchesElement = document.getElementById('matches');
  const movesElement = document.getElementById('moves');

  // Detener el temporizador
  clearInterval(timerInterval);

  // Calcular tiempo transcurrido
  const endTime = Date.now();
  const timeElapsed = (endTime - startTime) / 1000;
 
  // Mostrar los detalles del juego
  timeElapsedElement.textContent = `Tiempo transcurrido: ${timeElapsed} segundos`;
  matchesElement.textContent = `Pares encontrados: ${matches}`;
  movesElement.textContent = `Movimientos realizados: ${moves}`;
  gameDetails.style.display = 'block';
  document.getElementById("nivel3-aciertos").textContent = matches;
  // Habilitar botón de inicio
  startButton.disabled = true;

  // Deshabilitar botón de finalizar juego
  finishButton.disabled = true;
}

// Actualizar el temporizador
function updateTimer() {
  const timerElement = document.getElementById('timer');
  const currentTime = Date.now();
  const elapsedTime = Math.floor((currentTime - startTime) / 1000);

  const remainingTime = timerLimit - elapsedTime;

  timerElement.textContent = `Tiempo restante: ${remainingTime} segundos`;
  if(remainingTime == 0)  {
    finalResumen();
  }

}
obtenerAciertosNivel1();  // Función definida en el nivel1
obtenerAciertosNivel2();

// REPORTE FINAL DE TODA LA PARTIDA
document.getElementById("reporte-final").addEventListener('click', function () {
  document.getElementById("reporte-final-partida").style.display = "block";
  document.getElementById("pantalla-final").style.display = "none";
});

const aciertosNivel1 = obtenerAciertosNivel1();  // Función definida en el nivel1
const aciertosNivel2 = obtenerAciertosNivel2();  // Función definida en el nivel2


// Mostrar los aciertos en el resumen final
document.getElementById("nivel1-aciertos").textContent = aciertosNivel1;
document.getElementById("nivel2-aciertos").textContent = aciertosNivel2;

