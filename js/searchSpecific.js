/**
 * Estimates the distance between the current node and the end node of the search using the
 * manhattan heuristic, whitch was, in my tests, the most effective for this scenario.
 * 
 * @param {Node} node The node whose fcost we wish to calculate.
 * 
 * @param {Node} goal The end node of the search.
 */
function heuristic(node, goal) {
  let d1 = Math.abs(node.pos.x - goal.pos.x);
  let d2 = Math.abs(node.pos.y - goal.pos.y);

  // here we divide by the size of the node, so that the hcost is given in nodes-distance
  // not doing so would result in it being given in pixels.
  if (hasDiagonals) return Math.max(d1, d2) / size;
  else return (d1 + d2) / size;
}

/**
 * Changes a node's parent, as well as it's gcost.
 * 
 * @param {Node} node      The node whose parent will be changed.
 * 
 * @param {Node} newParent The new parant to the node mentioned above.
 * 
 * 
 * @returns {Node} The node whose parent was changed.
 */
function setParent(node, newParent) {
  // if newParent is null, do nothing
  if (newParent) {
    node.parent = newParent;
    node.gcost = newParent.gcost + 1;
  }

  return node;
}

/**
 * This function will call the general search funtion with the correct parameters so that it
 * performs the A* search on the grid.
 * 
 * @param {*} start     The starting node of the search.
 * 
 * @param {*} end       The end node of the search.
 * 
 * @param {*} openSet   A heap that prioritizes nodes with the smallest fcost.
 * 
 * @param {*} sleepTime The amt of time in milliseconds that the algorithm will stop after each
 *                      iteration of the search. This slows down the process to make it easier for
 *                      us to see it happen.
 * 
 * 
 * @returns {Object} The result of the search. It consists of a boolean value representing whether
 *                   the search was successful of not, and the time (in seconds) taken to run the
 *                   search.
 */
async function aStar(start, end, openSet, sleepTime) {
  // setting the correct priority function of the heap
  // since the heap is always a max heap, the scores are inverted so that the smaller fcosts get
  // greater priority
  openSet.priorityOf = a => a.fcost() * -1;
  // setting the correct update function for the heap
  openSet.update = setParent;

  // marking the starting time of the search
  const startTime = millis();
  // doing the actual search
  const searchRes = await search(start, end, openSet, heuristic, sleepTime);
  // marking the end time of the search
  const endTime = millis();

  // creating the result object
  let result = {
    found: searchRes, // whether or not the search was successful
    timeTaken: (endTime - startTime) / 1000 // time taken to do it
  };

  return result;
}

/**
 * 
 * @param {Node} start       The starting node of the search.
 * 
 * @param {Node} end         The end node of the search.
 * 
 * @param {*} openSet        A heap that prioritizes elements with the smallest gcost.
 * 
 * @param {number} sleepTime The amt of time in milliseconds that the algorithm will stop after each
 *                           iteration of the search. This slows down the process to make it easier for
 *                           us to see it happen.
 * 
 * 
 * @returns {Object} The result of the search. It consists of a boolean value representing whether
 *                   the search was successful of not, and the time (in seconds) taken to run the
 *                   search.
 */
async function dijkstra(start, end, openSet, sleepTime) {
  // setting the data structure so that it gives higher priority to smaller fcosts
  openSet.priorityOf = a => a.fcost() * -1;
  // setting the update function of the heap
  openSet.update = setParent;

  // marking the time before the search has started
  const startTime = millis();
  // doing the actual search
  const searchRes = await search(start, end, openSet, a => 0, sleepTime);
  // marking the time after the search has ended
  const endTime = millis();

  // creating the result object
  let result = {
    found: searchRes, // whether or not the search was successful
    timeTaken: (endTime - startTime) / 1000 // how long did it take to run
  };

  return result;
}

/**
 * 
 * @param {Node} start       The starting node of the search.
 * 
 * @param {Node} end         The end node of the search.
 * 
 * @param {*} openSet        A simple stack.
 * 
 * @param {number} sleepTime The amt of time in milliseconds that the algorithm will stop after each
 *                           iteration of the search. This slows down the process to make it easier for
 *                           us to see it happen.
 * 
 * 
 * @returns {Object} The result of the search. It consists of a boolean value representing whether
 *                   the search was successful of not, and the time (in seconds) taken to run the
 *                   search.
 */
async function dfs(start, end, openSet, sleepTime) {
  // setting up the stack's update function, here since the elements on a stack never change their
  // order, the priority function only updates the nodes parent for visualization purposes and the
  // node's gcost, so that we know how far did it walk to get to a node.
  openSet.update = setParent;

  // marking the time before the search has started
  const startTime = millis();
  // doing the actual search
  const searchRes = await search(start, end, openSet, a => 0, sleepTime);
  // marking the time after the search has ended
  const endTime = millis();

  // creating the result object
  let result = {
    found: searchRes, // whether it reached the end or not
    timeTaken: (endTime - startTime) / 1000 // how long did it take to run
  };

  return result;
}