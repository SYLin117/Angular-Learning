import { Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2, Input } from "@angular/core";

@Directive({
  selector: '[appBetterHighlight]'
})
// Example of custom directive
// REMEMBER!! import to app module
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor: string = 'transparent';
  // using alias same as selector could omit appBetterHighlight property on <p>
  @Input('appBetterHighlight') highlightColor: string = 'blue';
  @HostBinding('style.backgroundColor') backgroundColor: string = 'transparent'
  constructor(private elRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    // this.elementRef.nativeElement.style.backgroundColor = 'green'
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue')

    this.backgroundColor = this.defaultColor
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue')
    this.backgroundColor = this.highlightColor
  }
  @HostListener('mouseleave') mouseleave(eventData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent')
    this.backgroundColor = this.defaultColor
  }
}
