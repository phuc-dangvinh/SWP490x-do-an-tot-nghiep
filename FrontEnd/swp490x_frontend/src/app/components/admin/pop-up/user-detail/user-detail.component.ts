import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BUTTON } from 'src/app/const/EButton';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { HttpService } from 'src/app/service/http.service';
import { TextMessage } from 'src/app/interface/text-message';
import { FormControlError } from 'src/app/interface/form-control-error';
import { checkExistEmail } from 'src/app/service/async-validator-fn';
import { User } from 'src/app/interface/user';
import { ROLE } from 'src/app/const/ERole';
import { rootApi } from 'src/app/enviroments/environment';
import { EToastMessage } from 'src/app/const/EToastMessage';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  @Input() isEdit: boolean = false;
  @Output() clickCancelButton = new EventEmitter<boolean>();
  @Output() clickSaveButton = new EventEmitter<string>();
  @Input() userEdit!: User;
  public readonly BUTTON = BUTTON;
  public formUser!: FormGroup;
  private controlErrors: FormControlError[] = [
    { error: 'required', message: 'Required field' },
    { error: 'email', message: 'Email is not valid' },
    { error: 'passwordNotMatch', message: 'Repeat password is incorrect' },
    { error: 'emailExist', message: 'This email is taken' },
  ];
  public fileName: string = '';
  public srcFile: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.createForm();
    if (this.isEdit && this.userEdit) {
      this.srcFile = this.userEdit.avatar;
      this.fillEditForm(this.userEdit);
    }
  }

  public onClick(button: BUTTON) {
    switch (button) {
      case BUTTON.CANCEL:
        this.clickCancelButton.emit(true);
        break;
      case BUTTON.SAVE:
        this.submitForm();
        break;
      default:
    }
    this.formUser.reset();
  }

  private createForm() {
    this.formUser = this.formBuilder.group({
      avatar: [''],
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
    if (this.formUser.valid) {
      if (this.isEdit) {
        //update
        const url = '/user/manage';
        const payload = {
          ...this.formUser.getRawValue(),
          id: this.userEdit?.id,
        };
        this.httpService.put<TextMessage>(url, payload).subscribe((res) => {
          this.clickSaveButton.emit(res.info);
        });
      } else {
        //new
        const url = '/auth/register';
        const payload = this.formUser.value;
        this.httpService.post<TextMessage>(url, payload).subscribe((res) => {
          if (res) {
            this.clickSaveButton.emit(EToastMessage.ADD_USER_SUCCESS);
          }
        });
      }
    }
  }

  public getErrorMessage(parentControlName: string, subControlName?: string) {
    const parentErrors: ValidationErrors | null =
      this.formUser.controls[parentControlName].errors;
    let subErrors: ValidationErrors | null = null;
    if (subControlName) {
      subErrors = (this.formUser.controls[parentControlName] as FormGroup)
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
      return (this.formUser.controls[parentControlName] as FormGroup).controls[
        subControlName
      ];
    } else {
      return this.formUser.controls[parentControlName];
    }
  }

  private fillEditForm(user: User) {
    this.formUser.controls['fullname'].setValue(user.fullname);
    this.formUser.controls['email'].setValue(user.email);
    this.formUser.controls['email'].disable();
    this.formUser.controls['phone'].setValue(user.phone);
    this.formUser.controls['isAdmin'].setValue(
      user.authorities.some((item) => item.authority == ROLE.ADMIN)
    );
    const test = this.formUser.controls['isAdmin'].value;
    if (this.formUser.controls['isAdmin'].value == true) {
      this.formUser.controls['isAdmin'].disable();
    }
  }

  public onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const url = '/file/upload';
      this.httpService.uploadFile<TextMessage>(url, file).subscribe((res) => {
        if (res) {
          this.srcFile = `${rootApi}/file/${res.info}`;
          this.formUser.controls['avatar'].setValue(res.info);
        }
      });
    }
  }
}
