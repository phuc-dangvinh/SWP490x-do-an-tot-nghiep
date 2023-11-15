import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BUTTON } from 'src/app/const/EButton';
import { AbstractControl, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/service/http.service';
import { TextMessage } from 'src/app/interface/text-message';
import { User } from 'src/app/interface/user';
import { rootApi } from 'src/app/enviroments/environment';
import { EToastMessage } from 'src/app/const/EToastMessage';
import { FormService } from 'src/app/service/form.service';
import { Gender } from 'src/app/const/shipment-const';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  @Input() isEdit: boolean = false;
  @Output() clickCancelButton = new EventEmitter<void>();
  @Output() clickSaveButton = new EventEmitter<EToastMessage>();
  @Input() userEdit!: User;
  public readonly BUTTON = BUTTON;
  public readonly gender = Gender;
  public rootApiRequest = rootApi;
  public formUser!: FormGroup;
  public formFields = {
    avatar: 'avatar',
    gender: 'gender',
    fullname: 'fullname',
    email: 'email',
    phone: 'phone',
    address: 'address',
    isAdmin: 'isAdmin',
  };

  constructor(
    private httpService: HttpService,
    private _formService: FormService
  ) {}

  ngOnInit(): void {
    this.formUser = this._formService.buildFormUser();
    this.fillEditForm();
  }

  public onClick(button: BUTTON) {
    switch (button) {
      case BUTTON.CANCEL:
        this.clickCancelButton.emit();
        break;
      case BUTTON.SAVE:
        this.submitForm();
        break;
      default:
    }
    this.formUser.reset();
  }

  private submitForm() {
    this.formUser.markAllAsTouched();
    if (this.formUser.valid) {
      if (this.isEdit) {
        //update
        const url = '/user/manage';
        const payload = {
          ...this.formUser.getRawValue(),
          id: this.userEdit?.id,
        };
        this.httpService.put<TextMessage>(url, payload).subscribe((res) => {
          this.clickSaveButton.emit(EToastMessage.UPDATE_USER_SUCCESS);
        });
      } else {
        //new
        const url = '/auth/register';
        const payload = this.formUser.value;
        this.httpService.post<TextMessage>(url, payload).subscribe((res) => {
          if (res) {
            this.clickSaveButton.emit(EToastMessage.ADD_USER_SUCCESS);
            this.formUser.reset();
          }
        });
      }
    }
  }

  private fillEditForm() {
    if (this.isEdit && this.userEdit) {
      this.avatarFormControl.setValue(this.userEdit.avatar);
      this.fullnameFormControl.setValue(this.userEdit.fullname);
      this.genderFormControl.setValue(this.userEdit.gender);
      this.addressFormControl.setValue(this.userEdit.address);
      this.emailFormControl.setValue(this.userEdit.email);
      this.emailFormControl.disable();
      this.phoneFormControl.setValue(this.userEdit.phone);
      this.isAdminFormControl.setValue(this.userEdit.isAdmin);
      if (this.isAdminFormControl.value == true) {
        this.isAdminFormControl.disable();
      }
    }
  }

  public onHasResultUploadFile(file: TextMessage) {
    this.avatarFormControl.setValue(file.info);
  }

  get avatarFormControl(): AbstractControl {
    return this._formService.getFormControl(
      this.formUser,
      this.formFields.avatar
    );
  }

  get genderFormControl(): AbstractControl {
    return this._formService.getFormControl(
      this.formUser,
      this.formFields.gender
    );
  }

  get genderErrorMessages() {
    return this._formService.getErrorMessage(
      this.formUser,
      this.formFields.gender
    );
  }

  get fullnameFormControl(): AbstractControl {
    return this._formService.getFormControl(
      this.formUser,
      this.formFields.fullname
    );
  }

  get fullnameErrorMessages() {
    return this._formService.getErrorMessage(
      this.formUser,
      this.formFields.fullname
    );
  }

  get emailFormControl(): AbstractControl {
    return this._formService.getFormControl(
      this.formUser,
      this.formFields.email
    );
  }

  get emailErrorMessages() {
    return this._formService.getErrorMessage(
      this.formUser,
      this.formFields.email
    );
  }

  get phoneFormControl(): AbstractControl {
    return this._formService.getFormControl(
      this.formUser,
      this.formFields.phone
    );
  }

  get phoneErrorMessages() {
    return this._formService.getErrorMessage(
      this.formUser,
      this.formFields.phone
    );
  }

  get addressFormControl(): AbstractControl {
    return this._formService.getFormControl(
      this.formUser,
      this.formFields.address
    );
  }

  get addressErrorMessages() {
    return this._formService.getErrorMessage(
      this.formUser,
      this.formFields.address
    );
  }

  get isAdminFormControl(): AbstractControl {
    return this._formService.getFormControl(
      this.formUser,
      this.formFields.isAdmin
    );
  }
}
