import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-page',
  template: `
    <p>
      Invalid student Id
    </p>
  `,
  styles: []
})
export class ErrorPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
