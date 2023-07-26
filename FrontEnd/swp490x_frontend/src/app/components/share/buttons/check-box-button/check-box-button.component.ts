import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-check-box-button',
  templateUrl: './check-box-button.component.html',
  styleUrls: ['./check-box-button.component.scss']
})
export class CheckBoxButtonComponent {
  @Input() isChecked: boolean = false;
  @Input() disabled = false;
  @Output() changeState: EventEmitter<boolean> = new EventEmitter<boolean>();
  private onChange = (checked: boolean) => {};
  private onTouched = () => {};
  private touched = false;

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
