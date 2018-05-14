import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Counter';
  componentCounterValue : number = 10;

  onCounterChanged(num : number) {
    console.log(num);
    this.componentCounterValue = num;
  }

}
