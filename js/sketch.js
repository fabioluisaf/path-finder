/**
 * Framerate of the program.
 */
const fr = 60;
/**
 * Delay in between iterations of the search. It is divided by the framerate so that it
 * waits less time the higher the framerate.
 */
const delay = 1000 / fr;
/**
 * Since walls are chosen randomly, this variable represents the probability of a node
 * being a wall.
 */
const wallProb = 0.3;
/**
 * Each node of the graph is a square; this variable represents the length of its side
 */
const size = 10;
/**
 * True if the algorithm should consider diagonal paths.
 */
const hasDiagonals = false;

/**
 * The collection of nodes. It is stored as a matrix where the node at grid[i][j] is at
 * (x,y) = (j * size, i * size)
 */
let grid;
/**
 * A collection of the nodes that will be checked later. Changing the actual data structure
 * will change the behaviour of the algorithm; using a Heap will make it a Dijkstra/A*,
 * depending on the heuristic used, using a Stack will make it a DFS.
 */
let openSet;
/**
 * True if the search is running, false if it concluded or hasn't started yet.
 */
let isRunning = false;
/**
 * True if the algorithm found a path from the start node to the end node.
 */
let found = false;

/**
 * Store the start and end nodes, respectively.
 */
let start, end;

let head = null;

/**
 * Initiates the program, creating a canvas and the grid of nodes that will fill all the
 * canvas space. It also sets the framerate using the previously mentioned variable.
 */
function setup() {
  createCanvas(700, 700);
  frameRate(fr);

  grid = createGrid(size);
}

/**
 * Main loop of the program, it continuously draws the canvas and the open set, as well as
 * the start and end nodes and the path between them, if it exists.
 */
function draw() {
  // the background color is different whether the program is or isn't considering diagonals
  let bgCol = hasDiagonals ? color(200, 200, 200) : 0;
  background(bgCol);

  showGrid(grid, hasDiagonals, color(200, 200, 200), color(255, 100, 100));
  showDataStructure(openSet, color(100, 255, 100));

  if (head) tracePath(head, hasDiagonals, color(0, 255, 255));

  if (end) tracePath(end, hasDiagonals, color(0, 255, 255));
  if (end) end.show(color(255, 0, 0));
  if (start) start.show(color(0, 0, 255));
}

/**
 * Creates a grid of nodes having side length of size.
 *
 * @param {number} size The length of the square, this will help the function determine the amount
 *                      of nodes in the grid.
 *
 * @returns {Node[][]} A matrix of nodes.
 */
function createGrid(size) {
  let grid = [];
  const amtX = width / size;
  const amtY = height / size;

  for (let y = 0; y < amtY; y++) {
    grid[y] = [];

    for (let x = 0; x < amtX; x++) {
      // creating a new node at (x*size, y*size)
      grid[y][x] = new Node(
        createVector(x * size, y * size),
        size,
        hasDiagonals
      );

      // top and left
      if (grid[y - 1]) {
        grid[y][x].addNeighbor(grid[y - 1][x]);
      }

      if (grid[y][x - 1]) {
        grid[y][x].addNeighbor(grid[y][x - 1]);
      }

      // top-left and top right diagonals
      if (hasDiagonals && grid[y - 1] && grid[y - 1][x - 1]) {
        grid[y][x].addNeighbor(grid[y - 1][x - 1]);
      }

      if (hasDiagonals && grid[y - 1] && grid[y - 1][x + 1]) {
        grid[y][x].addNeighbor(grid[y - 1][x + 1]);
      }

      // randomly sets a cell as being a wall i.e. non walkable
      if (Math.random() < wallProb) {
        grid[y][x].isWall = true;
      }
    }
  }

  return grid;
}

