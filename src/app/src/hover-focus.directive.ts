import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHoverFocus]'
})
export class HoverFocusDirective {

  @HostBinding("style.background-color") backgroundColor: string;
  @HostListener("mouseover") onmouseover() {
    this.backgroundColor = "blue";
  }

  @HostListener("mouseout") onMouseOut() {
    this.backgroundColor = "inherit";
  }

  constructor() { }

}
