import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-slider-button',
  templateUrl: './slider-button.component.html',
  styleUrls: ['./slider-button.component.scss'],
})
export class SliderButtonComponent {
  @Input() isChecked: boolean = false;
}
