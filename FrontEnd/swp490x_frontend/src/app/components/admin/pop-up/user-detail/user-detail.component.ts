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
import { checkExistEmail } from 'src/app/service/async-validator-fn';
import { User } from 'src/app/interface/user';
import { ROLE } from 'src/app/const/ERole';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent extends FileUploadComponent implements OnInit {
  @Input() isEdit: boolean = false;
  @Output() clickCancelButton = new EventEmitter<boolean>();
  @Output() clickSaveButton = new EventEmitter<string>();
  @Input() editUser: User | undefined;
  public readonly BUTTON = BUTTON;
  public userForm!: FormGroup;
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
        checkExistEmail(this.httpService),
      ],
      phone: ['', [Validators.required]],
      // password: this.formBuilder.group(
      //   {
      //     typePassword: ['', [Validators.required]],
      //     repeatPassword: ['', [Validators.required]],
      //   },
      //   {
      //     validators: this.checkRepeatPassword,
      //   }
      // ),
      isAdmin: [false, [Validators.required]],
    });
  }

  // public checkRepeatPassword(
  //   passwordControl: AbstractControl
  // ): ValidationErrors | null {
  //   const passwordValue = passwordControl.value;
  //   return passwordValue.typePassword === passwordValue.repeatPassword
  //     ? null
  //     : { passwordNotMatch: true };
  // }

  private submitForm() {
    if (this.userForm.valid) {
      const url = '/auth/register';
      const payload = this.userForm.value;
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

  private fillEditForm(user: User) {
    this.userForm.controls['fullname'].setValue(user.fullname);
    this.userForm.controls['email'].setValue(user.email);
    this.userForm.controls['phone'].setValue(user.phone);
    this.userForm.controls['isAdmin'].setValue(
      user.authorities.includes({ authority: ROLE.ADMIN })
    );
  }
}
