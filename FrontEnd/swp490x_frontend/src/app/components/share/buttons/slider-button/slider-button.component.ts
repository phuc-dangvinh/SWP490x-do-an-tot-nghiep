import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-slider-button',
  templateUrl: './slider-button.component.html',
  styleUrls: ['./slider-button.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SliderButtonComponent,
    },
  ],
})
export class SliderButtonComponent implements ControlValueAccessor {
  @Input() isChecked: boolean = false;
  @Output() changeState: EventEmitter<boolean> = new EventEmitter<boolean>();
  private onChange = (checked: boolean) => {};
  private onTouched = () => {};
  private touched = false;
  // public disabled = false;
  @Input() disabled = false;

  //implements
  writeValue(checked: boolean): void {
    this.isChecked = checked;
  }
  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }
  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  //my function
  public handleChange() {
    this.markAsTouched();
    if (!this.disabled) {
      this.onChange(this.isChecked);
      this.changeState.emit(this.isChecked);
    }
  }

  private markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
}
