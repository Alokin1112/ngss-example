import { AfterViewInit, Directive, effect, ElementRef, Injector, input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[dsFocusable]',
  standalone: true,
})
export class FocusableDirective implements OnInit {

  dsFocusable = input.required<boolean>();

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private injector: Injector,
  ) { }

  ngOnInit(): void {
    effect(() => {
      if (this.dsFocusable()) {
        this.renderer.setStyle(this.elementRef.nativeElement, 'stroke', 'blue');
        this.renderer.setStyle(this.elementRef.nativeElement, 'stroke-width', '2px');
      }
      else {
        this.renderer.setStyle(this.elementRef.nativeElement, 'stroke', 'none');
        this.renderer.setStyle(this.elementRef.nativeElement, 'stroke-width', '0px');
      }
    }, { injector: this.injector });
  }
}
