document.addEventListener('DOMContentLoaded', () => {
  const gridContainer = document.getElementById('juegoVida');
  let cells = [];
  let isPlaying = false;
  let intervalId;

  const numRows = 30;
  const numCols = 30;

  // Crea la cuadrícula
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.addEventListener('click', toggleCell);
      cell.addEventListener('contextmenu', clearCell);
      gridContainer.appendChild(cell);
      cells.push(cell);
    }
  }

  // Agregar el autómata por defecto (Glider) al inicio del juego
  setDefaultAutomata();

  // Alterna el estado de la celda al hacer clic izquierdo
  function toggleCell(event) {
    if (!isPlaying) {
      event.target.classList.toggle('active');
    } else {
      isPlaying = false;
      clearInterval(intervalId);
      document.getElementById('playButton').textContent = 'Play';
    }
  }

  // Borra el estado de la celda al hacer clic derecho
  function clearCell(event) {
    if (!isPlaying) {
      event.preventDefault();
      event.target.classList.remove('active');
    }
  }

  // Inicia el juego
  function startGame() {
    isPlaying = !isPlaying;

    if (isPlaying) {
      intervalId = setInterval(updateCells, 500);
      document.getElementById('playButton').textContent = 'Pause';
    } else {
      clearInterval(intervalId);
      document.getElementById('playButton').textContent = 'Play';
    }
  }

  // Función para agregar el autómata "Glider" al inicio del juego
  function setDefaultAutomata() {
    // Coordenadas del patrón Glider
    const gliderCoordinates = [
      [1, 0],
      [2, 1],
      [0, 2],
      [1, 2],
      [2, 2],
    ];

    // Recorre las coordenadas del Glider y activa las celdas correspondientes
    for (const [row, col] of gliderCoordinates) {
      const index = row * numCols + col;
      cells[index].classList.add('active');
    }
  }

  // Obtiene el estado de una celda en la posición dada
  function getCellState(row, col) {
    if (row < 0 || row >= numRows || col < 0 || col >= numCols) {
      return false;
    }
    const index = row * numCols + col;
    const cell = cells[index];
    return cell.classList.contains('active');
  }

  // Obtiene el número de vecinos activos de una celda en la posición dada
  function getActiveNeighbors(row, col) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        if (getCellState(row + i, col + j)) {
          count++;
        }
      }
    }
    return count;
  }

  // Actualiza el estado de las celdas
  function updateCells() {
    const newCellStates = [];
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const isActive = getCellState(row, col);
        const activeNeighbors = getActiveNeighbors(row, col);
        let newState = isActive;

        if (isActive && (activeNeighbors < 2 || activeNeighbors > 3)) {
          newState = false;
        } else if (!isActive && activeNeighbors === 3) {
          newState = true;
        }

        newCellStates.push(newState);
      }
    }

    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      const newState = newCellStates[i];

      if (newState) {
        cell.classList.add('active');
      } else {
        cell.classList.remove('active');
      }
    }
  }

  // Asigna el evento de clic al botón de reproducción
  const playButton = document.getElementById('playButton');
  playButton.addEventListener('click', startGame);

  // Función para limpiar el estado de todas las celdas
  function clearGrid() {
    for (let i = 0; i < cells.length; i++) {
      cells[i].classList.remove('active');
    }
  }

  // Evento de clic para el botón de reinicio
  const resetButton = document.getElementById('resetButton');
  resetButton.addEventListener('click', () => {
    clearInterval(intervalId);
    isPlaying = false;
    document.getElementById('playButton').textContent = 'Play';
    clearGrid();
  });

  // Evento de clic para las celdas durante la reproducción para evitar cambios en el estado
  gridContainer.addEventListener('click', (event) => {
    if (isPlaying) {
      event.stopPropagation();
    }
  });

  // Evento de clic derecho para las celdas durante la reproducción para evitar cambios en el estado
  gridContainer.addEventListener('contextmenu', (event) => {
    if (isPlaying) {
      event.preventDefault();
    }
  });

  // --- Mejoras para la sección de BLOG ---

  // Función global para alternar la visualización del texto del blog
  window.toggleBlogText = function(event) {
    event.preventDefault();
    const link = event.target;
    const parent = link.closest('.blog-item');
    const moreText = parent.querySelector('.blog-content-full');
    
    // Alternar la clase 'show' para activar la transición CSS
    const isShowing = moreText.classList.toggle('show');
    
    // Actualizar el texto del enlace
    link.textContent = isShowing ? 'Leer menos' : 'Leer más...';
  };
});