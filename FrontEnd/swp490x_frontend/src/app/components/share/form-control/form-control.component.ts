import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss'],
})
export class FormControlComponent {
  @Input() label: string = '';
  @Input() touchedOrDirty: boolean = false;
  @Input() errorMessages: string[] = [];
}
