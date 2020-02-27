/**
 * Class of a heap. It works by using the priority function and update priority function
 * given by the user. It can be used to store Objects and basic data types.
 *
 * @file This file defines the Heap class.
 * @author Fabio Luis
 */

class Heap {
  /**
   * Constructs a max heap that knows how to get the priority of an element and how to
   * change the priority of a given element via the functions it receives as parameters.
   *
   * @param {function} priorityFunc The priority function that should be used by the heap. This
   *                                is a max heap, but it can trivially be used as a min heap by
   *                                multiplying the element's
   *                                priority by -1. It should receive an element and return what
   *                                that element's priority is.
   *
   * @param {function} updateFunc   The function used to change the priority of a certain element.
   *                                This function should receive an element and some data that will
   *                                be used to update it's priority to the new one. It is important
   *                                that the function returns the element with the updated priority.
   */
  constructor(priorityFunc, updateFunc) {
    this.dataset = [];
    this.priorityOf = priorityFunc;
    this.update = updateFunc;
  }

  /**
   * Pushes the element index downwards until it reaches its correct position on the heap.
   *
   * @access private
   *
   * @param {number} index The index of the element that should be pushed down.
   */
  heapify(index) {
    // start by selecting its left and right children, as well as supposing that the current
    // has the biggest priority of them.
    let left = index * 2 + 1;
    let right = index * 2 + 2;
    let top = index;

    // compare the element with its two children to find the biggest.
    if (
      left < this.dataset.length &&
      this.priorityOf(this.dataset[left]) > this.priorityOf(this.dataset[top])
    ) {
      top = left;
    }
    if (
      right < this.dataset.length &&
      this.priorityOf(this.dataset[right]) > this.priorityOf(this.dataset[top])
    ) {
      top = right;
    }

    // if the element at index doesn't have the biggest priority, swap it with the one that does.
    if (index !== top) {
      this.swap(index, top);
      this.heapify(top);
    }
  }

  /**
   * Pushes the element at index upwards in the heap, util it reaches its correct position.
   *
   * @access private
   *
   * @param {number} index The index of the element that should be pushed up.
   */
  heapifyUp(index) {
    // if we are at the top of the heap, stop the function
    if (index <= 0) return;

    // select the parent of the element
    let parent = index % 2 === 0 ? (index - 2) / 2 : (index - 1) / 2;

    // push it upwards, if it has greater priority than its parent
    if (
      this.priorityOf(this.dataset[index]) >
      this.priorityOf(this.dataset[parent])
    ) {
      this.swap(parent, index);
      this.heapifyUp(parent);
    }
  }

  /**
   * Swaps the elements on index1 and index2.
   *
   * @access private
   *
   * @param {number} index1 The index of the first element to be swaped
   * @param {number} index2 The index of the second element to be swaped
   */
  swap(index1, index2) {
    let temp = this.dataset[index1];
    this.dataset[index1] = this.dataset[index2];
    this.dataset[index2] = temp;
  }

  /**
   * Adds data to the heap, keeping it organized.
   *
   * @access public
   *
   * @param {*} data The data that will be added to the heap.
   */
  add(data) {
    // add it to the end and try to push it up.
    this.dataset.push(data);
    this.heapifyUp(this.dataset.length - 1);
  }

  /**
   * Removes the element with highest priority from the heap, keeping it organized.
   *
   * @access public
   *
   * @returns {*} The element removed from the heap.
   */
  pop() {
    // swap the first (highest priority) with the last and push it downwards the heap.
    this.swap(0, this.dataset.length - 1);
    const elem = this.dataset.pop();
    this.heapify(0);

    return elem;
  }

  /**
   * Returns the amount of items in the heap.
   *
   * @access public
   *
   * @returns {number} The amount of elements in the Heap.
   */
  size() {
    return this.dataset.length;
  }

  /**
   * Checks if an element is already on the Heap.
   *
   * @access public
   *
   * @param {*} elem The element that will be looked for by the function.
   *
   * @returns {boolean} True if the element is on the Heap, false otherwise.
   */
  includes(elem) {
    return this.dataset.includes(elem);
  }

  /**
   * Changes the priority of elem based on newPriority, doing the necessary changes to keep the
   * Heap organized.
   *
   * @access public
   *
   * @param {*} elem        The element whose priority will be changed.
   * @param {*} newPriority The new priority of said element.
   */
  updatePriority(elem, newPriority) {
    // find the index of the element
    let elemIndex = this.dataset.indexOf(elem);

    // if it is already in the heap, and its old priority is not equal to the new one
    if (elemIndex !== -1 && this.priorityOf(elem) !== newPriority) {
      // select its old priority
      let oldPriority = this.priorityOf(elem);

      // change the priority of the element, here we see why it is important that the updateFunc
      // returns the changed element element
      this.dataset[elemIndex] = this.update(elem, newPriority);
      let currPriority = this.priorityOf(elem);

      // reorganize the heap properly
      if (currPriority > oldPriority) {
        this.heapifyUp(elemIndex);
      } else {
        this.heapify(elemIndex);
      }
    }
  }
}
