import { ComponentRef, Directive, ElementRef, HostListener, Input } from '@angular/core';
import {
  OverlayRef,
  Overlay,
  OverlayPositionBuilder,
  ConnectionPositionPair,
} from '@angular/cdk/overlay';
import { TooltipOverlayComponent } from './tooltip-overlay.component';
import { ComponentPortal } from '@angular/cdk/portal';

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective {

  @Input('appTooltip') text = '';

  private overlayRef: OverlayRef;
  private tooltipRef: ComponentRef<TooltipOverlayComponent>;

  constructor(
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private elementRef: ElementRef
  ) {}

  createTooltip() {
    const positionStrategy = this.overlayPositionBuilder.flexibleConnectedTo(this.elementRef).withPositions([
      {
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top',
        offsetY: 5,
      },
      //caso não tenha espaço na sua tooltip o cdk vai tentar as posições do ConnectionPositionPair
      //bottom
      new ConnectionPositionPair(
        { originX: 'center', originY: 'bottom' },
        { overlayX: 'center', overlayY: 'top' },
        0,
        10,
      ),
      //top
      new ConnectionPositionPair(
        { originX: 'center', originY: 'top' },
        { overlayX: 'center', overlayY: 'bottom' },
        0,
        -10
      ),
      //left
      new ConnectionPositionPair(
        { originX: 'start', originY: 'center' },
        { overlayX: 'end', overlayY: 'center' },
        -10,
        0,
      ),
      //right
      new ConnectionPositionPair(
        { originX: 'end', originY: 'center' },
        { overlayX: 'start', overlayY: 'center' },
        10,
        0,
      ),
    ])

    this.overlayRef = this.overlay.create({positionStrategy});

    this.tooltipRef = this.overlayRef.attach(new ComponentPortal(TooltipOverlayComponent))
  }

  @HostListener('mouseenter')
  show() {
    this.createTooltip();
    this.tooltipRef.instance.text = this.text;
  }

@HostListener('mouseleave')
  hide() {
    if(this.tooltipRef) {
      this.tooltipRef.destroy();
      this.overlayRef.detach();
    }
  }

}

//todas as posições pra sua tooltip 

  //BOTTOM
  // originX: 'center',
  // originY: 'bottom',
  // overlayX: 'center',
  // overlayY: 'top',
  // offsetY: 10,

  //bottom-left
  // originX: 'center',
  // originY: 'bottom',
  // overlayX: 'end',
  // overlayY: 'top',
  // offsetY: 10,

  //bottom-rigth
  // originX: 'center',
  // originY: 'bottom',
  // overlayX: 'start',
  // overlayY: 'top',
  // offsetY: 10,

  //TOP
  // originX: 'center',
  // originY: 'top',
  // overlayX: 'center',
  // overlayY: 'bottom',
  // offsetY: -10,

  //top-left
  // originX: 'center',
  // originY: 'top',
  // overlayX: 'end',
  // overlayY: 'bottom',
  // offsetY: -10,

  //top-rigth
  // originX: 'center',
  // originY: 'top',
  // overlayX: 'start',
  // overlayY: 'bottom',
  // offsetY: -10,

  //LEFT
  // originX: 'start',
  // originY: 'center',
  // overlayX: 'end',
  // overlayY: 'center',
  // offsetX: -10,

  //left-bottom
  // originX: 'start',
  // originY: 'center',
  // overlayX: 'end',
  // overlayY: 'top',
  // offsetX: -10,

  //left-top
  // originX: 'start',
  // originY: 'center',
  // overlayX: 'end',
  // overlayY: 'bottom',
  // offsetX: -10,

  //RIGHT
  // originX: 'end',
  // originY: 'center',
  // overlayX: 'start',
  // overlayY: 'center',
  // offsetX: 10

  //right-top
  // originX: 'end',
  // originY: 'center',
  // overlayX: 'start',
  // overlayY: 'bottom',
  // offsetX: 10,

  //right-bottom
  // originX: 'end',
  // originY: 'center',
  // overlayX: 'start',
  // overlayY: 'bottom',
  // offsetX: 10,