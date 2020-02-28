/**
 * This function performs the basic principle of a search in a graph, get an element from the data
 * structure, analise it, add its neighbors (if any) to the data structure, rinse and repeat.
 *  
 * 
 * @param {Node} start                 Node from which the search starts.
 * 
 * @param {Node} end                   Node at which the search ends.
 * 
 * @param {*} openSet                  This data structure determines which type of search will be
 *                                     performed, a stack corresponds to the DFS and a heap may
 *                                     correspond to the dijkstra or the a* search, depending on
 *                                     the heap's parameters.
 * 
 * @param {Function} heuristicFunction The function that estimates the distance to the end node.
 * 
 * @param {number} delay               How many millisecs will the funtion wait before going to
 *                                     the next iteration, helps visualizing the search.
 * 
 * 
 * @returns True if the end node has been found, or false otherwise
 */
async function search(start, end, openSet, heuristicFunction, delay) {
  // setting the gcost of the first node as zero
  start.gcost = 0;
  // calculating the hcost of the first node
  start.hcost = heuristicFunction(start, end);

  // adding the first node to the openSet
  openSet.add(start);

  // while the openSet has something on it, the search is not over
  while (openSet.size() > 0) {
    // getting an element from the set depending on the set's rule
    let min = openSet.pop();
    // marking it as visited, so that it don't get re-added to the set
    min.visited = true;
    // filtering the neighbors, to get only those that we're interested in
    let minNeighbors = filteredNeighbors(min);
    head = min;
    // iterate through all it's neighbors
    for (let i = 0; i < minNeighbors.length; i++) {
      let neighbor = minNeighbors[i];

      // if it isn't in the open set, put it in
      if (!openSet.includes(neighbor)) {
        openSet.add(neighbor);
      }

      // update its gcost and hcost value if necessary
      updateNode(openSet, heuristicFunction, neighbor, min, end);

      // if it is the end node, finish the search
      if (neighbor === end) {
        return true;
      }
    }

    // pause for the amt of time provided by the caller
    await sleep(delay);
  }

  // if the end node was not found, return false
  return false;
}

/**
 * Creates a new array of nodes from the neighbors of the node, containing only those that are not
 * walls, were not visited and whose gcost is greater than the current node's + 1
 * 
 * @param {Node} node The node whose neighbors will be filtered.
 * 
 * @returns {Array} The filtered list of neighbors
 */
function filteredNeighbors(node) {
  let filtered = [];

  for (let neighbor of node.neighbors) {
    if (!neighbor.isWall && !neighbor.visited && neighbor.gcost >= node.gcost + 1) {
      filtered.push(neighbor);
    }
  }

  return filtered;
}

/**
 * Updates a node gcost, hcost and parent if necessary.
 * 
 * @param {*} openSet           The data structure being used to define the search process.
 * 
 * @param {*} heuristicFunction The function that calculates the hcost of a node.
 * 
 * @param {*} node              The node that will possibly get its values changed.
 * 
 * @param {*} newParent         The node that will possibly be the new parent.
 * 
 * @param {*} end               The end node of the search, used to calculate the hcost.
 */
function updateNode(openSet, heuristicFunction, node, newParent, end) {
  if (node.hcost === Infinity) {
    node.hcost = heuristicFunction(node, end);
  }

  openSet.updatePriority(node, newParent);
}
