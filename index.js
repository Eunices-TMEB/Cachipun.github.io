// form login const
const user = document.getElementById("userLogin");
const pass = document.getElementById("passwordLogin");

if (localStorage.getItem("result")) {
    game();
}

loginUsuarios.addEventListener("submit", (e) => {
  e.preventDefault();
 
  if (user.value === "" || pass.value === "") {
    alert("Por favor, complete todos los campos");
  } else if (user.value.length < 6) {
    alert("El usuario debe tener al menos 6 caracteres");
  } else if (pass.value.length < 6) {
    alert("La contraseña tener al menos 6 caracteres");
  } else if (user.value !== "ENKARA") {
    alert("Los datos son incorrectos");
  } else if (pass.value !== "ENKARA") {
    alert("Los datos son incorrectos");
  } else if (user.value === "ENKARA" && pass.value === "ENKARA") {
    game();
  }
});

// change page options

function game() {
  document.getElementById("container-all").style.display = "none ";
  document.getElementById("gameInicial").style.display = "block";
}

//array options machine

const listChoices = ["piedra", "papel", "tijera"];
const results = {
  GANADOR: "Ganaste",
  PERDEDOR: "Perdiste",
  EMPATADOS: "Empate",
};

const PIEDRA = "piedra";
const PAPEL = "papel";
const TIJERAS = "tijera";

const GANADOR = "GANADOR";
const PERDEDOR = "PERDEDOR";
const EMPATADOS = "ESTAN IGUALES";

const INITIAL_SCORE = 0;
const WIN_VALUE = 100;
const LOOSE_VALUE = 30;
const TIE_VALUE = 0;
const MAX_ROUNDS = 10;
let actualScore = 0;

const userImg = document.getElementById("usuario");
const machineImg = document.getElementById("artificial");
const optionButtons = document.getElementsByClassName("game-option");

// print values or set if does not exist
if (!localStorage.getItem("result")) {
  localStorage.setItem("result", "[]");
} else {
  printResultList();
  checkIfOver();
}

function changeImageOption(element, option) {
  element.src = `Images/${option}.jpg`;
}

//clicks btns
Array.from(optionButtons).forEach((o) => {
  o.addEventListener("click", (e) => {
    const option = e.currentTarget.getAttribute("data-option");
    startGame(option);
    changeImageOption(userImg, option);
  });
});

function startGame(userChoise) {
  const machineChoise = Math.floor(Math.random() * listChoices.length);
  const resultMachine = listChoices[machineChoise];
  console.log("Option machine is " + resultMachine);

  changeImageOption(machineImg, resultMachine);

  const result = resultChoice(userChoise, resultMachine);

  document.getElementById("resultText").innerHTML = results[result];
  document.getElementById("score").innerHTML = counterScore(result);

  addToLocalStorage(userChoise, resultMachine, result);
  printResultList();
  checkIfOver();
}

function checkIfOver() {
  // disable buttons when rounds are over
  // o = option
  if (!isPlaying()) {
    Array.from(optionButtons).forEach((o) => {
      o.setAttribute("disabled", true);
    });
  }
}

function resultChoice(userChoise, resultMachine) {
  if (!userChoise) {
    console.error("No hay selección");
    return;
  }
  if (userChoise === resultMachine) {
    console.log("Empate");
    return EMPATADOS;
  }
  if (
    (userChoise === PIEDRA && resultMachine === PAPEL) ||
    (userChoise === PAPEL && resultMachine === TIJERAS) ||
    (userChoise === TIJERAS && resultMachine === PIEDRA)
  ) {
    console.log("Perdiste");
    return PERDEDOR;
  }
  if (
    (userChoise === PIEDRA && resultMachine === TIJERAS) ||
    (userChoise === PAPEL && resultMachine === PIEDRA) ||
    (userChoise === TIJERAS && resultMachine === PAPEL)
  ) {
    console.log("Ganaste");
    return GANADOR;
  }
}

function isPlaying() {
  const rounds = JSON.parse(localStorage.getItem("result")).length;
  return rounds < MAX_ROUNDS;
}

function counterScore(result) {
  if (result === GANADOR) {
    actualScore += WIN_VALUE;
  } else if (result === PERDEDOR) {
    actualScore -= LOOSE_VALUE;
  }
  return actualScore;
}

function addToLocalStorage(userOption, machineOption, result) {
  const savedResults = JSON.parse(localStorage.getItem("result"));
  savedResults.push({ userOption, machineOption, result, actualScore });
  localStorage.setItem("result", JSON.stringify(savedResults));
}

function printResultList() {
  const listScore = document.getElementById("list-score");
  listScore.innerHTML = "";
  const result = JSON.parse(localStorage.getItem("result"));
  result.forEach((e) => {
    const newLi = document.createElement("li");
    newLi.appendChild(
      document.createTextNode(
        `${e.userOption} - ${e.machineOption} - ${e.result} - ${e.actualScore}`
      )
    );
    listScore.appendChild(newLi);
  });
}

function closeSession() {
  localStorage.clear();
  window.location.href = "index.html";
}

document
  .getElementById("close-session")
  .addEventListener("click", closeSession);
