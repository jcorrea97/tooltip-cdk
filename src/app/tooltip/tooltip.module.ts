import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipOverlayComponent } from './tooltip-overlay/tooltip-overlay.component';
import { TooltipDirective } from './tooltip-overlay/tooltip.directive';
import { OverlayModule } from '@angular/cdk/overlay'



@NgModule({
  declarations: [
    TooltipOverlayComponent,
    TooltipDirective
  ],
  imports: [
    CommonModule,
    OverlayModule
  ],
  exports: [
    TooltipDirective
  ]
})
export class TooltipModule { }
