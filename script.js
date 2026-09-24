// Pixel Art Creator - David San Martin Mateos

// Estas constantes son todos los elemenot del DOM que vamos a usar en el script
const grid = document.querySelector('#grid');
const sizeInput = document.querySelector('#gridSize');
const generateBtn = document.querySelector('#generateBtn');
const colorPicker = document.querySelector('#colorPicker');
const eraserToggle = document.querySelector('#eraserToggle');
const clearBtn = document.querySelector('#clearBtn');
const downloadBtn = document.querySelector('#downloadBtn');

// Definimos los tam min y max
const MIN_SIZE = 2;
const MAX_SIZE = 64;

let currentColor = colorPicker.value;
let isDrawing = false;
let isErasing = false;
let currentGridSize = clampSize(parseInt(sizeInput.value, 10));

// Comprobamos que el tamaño introducido esté entre 2 y 64
function clampSize(value) {
  if (isNaN(value)) return 16;
  if (value < MIN_SIZE) return MIN_SIZE;
  if (value > MAX_SIZE) return MAX_SIZE;
  return value;
}

// Genera la cuadrícula de celdas según el tamaño elegido
function generateGrid(size) {
  currentGridSize = size;
  grid.style.setProperty('--grid-size', size);
  grid.innerHTML = '';

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.row = row;
      cell.dataset.col = col;
      grid.appendChild(cell);
    }
  }
}

// Pinta (o borra, si el borrador está activo) una celda
function paintCell(cell) {
  if (!cell || !cell.classList.contains('cell')) return;

  if (isErasing) {
    cell.style.backgroundColor = '';
  } else {
    cell.style.backgroundColor = currentColor;
  }
}

// Pintamos al hacer clic y mientras se arrastra el ratón con el botón pulsado
grid.addEventListener('mousedown', (event) => {
  isDrawing = true;
  paintCell(event.target);
});

grid.addEventListener('mouseover', (event) => {
  if (isDrawing) {
    paintCell(event.target);
  }
});

document.addEventListener('mouseup', () => {
  isDrawing = false;
});

// Evitamos que el navegador intente arrastrar las celdas como si fueran imágenes
grid.addEventListener('dragstart', (event) => event.preventDefault());

// Guardamos el color elegido por el usuario
colorPicker.addEventListener('input', (event) => {
  currentColor = event.target.value;
  isErasing = false;
  eraserToggle.setAttribute('false');
});
 
// Activamos / desactivamos el modo borrador
eraserToggle.addEventListener('click', () => {
  isErasing = !isErasing;
  eraserToggle.setAttribute('aria-pressed', isErasing);
});

// Genera una cuadrícula nueva con el tamaño del input
generateBtn.addEventListener('click', () => {
  const size = clampSize(parseInt(sizeInput.value, 10));
  sizeInput.value = size;
  generateGrid(size);
});

// Borra todo lo pintado sin cambiar el tam de la cuadricula
clearBtn.addEventListener('click', () => {
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => {
    cell.style.backgroundColor = '';
  });
});

// Descarga el dibujo actual como una imagen PNG
downloadBtn.addEventListener('click', () => {
  const pixelSize = 20;
  const canvas = document.createElement('canvas');
  canvas.width = currentGridSize * pixelSize;
  canvas.height = currentGridSize * pixelSize;
  const ctx = canvas.getContext('2d');

  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => {
    const color = cell.style.backgroundColor;
    if (color) {
      const row = parseInt(cell.dataset.row);
      const col = parseInt(cell.dataset.col);
      ctx.fillStyle = color;
      ctx.fillRect(col * pixelSize, row * pixelSize, pixelSize, pixelSize);
    }
  });

  const link = document.createElement('a');
  link.download = `pixel-art-${currentGridSize}x${currentGridSize}-${Date.now()}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
});

// Activacion del modo oscuro con la 'n'
document.addEventListener('keydown', (event) => {
  if (event.key.toLowerCase() === 'n') {
    document.body.classList.toggle('dark-mode');
  }
});

// Pintamos la cuadrícula inicial al cargar la página
generateGrid(currentGridSize);