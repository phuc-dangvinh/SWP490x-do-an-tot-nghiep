import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BUTTON } from 'src/app/const/EButton';
import { FileUploadComponent } from 'src/app/components/share/file-upload/file-upload.component';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { HttpService } from 'src/app/service/http.service';
import { TextMessage } from 'src/app/interface/text-message';

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
  private nameRegex: RegExp = /^((?=.*\d)(?=.*[A-Z]).{8,20})$/;
  private emailRegex: RegExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //email: ^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$
  private passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

  private controlError = {
    required: 'Required field',
    passwordNotMatch: 'Re-entered password is incorrect',
    emailExist: 'This email is taken',
  };

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
      phone: [''],
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

  private checkExistEmail(
    emailControl: AbstractControl
  ): ValidationErrors | null {
    console.log('vao check exist email');
    console.log({ email: emailControl.value });
    const url = '/user/manage/check-exist';
    return this.httpService
      .post(url, { email: emailControl.value })
      .subscribe((res) => {
        console.log('res', res);
        res ? { emailExist: true } : null;
      });
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

  public getErrorMessage(controlName: string) {
    const errors = this.userForm.controls[controlName]?.errors;

    return this.controlError['required'];
  }
}
