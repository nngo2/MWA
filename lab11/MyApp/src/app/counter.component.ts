import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <p>
    <button (click)="decrease()">-</button>
    {{counterValue}}
    <button (click)="increase()">+</button>
    </p>
  `,
  styles: [
    `button {min-width:30px; min-height:30px}`
  ]
})
export class CounterComponent implements OnInit {
  counterValue : number;
  @Output('counterChanged') counterChanged : EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
    //this.counterValue = 0;
  }

  @Input() 
  set counter(count : number) {
    this.counterValue = count;
  }

  increase() {
    this.counterValue++;
    this.counterChanged.emit(this.counterValue);
  }

  decrease() {
    this.counterValue--;
    this.counterChanged.emit(this.counterValue);
  }

}
