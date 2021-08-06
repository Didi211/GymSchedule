import { LinkedNode } from "./LinkedNode.js";

export class CircularDLL {
  constructor() {
    this.head = null;
    this.tail = null;
    this.lenght = 0;
  }
  push(value) {
    const node = new LinkedNode(value);
    if (this.head == this.tail && this.head == null) {
      //prazna lista
      this.head = node;
      this.tail = node;
      node.next = node;
      node.prev = node;
      this.lenght = 1;
    } else if (this.lenght == 1) {
      //ima prvi cvor
      this.head.next = node;
      this.tail = node;

      this.head.prev = this.tail;
      this.tail.next = this.head;
      this.tail.prev = this.head;

      this.lenght++;
      // node.prev = this.head; ovo mi ne trebba
      // node.next = this.head;
    } else {
      //ima vise cvora, dodavanje na kraj liste
      node.prev = this.tail;
      this.tail.next = node; //povezan skroz

      this.tail = node;
      this.tail.next = this.head;
      this.head.prev = this.tail;

      this.lenght++;
    }
  }
  pushArray(niz) {
    niz.forEach((el) => {
      this.push(el);
    });
  }
  getHead(newHead) {
    if (newHead == "") {
      return this.head;
    }

    let oldHead = this.head;

    if (newHead == "prev") {
      this.head = this.head.prev;
    } else if (newHead == "next") {
      this.head = this.head.next;
    }

    return oldHead;
  }
}
