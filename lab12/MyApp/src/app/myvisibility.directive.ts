import { Directive, Input, ElementRef, Renderer2, OnInit, HostListener} from '@angular/core';

@Directive({
  selector: '[appMyvisibility]'
})
export class MyvisibilityDirective {
  @Input('visibility') visibility : string;

  constructor(private el: ElementRef, private renderer: Renderer2) { 
    // cannot check input here use ngOnInit instead
  }

  ngOnInit() {
    console.dir(this.visibility);
    if (this.visibility == "false") {
      this.renderer.setStyle(this.el.nativeElement, 'visibility', 'hidden');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'visibility', 'visible');
    }
  }

  @HostListener('click')
  onClick(){
    this.toggleVisibility();
  }

  toggleVisibility() {
    if (this.visibility == "false") {
      this.visibility = "true";
      this.renderer.setStyle(this.el.nativeElement, 'visibility', 'visible');
    } else {
      this.visibility = "false";
      this.renderer.setStyle(this.el.nativeElement, 'visibility', 'hidden');
    }
  }
}
