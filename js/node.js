/**
 * Class that defines a node from a graph. It's properties are those needed by the search
 * algorithms to run, such as its parent, gcost(the distance from the starting node) and hcost
 * (an estimate of the cost). This node is meant to be used in graphs representing a map, so the
 * data within it is only a (x,y) coordinate.
 * 
 * @file This file defines the Node from a graph.
 * @author Fabio Luis
 */

class Node {
  /**
   * 
   * @param {p5Vector} pos      A vector representing the nodes position.
   * @param {number}   size     The size that the node should be drawn.
   * @param {boolean}  hasDiags True if the all the adjacent nodes should be considered neighbors,
   *                            false if only the cardinal (to the north, south, ...) nodes should
   *                            be considered neighbors.
   */
  constructor(pos, size, hasDiags) {
    /**
     * The (x, y) position of the node, represented using a p5Vector.
     */
    this.pos = pos;
    /**
     * The size (in pixels) of a node.
     */
    this.size = size;
    /**
     * The list of neighbors of a node.
     */
    this.neighbors = [];
    /**
     * The parent of a node, that is, in a path, the node privious to this node.
     */
    this.parent = null;
    /**
     * The distance travelled so far to get to this node.
     */
    this.gcost = Infinity;
    /**
     * The estimated distance to get to the end node.
     */
    this.hcost = Infinity;
    /**
     * Whether a node has been visited by the search algorithm or not.
     */
    this.visited = false;
    /**
     * true if this node is considered a wall and the search should ignore it.
     */
    this.isWall = false;
    /**
     * Whether the nodes on it's diagonals are considered neighbors or not.
     */
    this.hasDiagonals = hasDiags;
  }

  /**
   * 
   * @param {p5.color} c A p5 color object that will be used to draw the node
   */
  show(c) {
    noStroke();
    fill(c);

    // draw it as a circle if it has diagonal neighbors, or draw it as a square otherwise
    if (this.hasDiagonals) {
      ellipse(this.pos.x + this.size / 2, this.pos.y + this.size / 2, this.size, this.size)
    } else {
      rect(this.pos.x, this.pos.y, this.size, this.size);
    }
  }

  /**
   * Calculates the fcost of a node, that is, the estimated distance to the end node plus the
   * distance travelled so far.
   * 
   * @returns {number} The fcost of the current node.
   */
  fcost() {
    return this.gcost + this.hcost;
  }

  /**
   * Adds each node to the list of neighbors of the other node.
   * 
   * @param {Node} node2 The node that will be added as a neighbor of the current node.
   */
  addNeighbor(node2) {
    this.neighbors.push(node2);
    node2.neighbors.push(this);
  }
}
