import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  sampleList : string[] = ['Apple', 'Orrange', 'Peach']; 

  visibility : boolean = true;

  selectedColor : string;

  colorSelected(color: string) {
    this.selectedColor = color;
  }
}