/**
 * Shows a matrix of nodes using the colors defined by the user.
 *
 * @see p5.Color
 *
 * @param {Node[][]} grid           The matrix of nodes to be shown.
 * @param {boolean}  hasDiagonals   If the program is considering diagonal paths.
 * @param {p5.Color} defaultColor   If hasDiagonals is false, this will be the color of the nodes
 *                                  that are not a wall.
 * @param {p5.Color} closedSetColor The color of the nodes that were already visited.
 */
function showGrid(grid, hasDiagonals, defaultColor, closedSetColor) {
  for (let line of grid) {
    for (let node of line) {
      if (!node.isWall && node.gcost !== Infinity) {
        // if the node has been visited, paint it using the closedSetColor
        node.show(closedSetColor);
      } else if (!node.isWall && !hasDiagonals) {
        // if a node is not a wall, and the diagonals are not being considered, paint it using the
        // defaultColor
        node.show(defaultColor);
      } else if (hasDiagonals && node.isWall) {
        // if the node is a wall, and the diagonals are being considered, paint it black
        node.show(0);
      }
    }
  }
}

/**
 * Paints all nodes within a data structure using the color defined by the user.
 *
 * @see p5.Color
 *
 * @param {*} dataStructure The data structure being used by the search algortighm.
 * @param {p5.Color} col           The color that will be used to paint the nodes inside that data
 *                          structure.
 */
function showDataStructure(dataStructure, col) {
  // if a null is given, do nothing and return
  if (!dataStructure) {
    return;
  }

  // show every node of that dataStructure's dataset.
  for (elem of dataStructure.dataset) {
    elem.show(col);
  }
}

/**
 * Traces a path starting from a node and going to its parent until it reahces a node that has
 * no parent.
 *
 * @see p5.Color
 *
 * @param {Node}     end
 * @param {boolean}  hasDiagonals
 * @param {p5.Color} col
 */
function tracePath(end, hasDiagonals, col) {
  if (!end) {
    // if the node is null, do nothing.
    return;
  } else if (!hasDiagonals) {
    // start from the node.
    let walker = end;

    // repeatedly go to the current node's parent.
    while (walker) {
      walker.show(col);
      walker = walker.parent;
    }
  } else {
    // if diagonal paths are being considered, then it should draw a line connecting the nodes,
    // rather than just coloring them.
    let walker = end;

    stroke(col);
    strokeWeight(4);
    noFill();

    beginShape();
    while (walker) {
      vertex(walker.pos.x + walker.size / 2, walker.pos.y + walker.size / 2);
      walker = walker.parent;
    }
    endShape();
  }
}

/**
 * Awaits a certain amount of time in milliseconds.
 *
 * @param {number} ms The amount of time that the program will stall for
 */
async function sleep(ms) {
  if (ms === 0) return;
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Resets all of the aplication's parameters, such as the start and end nodes, as well as all the
 * graph's properties, like the node's parent, it's costs and whether it was visited or not.
 *
 * @param {Node[][]} grid The reference to the graph.
 */
function reset(grid) {
  openSet = null;
  found = false;
  start = null;
  end = null;

  for (let line of grid) {
    for (let elem of line) {
      if (elem) {
        elem.parent = null;
        elem.gcost = Infinity;
        elem.hcost = Infinity;
        elem.visited = false;
      }
    }
  }
}

/**
 * Since search process is the same for all search algorithms and the only difference is the data
 * structure used, this function makes a generic call for the search function received as parameter.
 * It also displays whether the node was found or not, as well as the time taken to execute the
 * search.
 *
 * @param {function} searchFunction The search function that will be executed.
 */
function performSearch(searchFunction, openSet) {
  // only run if both start and end nodes were selected
  if (!start || !end) {
    console.log("Make sure to select both start and end nodes!");
    return;
  }

  isRunning = true;
  searchFunction(start, end, openSet, delay).then(result => {
    isRunning = false;

    if (result.found) {
      console.log("Found it!");
      console.log("Time taken: " + result.timeTaken);
      console.log(end);
    } else {
      console.log("No path.");
      console.log("Time taken: " + result.timeTaken);
    }
  });
}
