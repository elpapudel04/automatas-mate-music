let cells = [];
let rule = 30;
let generations = 0;
let cellSize = 5;

function setup() {
  createCanvas(600, 400);
  resetAutomaton();
}

function draw() {
  drawCells();
  generateNext();
}

function resetAutomaton() {
  background(255);
  generations = 0;
  rule = parseInt(document.getElementById("ruleInput").value);
  cells = Array(floor(width / cellSize)).fill(0);
  cells[floor(cells.length / 2)] = 1;
  loop();
}

function drawCells() {
  for (let i = 0; i < cells.length; i++) {
    fill(cells[i] == 1 ? 0 : 255);
    noStroke();
    rect(i * cellSize, generations * cellSize, cellSize, cellSize);
  }
}

function generateNext() {
  let nextGen = [];
  for (let i = 0; i < cells.length; i++) {
    let left = cells[(i - 1 + cells.length) % cells.length];
    let center = cells[i];
    let right = cells[(i + 1) % cells.length];
    let index = (left << 2) | (center << 1) | right;
    nextGen[i] = (rule >> index) & 1;
  }
  cells = nextGen;
  generations++;
  if (generations * cellSize > height) noLoop();
}

// Generación musical usando Tone.js
function playMusic() {
  const synth = new Tone.Synth().toDestination();
  let time = 0;

  for (let i = 0; i < cells.length; i++) {
    if (cells[i] == 1) {
      synth.triggerAttackRelease("C4", "8n", Tone.now() + time);
      time += 0.1;
    }
  }
}

// Cargar ejemplos predefinidos
function loadExample(exampleRule) {
  document.getElementById("ruleInput").value = exampleRule;
  resetAutomaton();
}
