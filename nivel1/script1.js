

const TIEMPO_DEL_JUEGO = 120; //tiempo del juego

const timer = document.getElementById("tiempo"); // Obtener el elemento del cronómetro

// Establecer el tiempo inicial
let timeLeft = TIEMPO_DEL_JUEGO; // Tiempo restante del juego

var countdown; // Identificador del intervalo de tiempo del cronómetro del juego

//tiempo por pregunta
const tiempo_pregunta = 0; // Tiempo disponible para responder cada pregunta
let num = 10;
// Establecer el tiempo inicial de la pregunta
let timeLeft1 = tiempo_pregunta; // Tiempo restante para responder la pregunta actual
var countdown1; // Identificador del intervalo de tiempo de la pregunta actual

// Array de preguntas y respuestas
// Se puede agregar las preguntas que desee



const questions = [
  {
    question: "¿Cuál es el rango de direcciones IP válido para una red de clase C?",
    answers: ["A) 0.0.0.0 - 127.255.255.255", "B) 128.0.0.0 - 191.255.255.255", "C) 192.0.0.0 - 223.255.255.255", "D) 224.0.0.0 - 239.255.255.255"],
    correctAnswer: 2
  },
  {
    question: "Cuál es el propósito de la máscara de red (Subnet Mask) en el direccionamiento IPv4?",
    answers: ["A) Identificar la dirección IP de broadcast de la red.", "B) Definir el número de hosts disponibles en una red.", "C) Establecer la dirección IP del enrutador predeterminado.", "D) Indicar el rango de direcciones IP válidas en una red. "],
    correctAnswer: 3
  },
  {
    question: "Cuál es la diferencia entre una dirección IP de host y una dirección IP de red?",
    answers: ["A) Identifican dispositivo vs. identifican red ", "B) Enrutamiento vs. transmisión", "C) Dirección física vs. dirección lógica", "D) Comunicación local vs. comunicación interredes"],
    correctAnswer: 0
  },
  ,

  {
    question: "¿Cuál es el formato de una dirección IP válida en IPv4?",
    answers: ["A) 192.168.0.256 ", "B) 2001:0db8:85a3:0000:0000:8a2e:0370:7334", "C) 172.31.0.1", "D) ::1"],
    correctAnswer: 2
  },
  
  {
    question: "¿Cuál es la máscara de subred por defecto para una dirección IP de Clase C en IPv4?",
    answers: ["A) 255.255.0.0", "B) 255.255.255.0", "C) 255.0.0.0", "D) 255.255.255.255"],
    correctAnswer: 3
  },
 
  {
    question: "¿Cuál de las siguientes opciones representa una dirección IP válida?",
    answers: ["A) 192.168.300.10 ", "B) 10.0.0.256", "C) 172.16.0.1", "D) 256.0.0.1"],
    correctAnswer: 2
  },

  {
    question: "¿Cuál es el número máximo de direcciones IP que se pueden asignar en una subred con una máscara de subred /24 (255.255.255.0) en IPv4?",
    answers: ["A) 512 ", "B) 254", "C) 1024", "D) 65536"],
    correctAnswer: 1
  },
  {
    question: "¿Cuál es la dirección IP de broadcast en una subred con la dirección IP 192.168.1.0/24 en IPv4?",
    answers: ["A) 192.168.1.255 ", "B) 192.168.1.255", "C) 192.168.0.0", "D) 192.168.1.1"],
    correctAnswer: 1
  },
  
  {
    question: "¿Cuál es el rango de direcciones IP válido para una red de clase C?",
    answers: ["A) 0.0.0.0 - 127.255.255.255", "B) 128.0.0.0 - 191.255.255.255", "C) 192.0.0.0 - 223.255.255.255", "D) 224.0.0.0 - 239.255.255.255"],
    correctAnswer: 2
  },
];

let currentQuestion = 0; // Índice de la pregunta actual que se muestra en el juego
let score = 0; // Puntuación actual del jugador
let usedQuestions = []; // Almacenamiento de las preguntas utilizadas en el juego


//boton comenzar
var comenzar = document.getElementById("comenzar");
comenzar.addEventListener("click", function (event) { //function (event) se refiere a una función anónima (sin nombre)
  document.getElementById("pantalla-inicial").style.display = "none";
  document.getElementById("pantalla-instrucciones").style.display = "block";
  document.getElementById("pantalla-juego").style.display = "none";
  //largarTiempo();

});

