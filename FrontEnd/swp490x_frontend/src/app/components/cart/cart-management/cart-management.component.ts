import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MethodShipment, Sex } from 'src/app/const/shipment-const';
import { FormService } from 'src/app/service/form.service';

@Component({
  selector: 'app-cart-management',
  templateUrl: './cart-management.component.html',
  styleUrls: ['./cart-management.component.scss'],
})
export class CartManagementComponent implements OnInit {
  public formShipment!: FormGroup;
  public formFields = {
    sex: 'sex',
    fullname: 'fullname',
    phone: 'phone',
    email: 'email',
    methodShipment: 'methodShipment',
    address: 'address',
    otherRequire: 'otherRequire',
  };
  public readonly sex = Sex;
  public readonly methodShipment = MethodShipment;

  constructor(private _formService: FormService) {}

  ngOnInit(): void {
    this.formShipment = this._formService.buildFormShipment();
  }

  get sexFormControl(): AbstractControl {
    return this._formService.getFormControl(
      this.formShipment,
      this.formFields.sex
    );
  }

  get fullnameFormControl(): AbstractControl {
    return this._formService.getFormControl(
      this.formShipment,
      this.formFields.fullname
    );
  }

  get phoneFormControl(): AbstractControl {
    return this._formService.getFormControl(
      this.formShipment,
      this.formFields.phone
    );
  }

  get emailFormControl(): AbstractControl {
    return this._formService.getFormControl(
      this.formShipment,
      this.formFields.email
    );
  }

  get methodShipmentFormControl(): AbstractControl {
    return this._formService.getFormControl(
      this.formShipment,
      this.formFields.methodShipment
    );
  }

  get addressFormControl(): AbstractControl {
    return this._formService.getFormControl(
      this.formShipment,
      this.formFields.address
    );
  }

  get otherRequireFormControl(): AbstractControl {
    return this._formService.getFormControl(
      this.formShipment,
      this.formFields.otherRequire
    );
  }

  get fullnameErrorMessages() {
    return this._formService.getErrorMessage(
      this.formShipment,
      this.formFields.fullname
    );
  }

  get phoneErrorMessages() {
    return this._formService.getErrorMessage(
      this.formShipment,
      this.formFields.phone
    );
  }

  get emailErrorMessages() {
    return this._formService.getErrorMessage(
      this.formShipment,
      this.formFields.email
    );
  }
}
