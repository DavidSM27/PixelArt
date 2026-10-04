// Pixel Art Creator - David San Martin Mateos

// Estas constantes son todos los elemenot del DOM que vamos a usar en el script
const grid = document.querySelector('#grid'); //El div contennedor donde se crean las celdas
const sizeInput = document.querySelector('#gridSize'); //Es el input donde el usuario introduce el tam de la cuadricula
const generateBtn = document.querySelector('#generateBtn'); //Boton que desencadena la generacion de la cuadricula
const colorPicker = document.querySelector('#colorPicker'); //Input de tipo de color que se quiere pintar
const eraserToggle = document.querySelector('#eraserToggle'); //Boton que activa o desactiva el modo borrador
const clearBtn = document.querySelector('#clearBtn'); //Boton que borra todo lo pintado sin cambiar el tam de la cuadricula
const downloadBtn = document.querySelector('#downloadBtn'); //Boton que descarga el png

// Definimos los tam min y max
const MIN_SIZE = 2;
const MAX_SIZE = 64;

let currentColor = colorPicker.value;
let isDrawing = false; //Mientras el boton del raton esta pulsado sobre alguna celda del grid se pinta
let isErasing = false; //Mientras el boton del raton esta pulsado sobre alguna celda del grid se borra
let currentGridSize = clampSize(parseInt(sizeInput.value, 10)); //El tam actual de la cuadricula necesario para descargar la imagen 

// Comprobamos que el tamaño introducido esté entre 2 y 64
function clampSize(value) {
  if (isNaN(value)) return 16;
  if (value < MIN_SIZE) return MIN_SIZE;
  if (value > MAX_SIZE) return MAX_SIZE;
  return value;
}

// Genera la cuadrícula de celdas según el tamaño pasado como argumento.
function generateGrid(size) {
  currentGridSize = size;
  grid.style.setProperty('--grid-size', size); // Actualizamos la variable CSS --grid-size para que el grid se dibuje bien
  grid.innerHTML = ''; // Con esto limpiamos el grid antes de generar uno nuevo

  // Doble bucle for para crear la matriz de celdas.
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const cell = document.createElement('div'); // Creamos un div por celda
      cell.className = 'cell'; 
      cell.dataset.row = row;
      cell.dataset.col = col;
      grid.appendChild(cell); // Lo insertamos en el grid
    }
  }
}

// Pinta (o borra, si el borrador está activo) una celda
function paintCell(cell) {
  if (!cell || !cell.classList.contains('cell')) return; // Si no  es una celda o no existe, salimos de la funcion

  if (isErasing) {
    cell.style.backgroundColor = ''; // Borramos el color de la celda
  } else {
    cell.style.backgroundColor = currentColor; // Pintamos la celda con el color actual
  }
}

// Pintamos al hacer clic y mientras se arrastra el ratón con el botón pulsado
grid.addEventListener('mousedown', (event) => {
  isDrawing = true; // Activamos el modo dibujo
  paintCell(event.target); // Pintamos la celda donde se hizo el clic
});

// Comprobamos que el raton esta sobre una celda y que el boton esta pulsado para pintar mientras se arrastra el raton
grid.addEventListener('mouseover', (event) => {
  if (isDrawing) {
    paintCell(event.target);
  }
});

// Desactivamos el modo dibujo cuando se suelta el boton del raton
document.addEventListener('mouseup', () => {
  isDrawing = false;
});

// Guardamos el color elegido por el usuario
colorPicker.addEventListener('input', (event) => {
  currentColor = event.target.value;
  isErasing = false; // Si elegimos un color nuevo se desactiva automaticamente el modo de borrado
  eraserToggle.setAttribute('aria-pressed','false');
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
  const cells = document.querySelectorAll('.cell'); // devuelve una NodeList con todas las coincidencias
  cells.forEach((cell) => {
    cell.style.backgroundColor = ''; // Borra el color de todas las celdas
  });
});

// Descarga el dibujo actual como una imagen PNG
downloadBtn.addEventListener('click', () => {
  const pixelSize = 20; // Cada celda es un cuadrado de 20x20 px
  const canvas = document.createElement('canvas');
  canvas.width = currentGridSize * pixelSize;
  canvas.height = currentGridSize * pixelSize;
  const ctx = canvas.getContext('2d'); // Devuelve el objeto con el que se dibuja

  const cells = document.querySelectorAll('.cell'); // Devuelve una lista de nodos con todas las celdas existentes
  cells.forEach((cell) => {
    const color = cell.style.backgroundColor;
    if (color) { // Si la celda no esta pintada se ignora
      const row = parseInt(cell.dataset.row);
      const col = parseInt(cell.dataset.col);
      ctx.fillStyle = color;
      ctx.fillRect(col * pixelSize, row * pixelSize, pixelSize, pixelSize); //Dibuja un rectangulo con el color seleccionado en cada celda
    }
  });

  const link = document.createElement('a');
  link.download = `pixel-art-${currentGridSize}x${currentGridSize}-${Date.now()}.png`; //Descarga la imagen con un nombre unico cada vez
  link.href = canvas.toDataURL('image/png');
  link.click();// Simula el clic en un enlace invisible pero sin la etiqueta <a> en html
});

// Activacion del modo oscuro con la 'n'
document.addEventListener('keydown', (event) => {
  if (event.key.toLowerCase() === 'n') { // Comprobamos si la tecla es la 'n'
    document.body.classList.toggle('dark-mode');
  }
});

// Pintamos la cuadrícula inicial al cargar la página
generateGrid(currentGridSize);