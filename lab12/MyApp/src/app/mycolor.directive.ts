import { Directive, ElementRef, Renderer2, Output, HostListener, EventEmitter} from '@angular/core';

@Directive({
  selector: '[appMycolor]'
})
export class MycolorDirective {
  @Output() currentColor : EventEmitter<string> = new EventEmitter();

  private rnd : number = 0;
  private colors : string[] = ['red', 'blue', 'green', 'gray'];

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('click')
  onClick(){
    this.rnd++;
    if (this.rnd > 3) {
      this.rnd = 0;
    }
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', this.colors[this.rnd]);
    this.currentColor.emit(this.colors[this.rnd]);
  }
}
