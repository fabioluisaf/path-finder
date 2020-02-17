// here we divide by the size bcs otherwise the hscore 
// and the gscore would be in different units
function heuristic(node, goal) {
  let d1 = Math.abs(node.pos.x - goal.pos.x);
  let d2 = Math.abs(node.pos.y - goal.pos.y);

  if (hasDiagonals) return Math.max(d1, d2) / size;
  else return (d1 + d2) / size;
}

function setParent(node, newParent) {
  if (newParent) {
    node.parent = newParent;
    node.gcost = newParent.gcost + 1;
  }

  return node;
}

async function aStar(start, end, openSet, sleepTime) {
  openSet.priorityOf = a => a.fcost() * -1;
  openSet.update = setParent;

  const startTime = millis();
  const searchRes = await search(start, end, openSet, heuristic, sleepTime);
  const endTime = millis();

  let result = {
    found: searchRes,
    timeTaken: (endTime - startTime) / 1000
  };

  return result;
}

async function dijkstra(start, end, openSet, sleepTime) {
  openSet.priorityOf = a => a.fcost() * -1;
  openSet.update = setParent;

  const startTime = millis();
  const searchRes = await search(start, end, openSet, a => 0, sleepTime);
  const endTime = millis();

  let result = {
    found: searchRes,
    timeTaken: (endTime - startTime) / 1000
  };

  return result;
}

async function dfs(start, end, openSet, sleepTime) {
  openSet.priorityOf = a => a.fcost() * -1;
  openSet.update = setParent;

  const startTime = millis();
  const searchRes = await search(start, end, openSet, a => 0, sleepTime);
  const endTime = millis();

  let result = {
    found: searchRes,
    timeTaken: (endTime - startTime) / 1000
  };

  return result;
}