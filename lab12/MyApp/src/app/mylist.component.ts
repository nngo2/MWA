import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mylist',
  template: `
    <ul>
      <li *ngFor="let i of list" appUpper>{{i}}</li>
    </ul>
  `,
  styles: []
})
export class MylistComponent implements OnInit {
  @Input() list : string[];

  constructor() { }

  ngOnInit() {
  }
}
