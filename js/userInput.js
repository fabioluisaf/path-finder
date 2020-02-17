/**
 * Performs an action on a node, according to what key is being pressed down by the user.
 */
function mousePressed() {
  // do nothing if the search is running
  if (isRunning) return;

  // get the (x, y) position of the click
  let x = Math.floor(mouseX / size);
  let y = Math.floor(mouseY / size);

  // if it is outside the canvas, do nothing and return
  if (!grid[y] || !grid[y][x]) return;

  if (keyIsDown(83) && !grid[y][x].isWall) {
    // if the 's' key is being pressed, make it the starting node
    start = grid[y][x];
  } else if (keyIsDown(69) && !grid[y][x].isWall) {
    // if the 'e' key is being pressed, make it the end node
    end = grid[y][x];
  } else if (keyIsDown(87)) {
    // if the 'w' key is being pressed, make the node a wall if it isn't already, otherwise make
    // it not a wall
    grid[y][x].isWall = !grid[y][x].isWall;
  } else {
    // if no key is being pressed, simply print it in the console
    console.log(grid[y][x]);
  }
}

/**
 * Performs an action depending on which key is pressed.
 */
function keyPressed() {
  if (isRunning) return;

  switch (keyCode) {
    case 65:
      // if the 'a' key is pressed, start the a* search
      openSet = new Heap();
      performSearch(aStar, openSet);
      break;
    case 68:
      // if the 'd' key is pressed, start the dijkstra search
      openSet = new Heap();
      performSearch(dijkstra, openSet);
      break;
    case 80:
      // if the 'p' key is pressed, start the DFS
      openSet = new Stack();
      performSearch(dfs, openSet);
      break;
    case 82:
      // if the 'r' key is pressed, resset the whole grid.
      reset(grid);
      break;
    default:
      break;
  }
}
