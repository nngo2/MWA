import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appUpper]'
})
export class UpperDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    console.dir(el.nativeElement); 
    // cannot change content here, it is dynamically bound via {{}}
  }

  ngAfterViewInit() {
    let text = this.el.nativeElement.innerText;
    console.dir("Text: " + text);
    this.renderer.setProperty(this.el.nativeElement, 'innerText', text.toUpperCase());
  }
}