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
    this.pos = pos;
    this.size = size;
    this.neighbors = [];
    this.parent = null;
    this.gcost = Infinity;
    this.hcost = Infinity;
    this.visited = false;
    this.isWall = false;
    this.hasDiagonals = hasDiags;
  }

  show(c) {
    noStroke();
    fill(c);

    if (this.hasDiagonals) {
      ellipse(this.pos.x + this.size / 2, this.pos.y + this.size / 2, this.size, this.size)
    } else {
      rect(this.pos.x, this.pos.y, this.size, this.size);
    }
  }

  fcost() {
    return this.gcost + this.hcost;
  }

  addNeighbor(other) {
    this.neighbors.push(other);
    other.neighbors.push(this);
  }
}
