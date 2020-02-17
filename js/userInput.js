function mousePressed() {
  if (isRunning) return;

  let x = Math.floor(mouseX / size);
  let y = Math.floor(mouseY / size);

  if (!grid[y] || !grid[y][x]) return;

  if (keyIsDown(83) && !grid[y][x].isWall) {
    start = grid[y][x];
  } else if (keyIsDown(69) && !grid[y][x].isWall) {
    end = grid[y][x];
  } else if (keyIsDown(87)) {
    grid[y][x].isWall = !grid[y][x].isWall;
  } else {
    console.log(grid[y][x]);
  }
}

function keyPressed() {
  if (isRunning) return;

  switch (keyCode) {
    case 65:
      openSet = new Heap();
      performSearch(aStar);
      break;
    case 68:
      openSet = new Heap();
      performSearch(dijkstra);
      break;
    case 80:
      openSet = new Stack();
      performSearch(dfs);
      break;
    case 82:
      reset(grid);
      break;
    default:
      break;
  }
}
