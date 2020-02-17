

async function search(start, end, openSet, heuristicFunction, delay) {
  start.gcost = 0;
  start.hcost = heuristicFunction(start, end);

  openSet.add(start);

  while (openSet.size() > 0) {
    let min = openSet.pop();
    min.visited = true;
    let minNeighbors = filteredNeighbors(min);

    for (let i = 0; i < minNeighbors.length; i++) {
      let neighbor = minNeighbors[i];

      if (!openSet.includes(neighbor)) {
        openSet.add(neighbor);
      }

      updateNode(openSet, heuristicFunction, neighbor, min, end);

      if (neighbor === end) {
        return true;
      }
    }

    await sleep(delay);
  }

  return false;
}

function filteredNeighbors(node) {
  let filtered = [];

  for (let neighbor of node.neighbors) {
    if (!neighbor.isWall && !neighbor.visited && neighbor.gcost >= node.gcost + 1) {
      filtered.push(neighbor);
    }
  }

  return filtered;
}

function updateNode(openSet, heuristicFunction, node, newParent, end) {
  if (node.hcost === Infinity) {
    node.hcost = heuristicFunction(node, end);
  }

  openSet.updatePriority(node, newParent);
}
