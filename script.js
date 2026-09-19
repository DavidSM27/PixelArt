/**
 * Pixel Art Creator
 * JavaScript puro (sin frameworks ni librerías).
 *
 * Índice:
 *  1. Selectores y estado
 *  2. Generación eficiente de la cuadrícula
 *  3. Pintado (ratón y táctil, con delegación de eventos)
 *  4. Color y modo borrador
 *  5. Controles: generar y limpiar
 *  6. Exportar como PNG
 *  7. Bonus: modo oscuro con tecla secreta
 *  8. Inicialización
 */

/* ---------- 1. Selectores y estado ---------- */
const grid = document.querySelector('#grid');
const sizeInput = document.querySelector('#gridSize');
const generateBtn = document.querySelector('#generateBtn');
const colorPicker = document.querySelector('#colorPicker');
const eraserToggle = document.querySelector('#eraserToggle');
const clearBtn = document.querySelector('#clearBtn');
const downloadBtn = document.querySelector('#downloadBtn');

const MIN_SIZE = 2;
const MAX_SIZE = 64;

let currentColor = colorPicker.value;
let isDrawing = false;
let isErasing = false;
let currentGridSize = clampSize(parseInt(sizeInput.value, 10));

/* ---------- 2. Generación eficiente de la cuadrícula ---------- */
function clampSize(value) {
  if (Number.isNaN(value)) return 16;
  return Math.min(Math.max(value, MIN_SIZE), MAX_SIZE);
}

function generateGrid(size) {
  currentGridSize = size;
  grid.style.setProperty('--grid-size', String(size));

  // Se vacía una sola vez y se construyen todas las celdas en un
  // DocumentFragment para insertarlas con un único reflow del DOM.
  grid.textContent = '';
  const fragment = document.createDocumentFragment();

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.row = String(row);
      cell.dataset.col = String(col);
      fragment.appendChild(cell);
    }
  }

  grid.appendChild(fragment);
}

/* ---------- 3. Pintado (ratón y táctil, con delegación de eventos) ---------- */
function paintCell(target) {
  if (!target || !target.classList || !target.classList.contains('cell')) return;
  target.style.backgroundColor = isErasing ? '' : currentColor;
}

// Un único listener por tipo de evento en el contenedor: la delegación
// evita crear cientos de handlers individuales y no usa atributos inline.
grid.addEventListener('mousedown', (event) => {
  isDrawing = true;
  paintCell(event.target);
});

grid.addEventListener('mouseover', (event) => {
  if (isDrawing) paintCell(event.target);
});

document.addEventListener('mouseup', () => {
  isDrawing = false;
});

grid.addEventListener('dragstart', (event) => event.preventDefault());

function handleTouch(event) {
  const touch = event.touches[0];
  if (!touch) return;
  const target = document.elementFromPoint(touch.clientX, touch.clientY);
  paintCell(target);
}

grid.addEventListener('touchstart', handleTouch, { passive: true });
grid.addEventListener('touchmove', handleTouch, { passive: true });

/* ---------- 4. Color y modo borrador ---------- */
colorPicker.addEventListener('input', (event) => {
  currentColor = event.target.value;
  if (isErasing) {
    isErasing = false;
    eraserToggle.setAttribute('aria-pressed', 'false');
  }
});

eraserToggle.addEventListener('click', () => {
  isErasing = !isErasing;
  eraserToggle.setAttribute('aria-pressed', String(isErasing));
});

/* ---------- 5. Controles: generar y limpiar ---------- */
generateBtn.addEventListener('click', () => {
  const size = clampSize(parseInt(sizeInput.value, 10));
  sizeInput.value = String(size);
  generateGrid(size);
});

clearBtn.addEventListener('click', () => {
  document.querySelectorAll('.cell').forEach((cell) => {
    cell.style.backgroundColor = '';
  });
});

/* ---------- 6. Exportar como PNG ---------- */
downloadBtn.addEventListener('click', () => {
  const pixelSize = 20;
  const canvas = document.createElement('canvas');
  canvas.width = currentGridSize * pixelSize;
  canvas.height = currentGridSize * pixelSize;
  const ctx = canvas.getContext('2d');

  document.querySelectorAll('.cell').forEach((cell) => {
    const color = cell.style.backgroundColor;
    if (!color) return; // celda vacía = transparente en el PNG
    const row = parseInt(cell.dataset.row, 10);
    const col = parseInt(cell.dataset.col, 10);
    ctx.fillStyle = color;
    ctx.fillRect(col * pixelSize, row * pixelSize, pixelSize, pixelSize);
  });

  const link = document.createElement('a');
  link.download = 'pixel-art.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});

/* ---------- 7. Bonus: modo oscuro con tecla secreta ---------- */
// No hay ningún botón visible para esto a propósito: se activa solo
// pulsando la tecla "N" en cualquier momento, para trabajar de noche.
document.addEventListener('keydown', (event) => {
  if (event.key.toLowerCase() === 'n') {
    document.body.classList.toggle('dark-mode');
  }
});

/* ---------- 8. Inicialización ---------- */
generateGrid(currentGridSize);
