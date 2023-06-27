import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BUTTON } from 'src/app/const/EButton';
import { FileUploadComponent } from 'src/app/components/share/file-upload/file-upload.component';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FileUploadService } from 'src/app/service/file-upload.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent extends FileUploadComponent implements OnInit {
  @Input() isEdit: boolean = false;
  @Output() clickCancelButton = new EventEmitter<boolean>();
  @Output() clickSaveButton = new EventEmitter<boolean>();
  public readonly BUTTON = BUTTON;
  // public formGroup: FormGroup | undefined;

  private nameRegex: RegExp = /^((?=.*\d)(?=.*[A-Z]).{8,20})$/;
  private emailRegex: RegExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
  public formGroup = this.formBuilder.group({
    fullname: [null],
    email: [null],
    phone: [null],
    password: [null],
    repeatPassword: [null],
    isAdmin: [null],
  });

  constructor(
    public override uploadService: FileUploadService,
    private formBuilder: FormBuilder
  ) {
    super(uploadService);
  }

  // override ngOnInit(): void {
  //   this.createForm();
  // }

  public onClick(button: BUTTON) {
    switch (button) {
      case BUTTON.CANCEL:
        this.clickCancelButton.emit(true);
        break;
      case BUTTON.OK:
        this.clickSaveButton.emit(true);
        break;
      default:
    }
  }

  // private createForm() {
  //   const nameRegex: RegExp = /^((?=.*\d)(?=.*[A-Z]).{8,20})$/;
  //   const emailRegex: RegExp =
  //     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   this.formGroup = this.formBuilder.group({
  //     fullname: [null, [Validators.required, Validators.pattern(nameRegex)]],
  //     email: [
  //       null,
  //       [Validators.required, Validators.pattern(emailRegex)],
  //       this.checkInUseEmail,
  //     ],
  //     phone: [null],
  //     password: [null, [Validators.required, this.checkPassword]],
  //     repeatPassword: [null, [Validators.required, this.checkPassword]],
  //     isAdmin: [null, [Validators.required]],
  //   });
  // }

  private checkPassword(control: FormControl) {
    let enteredPassword = control.value;
    // const passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return !this.passwordRegex.test(enteredPassword) && enteredPassword
      ? { requirements: true }
      : null;
  }

  private checkInUseEmail(control: FormControl) {
    // mimic http database access
    let db = ['tony@gmail.com'];
    return new Observable((observer) => {
      setTimeout(() => {
        let result =
          db.indexOf(control.value) !== -1 ? { alreadyInUse: true } : null;
        observer.next(result);
        observer.complete();
      }, 4000);
    });
  }

  public submitForm() {}
}