//boton jugar
var jugar = document.getElementById("jugar");
jugar.addEventListener("click", function (event) {
  document.getElementById("pantalla-inicial").style.display = "none";
  document.getElementById("pantalla-instrucciones").style.display = "none";
  document.getElementById("pantalla-juego").style.display = "block";
  largarTiempo();

});

// Crear la función que se encargará de actualizar el cronómetro cada segundo
function largarTiempo() {
  countdown = setInterval(() => {   // Iniciar un intervalo de tiempo que se ejecuta cada segundo, 
    timeLeft--;      // Restar un segundo al tiempo restante

    // Actualizar el texto del cronómetro con el tiempo restante
    timer.innerText = timeLeft;

    // Si el tiempo llega a 0, detener el cronómetro, mostrar el resultado y reiniciar el número de pregunta actual
    if (timeLeft <= 0) {
      clearInterval(countdown);
      showResult();
      currentQuestion = 0;
    }
  }, 1000);
}



// Función para mezclar un array en orden aleatorio

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + i));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

shuffle(questions);  

// Crear la función que se encargará de actualizar el cronómetro por pregunta cada segundo
function largarTiempoPregunta() {
  countdown1 = setInterval(() => {
    // Sumar un segundo al tiempo por pregunta
    timeLeft1++;

    // Actualizar el texto del cronómetro por pregunta con el tiempo por pregunta transcurrido
    //timerPregunta.innerText = timeLeftPregunta;

    // Si se ha llegado a la última pregunta, detener el cronómetro por pregunta
    if (currentQuestion === questions.length - 1) {
      clearInterval(countdown1);
    }
  }, 1000);
}



// Función para mostrar la pregunta actual, crea la pregunta con las respuestas y muestra en pantalla
function showQuestion() {
  
  const questionElement = document.getElementById("question"); // Obtener el elemento HTML donde se mostrará la pregunta
  const answersElement = document.getElementById("answers");  // Obtener el elemento HTML donde se mostrarán las respuestas
  // Reiniciar el cronómetro por pregunta y establecer el tiempo inicial en 0
  clearInterval(countdown1);   // Detener el cronómetro por pregunta
  timeLeft1 = 0;    // Establecer el tiempo por pregunta en 0
  largarTiempoPregunta();   // Iniciar el cronómetro por pregunta
  // Mezclar el array de preguntas antes de mostrar la pregunta actual
  // Mezclar el array de preguntas si se han mostrado todas las preguntas
  if (usedQuestions.length === questions.length) { //si el # de preguntas utilizadas es = al # total de preguntas disponibles
    usedQuestions = [];  // Reiniciar el array de preguntas utilizadas
    shuffle(questions);   // Mezclar el array de preguntas
  }
  // Obtener la siguiente pregunta no utilizada
  let questionIndex = 0;
  while (usedQuestions.includes(questionIndex)) {
    questionIndex++;   // Incrementar el índice de la pregunta hasta encontrar una pregunta no utilizada
  }
  currentQuestion = questionIndex;   // Establecer el índice de la pregunta actual
  usedQuestions.push(questionIndex);   // Agregar el índice de la pregunta actual al array de preguntas utilizadas

  // Mostrar la pregunta y sus respuestas en pantalla
  questionElement.textContent = questions[currentQuestion].question;   // Mostrar el texto de la pregunta en el elemento HTML correspondiente
  answersElement.innerHTML = "";   // Vaciar el contenido de las respuestas anteriores

  questions[currentQuestion].answers.forEach((answer, index) => {
    // Iterar sobre cada respuesta de la pregunta actual
    const li = document.createElement("li");   // Crear un elemento <li> para cada respuesta
    const button = document.createElement("button");   // Crear un elemento <button> para cada respuesta
    button.textContent = answer;   // Establecer el texto del botón como la respuesta actual
    button.setAttribute("onclick", `checkAnswer(${index})`);   // Establecer el atributo onclick para llamar a la función checkAnswer() con el índice de la respuesta
    li.appendChild(button);   // Agregar el botón de respuesta al elemento <li>
    answersElement.appendChild(li);   // Agregar el elemento <li> al elemento HTML de las respuestas
  });
}



