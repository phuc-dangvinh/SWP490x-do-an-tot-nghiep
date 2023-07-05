import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BUTTON } from 'src/app/const/EButton';
import { FileUploadComponent } from 'src/app/components/share/file-upload/file-upload.component';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { HttpService } from 'src/app/service/http.service';
import { TextMessage } from 'src/app/interface/text-message';
import { FormControlError } from 'src/app/interface/form-control-error';
import { Observable, map, tap } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent extends FileUploadComponent implements OnInit {
  @Input() isEdit: boolean = false;
  @Output() clickCancelButton = new EventEmitter<boolean>();
  @Output() clickSaveButton = new EventEmitter<string>();
  public readonly BUTTON = BUTTON;
  public userForm!: FormGroup;
  // private nameRegex: RegExp = /^((?=.*\d)(?=.*[A-Z]).{8,20})$/;
  // private emailRegex: RegExp =
  //   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //email: ^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$
  // private passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

  private controlErrors: FormControlError[] = [
    { error: 'required', message: 'Required field' },
    { error: 'email', message: 'Email is not valid' },
    { error: 'passwordNotMatch', message: 'Repeat password is incorrect' },
    { error: 'emailExist', message: 'This email is taken' },
  ];

  constructor(
    public override uploadService: FileUploadService,
    private formBuilder: FormBuilder,
    private httpService: HttpService
  ) {
    super(uploadService);
  }

  override ngOnInit(): void {
    this.createForm();
  }

  public onClick(button: BUTTON) {
    switch (button) {
      case BUTTON.CANCEL:
        this.clickCancelButton.emit(true);
        break;
      case BUTTON.OK:
        this.submitForm();
        break;
      default:
    }
  }

  private createForm() {
    this.userForm = this.formBuilder.group({
      fullname: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.email],
        this.checkExistEmail,
      ],
      phone: ['', [Validators.required]],
      password: this.formBuilder.group(
        {
          typePassword: ['', [Validators.required]],
          repeatPassword: ['', [Validators.required]],
        },
        {
          validators: this.checkRepeatPassword,
        }
      ),
      isAdmin: [false, [Validators.required]],
    });
  }

  public checkRepeatPassword(
    passwordControl: AbstractControl
  ): ValidationErrors | null {
    const passwordValue = passwordControl.value;
    return passwordValue.typePassword === passwordValue.repeatPassword
      ? null
      : { passwordNotMatch: true };
  }

  public checkExistEmail(emailControl: AbstractControl) {
    console.log('vao check exist email');
    console.log({ email: emailControl.value });
    const url = '/user/manage/check-exist';
    return this.httpService
      .post<boolean>(url, { email: emailControl.value })
      .pipe(
        map((result) => {
          result ? { usernameAlreadyExists: true } : null;
        })
      );
  }

  private submitForm() {
    if (this.userForm.valid) {
      const url = '/auth/register';
      const formValue = this.userForm.value;
      let payload = formValue;
      payload.password = formValue.password.typePassword;
      this.httpService.post<TextMessage>(url, payload).subscribe((res) => {
        this.clickSaveButton.emit(res.message);
      });
    }
  }

  public getErrorMessage(parentControlName: string, subControlName?: string) {
    const parentErrors: ValidationErrors | null =
      this.userForm.controls[parentControlName].errors;
    let subErrors: ValidationErrors | null = null;
    if (subControlName) {
      subErrors = (this.userForm.controls[parentControlName] as FormGroup)
        .controls[subControlName].errors;
    }
    let errors: ValidationErrors | null = null;
    if (subControlName == 'repeatPassword') {
      errors = { ...parentErrors, ...subErrors };
    } else {
      subControlName ? (errors = subErrors) : (errors = parentErrors);
    }
    if (errors) {
      return Object.keys(errors)
        .map((errorKey) =>
          this.controlErrors.find(
            (controlError) => controlError.error == errorKey
          )
        )
        .map((errorObj) => errorObj?.message);
    } else {
      return null;
    }
  }

  public getFormControl(
    parentControlName: string,
    subControlName?: string
  ): AbstractControl {
    if (subControlName) {
      return (this.userForm.controls[parentControlName] as FormGroup).controls[
        subControlName
      ];
    } else {
      return this.userForm.controls[parentControlName];
    }
  }
}
