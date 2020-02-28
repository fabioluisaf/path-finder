/**
 * This is only a wrapper class for the regular array of javascript, since all the funtions neede
 * for a stack are natively implemented for the JS array. However, since it is used as a data
 * structure for our search algorithms, one aditional function is needed and some need to be
 * renamed.
 * 
 * @file This file defines the Stack class.
 * @author Fabio Luis
 */

class Stack {
  /**
   * Constructs a stack the updates the nodes using the update function received as parameter.
   * 
   * @param {function} update The function that the structured will use to update the properties
   * of an element. It can be left as null/undefined, if such funcitonality is not going to be
   * used.
   */
  constructor(update) {
    this.dataset = [];
    this.update = update;
  }

  /**
   * Adds an element to the stack.
   * 
   * @param {*} data The element that will be added.
   */
  add(data) {
    this.dataset.push(data);
  }

  /**
   * Removes an element from the stack and returns it.
   * 
   * @returns {*} The element removed.
   */
  pop() {
    return this.dataset.pop();
  }

  /**
   * Returns the amount of elements stored in the stack.
   * 
   * @returns {number} The size of the stack.
   */
  size() {
    return this.dataset.length;
  }

  /**
   * Check if the element is being stored by the stack.
   * 
   * @param {*} elem The element that will be looked for in the stack.
   * 
   * @returns {boolean} True if the element is on the stack, false otherwise.
   */
  includes(elem) {
    return this.dataset.includes(elem);
  }

  /**
   * Updates the priority of an element. This function is here because this data structure needs
   * to be compatible with the Heap, since they are both being used by search algorithms. Also, it
   * makes the Stack work in a bizarre way compared to a normal implementation; this is important
   * because when this function is called, it means that elem's parent was changed, meaning that it
   * should be at the top of the Stack to garantee that this implementation of the DFS will work in
   * the same way as the more common implementation.
   * 
   * @param {*} elem The element whose priority will be updated.
   * @param {*} newPriority Some data that the new priority will be based on.
   */
  updatePriority(elem, newPriority) {
    const indexElem = this.dataset.indexOf(elem);

    if (indexElem !== -1) {
      let element = this.update(elem, newPriority);

      this.dataset.splice(indexElem, 1);
      this.add(element);
    }
  }
}