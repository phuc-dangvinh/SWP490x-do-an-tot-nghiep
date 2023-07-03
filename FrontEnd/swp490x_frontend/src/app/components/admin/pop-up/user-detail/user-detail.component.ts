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

  constructor(
    public override uploadService: FileUploadService,
    private formBuilder: FormBuilder,
    private httpService: HttpService
  ) {
    super(uploadService);
  }

  override ngOnInit(): void {
    this.createForm();
    this.userForm.get('isAdmin')?.valueChanges.subscribe((res) => {
      res;
    });
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

  // private createForm() {
  //   this.userForm = this.formBuilder.group({
  //     fullname: ['', [Validators.required, Validators.pattern(this.nameRegex)]],
  //     email: [
  //       '',
  //       [Validators.required, Validators.pattern(this.emailRegex)],
  //       this.checkExistEmail,
  //     ],
  //     phone: [''],
  //     password: [
  //       '',
  //       [Validators.required, Validators.pattern(this.passwordRegex)],
  //     ],
  //     repeatPassword: ['', [Validators.required, this.checkPassword]],
  //     isAdmin: [false, [Validators.required]],
  //   });
  // }

  private createForm() {
    this.userForm = this.formBuilder.group({
      fullname: [''],
      email: [''],
      phone: [''],
      password: [''],
      repeatPassword: [''],
      isAdmin: [true],
    });
  }

  private checkPassword(control: AbstractControl) {
    const repeatPassword = control.value;
    const password = this.userForm.controls['password'].value;
    return repeatPassword === password ? { requirements: true } : null;
  }

  private checkExistEmail(control: AbstractControl): ValidationErrors {
    const url = 'user/manage/check-exist';
    return this.httpService
      .post(url, { email: control.value })
      .subscribe((res) => {
        res ? { requirements: true } : null;
      });
  }

  private submitForm() {
    const url = '/auth/register';
    let form = this.userForm.value;
    const { repeatPassword, ...payload } = form;
    this.httpService.post<TextMessage>(url, payload).subscribe((res) => {
      this.clickSaveButton.emit(res.message);
    });
  }
}
