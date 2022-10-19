import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tooltip-overlay',
  templateUrl: './tooltip-overlay.component.html',
  styleUrls: ['./tooltip-overlay.component.css']
})
export class TooltipOverlayComponent {

  @Input() text: string ='';

}