// Función para comprobar la respuesta seleccionada
function checkAnswer(answerIndex) {
  const resultElement = document.getElementById("result"); // Obtener el elemento del resultado
  const selectedAnswer = questions[currentQuestion].answers[answerIndex]; // Obtener la respuesta seleccionada por el usuario
  // Comprobar si la respuesta seleccionada coincide con la respuesta correcta de la pregunta actual
  if (answerIndex === questions[currentQuestion].correctAnswer) {
    resultElement.textContent = `¡Correcto! La respuesta es ${selectedAnswer}.`; // Mostrar mensaje de respuesta correcta con la respuesta seleccionada
    resultElement.style.color = "#1bc247"; // Establecer color de texto verde para indicar respuesta correcta    
    //score++;
    // Evaluar el tiempo de respuesta y sumar puntos según el rango de tiempo
    if (timeLeft1 >= 0 && timeLeft1 <= 3) {
      score += 3; // Si el tiempo de respuesta está entre 0 y 3 segundos, se suman 3 puntos al puntaje
    } else if (timeLeft1 >= 4 && timeLeft1 <= 7) {
      score += 2; // Si el tiempo de respuesta está entre 4 y 7 segundos, se suman 2 puntos al puntaje
    } else {
      score += 1; // Si el tiempo de respuesta es mayor a 7 segundos, se suma 1 punto al puntaje
    }

  } else {
    resultElement.textContent = `Incorrecto. La respuesta correcta es ${questions[currentQuestion].answers[questions[currentQuestion].correctAnswer]}.`; // Mostrar mensaje de respuesta incorrecta junto con la respuesta correcta
    resultElement.style.color = "#af2525"; // Establecer color de texto rojo para indicar respuesta incorrecta
  }

  document.getElementById("question-container").style.display = "none";   // Ocultar el contenedor de la pregunta
  document.getElementById("result-container").style.display = "block";    // Mostrar el contenedor del resultado
}



// Función para pasar a la siguiente pregunta
function nextQuestion() {
  currentQuestion++; // Incrementar el número de pregunta actual

  // Verificar si hay más preguntas disponibles
  if (currentQuestion < questions.length) {
    showQuestion(); // Mostrar la siguiente pregunta
    document.getElementById("question-container").style.display = "block"; // Mostrar el contenedor de la pregunta
    document.getElementById("result-container").style.display = "none"; // Ocultar el contenedor del resultado
  }
  else {
    showResult(); // Mostrar el resultado final
    document.getElementById("result-container").style.display = "none"; // Ocultar el contenedor del resultado
  }
}


// Función para mostrar el resultado final
function showResult() {
  document.getElementById("acertadas").textContent = score; // Mostrar la cantidad de respuestas acertadas en el elemento con ID "acertadas"
  //document.getElementById("score1").textContent = ((score * 100) / questions.length).toFixed(2) + "% de acierto"; // Calcular y mostrar el porcentaje de acierto en el elemento con ID "score1"
  document.getElementById("pantalla-juego").style.display = "none"; // Ocultar la pantalla de juego
  document.getElementById("pantalla-final").style.display = "block"; // Mostrar la pantalla final
   
  if (score > 2) {
    document.getElementById("pasar-nivel").style.display = "block"; // Si el puntaje es mayor a 2, mostrar el elemento con ID "pasar-nivel"
  } else {
    document.getElementById("no-pasar-nivel").style.display = "block"; // Si el puntaje es menor o igual a 2, mostrar el elemento con ID "no-pasar-nivel"
    if (count > 1) {
      document.getElementById("no-pasar-nivel").style.display = "none"; // Si count es mayor a 1, ocultar el elemento con ID "no-pasar-nivel"
      document.getElementById("game-over").style.display = "block"; // Mostrar el elemento con ID "game-over"
    }
  }
}



// Variable para almacenar el contador de los intentos fallidos
let count = 0;
// Mostrar la primera pregunta al cargar la página
showQuestion();
//boton para recomenzar el juego
//var recomenzar = document.getElementById("recomenzar");
//currentQuestion = 0;





/*var continuar = document.getElementById("Continuar");

continuar.addEventListener("click", function (event) {
  //document.getElementById("game").style.display = "block";

});
*/
/*function obtenerAciertosNivel1() {
  return num;
}
export{obtenerAciertosNivel1};
//obtenerAciertosNivel1();*/



