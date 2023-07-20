
// Obtener los botones de profesor y estudiante
var profesorBtn = document.getElementById('profesor');
var estudianteBtn = document.getElementById('estudiante');
var pinInput = document.getElementById('pin');
  var errorSpan = document.getElementById('error');
  

// Agregar eventos de clic a los botones
profesorBtn.addEventListener('click', function() {
  // Ocultar sección elegir-rol y sección3
  document.getElementById('elegir-rol').style.display = 'none';
  document.getElementById('seccion3').style.display = 'none';
  
  // Mostrar seccion2 con el formulario
  document.getElementById('seccion2').style.display = 'block';
});

estudianteBtn.addEventListener('click', function() {
  // Ocultar sección elegir-rol y seccion2
  document.getElementById('elegir-rol').style.display = 'none';
  document.getElementById('seccion2').style.display = 'none';

  // Mostrar seccion3 u otra sección para estudiantes
  document.getElementById('seccion3').style.display = 'block';
});

// Agregar la lógica de validación del formulario aquí

  

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const seccionEspecifica = document.querySelector(".container");
const inputs = seccionEspecifica.querySelectorAll("input"),
  button = seccionEspecifica.querySelector("button");

// Verificar el código ingresado por el usuario al hacer clic en el botón "Verify OTP"
button.addEventListener("click", () => {
  const codigoIngresado = inputs[0].value + inputs[1].value + inputs[2].value + inputs[3].value;
  var pin = pinInput.value;
  if (codigoIngresado === pin.toString()) {
    alert("¡Ingreso exitoso!");
    // Crear el botón de "Continuar"
    var continuarBtn = document.createElement('button');
    continuarBtn.textContent = 'Continuar';
    continuarBtn.id = 'continuarBtn';

    // Agregar el botón a la sección o contenedor deseado
    var seccion = document.getElementById('seccion3'); // Cambia el ID de la sección o contenedor según tus necesidades
    seccion.appendChild(continuarBtn);
    
    // Agregar un evento de clic al botón "Continuar"
    continuarBtn.addEventListener('click', function() {
      // Acciones a realizar al hacer clic en el botón "Continuar"
      window.location.href = '../nivel1/index1.html';
    });
  } else {
    alert("El código ingresado es incorrecto. Inténtalo de nuevo.");
    
  }
});

// Iterar sobre todos los elementos de entrada
inputs.forEach((input, index1) => {
  input.addEventListener("keyup", (e) => {
    // Este código obtiene el elemento de entrada actual y lo almacena en la variable currentInput
    // Este código obtiene el siguiente elemento hermano del elemento de entrada actual y lo almacena en la variable nextInput
    // Este código obtiene el elemento hermano anterior del elemento de entrada actual y lo almacena en la variable prevInput
    const currentInput = input,
      nextInput = input.nextElementSibling,
      prevInput = input.previousElementSibling;

    // Si el valor tiene más de un carácter, borrarlo
    if (currentInput.value.length > 1) {
      currentInput.value = "";
      return;
    }

    // Si el siguiente elemento de entrada está desactivado y el valor actual no está vacío,
    // habilitar el siguiente elemento de entrada y enfocarlo
    if (nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== "") {
      nextInput.removeAttribute("disabled");
      nextInput.focus();
    }

    // Si se presiona la tecla de retroceso (Backspace)
    if (e.key === "Backspace") {
      // Iterar nuevamente sobre todos los elementos de entrada
      inputs.forEach((input, index2) => {
        // Si el índice index1 del elemento de entrada actual es menor o igual al índice index2 del
        // elemento de entrada en el bucle externo y el elemento anterior existe,
        // establecer el atributo "disabled" en el elemento de entrada y enfocar el elemento anterior
        if (index1 <= index2 && prevInput) {
          input.setAttribute("disabled", true);
          input.value = "";
          prevInput.focus();
        }
      });
    }

    // Si el cuarto elemento de entrada (con índice 3) no está vacío y no tiene el atributo "disabled",
    // agregar la clase "active" al botón; de lo contrario, quitar la clase "active".
    if (!inputs[3].disabled && inputs[3].value !== "") {
      button.classList.add("active");
      return;
    }
    button.classList.remove("active");
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


document.getElementById('pinForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita que se envíe el formulario

  var pin = pinInput.value;

  // Validar longitud del PIN
  if (pin.length !== 4) {
    errorSpan.textContent = 'El PIN debe tener exactamente 4 caracteres.';
    return;
  }

  // Validar espacios en blanco
  if (pin.includes(' ')) {
    errorSpan.textContent = 'El PIN no puede contener espacios en blanco.';
    return;
  }

  // Ocultar el formulario
  document.getElementById('pinForm').style.display = 'none';

  // Mostrar mensaje de éxito con estilos aplicados
  var successMessage = document.createElement('p');
  successMessage.id = 'successMessage';
  successMessage.textContent = '¡Su PIN fue creado exitosamente: ' + pin + '!';
  document.body.appendChild(successMessage);

  // Crear el botón de "Continuar"
  var atrasBtn = document.createElement('button');
  atrasBtn.textContent = 'atras';
  atrasBtn.id = 'atrasBtn';

   // Agregar el botón a la sección o contenedor deseado
   var seccion = document.getElementById('elegir-rol'); // Cambia el ID de la sección o contenedor según tus necesidades
   seccion.appendChild(atrasBtn);
   
   // Agregar un evento de clic al botón "Continuar"
   atrasBtn.addEventListener('click', function() {
     // Acciones a realizar al hacer clic en el botón "Continuar"
     document.getElementById('elegir-rol').style.display = 'block';
   });
});
