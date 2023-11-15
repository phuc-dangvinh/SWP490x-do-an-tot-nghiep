import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInResponse } from 'src/app/interface/sign-in-response';
import { FormService } from 'src/app/service/form.service';
import { HttpService } from 'src/app/service/http.service';
import { ToastService } from 'src/app/service/toast.service';
import { EToastMessage } from 'src/app/const/EToastMessage';
import { EToastClass } from 'src/app/const/EToastClass';
import { UserService } from 'src/app/service/user.service';
import { EKeyCredentials } from 'src/app/interface/key-credentials.enum';
import { ROLE } from 'src/app/const/ERole';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { Subject, takeUntil } from 'rxjs';
import { CartService } from 'src/app/service/cart.service';
import { ItemAddToCart } from 'src/app/interface/cart';
import { MenuService } from 'src/app/service/menu.service';
import { ItemMenuName } from 'src/app/interface/menu-item.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public signInForm!: FormGroup;
  public isInvalid: boolean = false;
  private formFields = {
    email: 'email',
    password: 'password',
  };
  private itemPedingAddCart!: ItemAddToCart;

  constructor(
    private _formService: FormService,
    private _httpService: HttpService,
    private _router: Router,
    private _toastService: ToastService,
    private _userService: UserService,
    private _localStorageService: LocalStorageService,
    private _cartService: CartService,
    private _menuService: MenuService
  ) {}

  ngOnInit(): void {
    this._menuService.setActiveMenu(ItemMenuName.ACCOUNT);
    this.signInForm = this._formService.buildSignInForm();
    this._cartService
      .getItemPedingAddCart()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this.itemPedingAddCart = res;
        }
      });
  }

  public submitForm() {
    this.signInForm.markAllAsTouched();
    if (this.signInForm.valid) {
      const url = '/auth/login';
      this._httpService
        .post<SignInResponse>(url, this.signInForm.value)
        .subscribe({
          next: (res) => {
            if (res) {
              const userId = res.user.id;
              this._localStorageService.saveData(
                EKeyCredentials.TOKEN,
                res.token
              );
              this._userService.setCurrentUser(res.user);
              this._toastService.show({
                content: EToastMessage.SIGN_IN_SUCCES,
                classname: EToastClass.SUCCESS,
                delay: 3000,
              });
              this._cartService.setItemBuyNow(null);
              if (this.itemPedingAddCart) {
                this.itemPedingAddCart.userId = res.user.id;
                this._cartService
                  .addItemToCart(this.itemPedingAddCart)
                  .subscribe((res) => {
                    if (res) {
                      this._toastService.showMessage(
                        EToastClass.SUCCESS,
                        `You added ${this.itemPedingAddCart.quantity} products to cart`
                      );
                      this._cartService.refreshTotalItems(userId);
                      this._cartService.setItemPedingAddCart(null);
                    }
                  });
                this._router.navigate(['cart']);
              } else {
                this._router.navigate(
                  res.user.authorities.some(
                    (item) => item.authority == ROLE.ADMIN
                  )
                    ? ['/admin/user-management']
                    : ['/home']
                );
              }
            }
          },
          error: (err) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status == 401) {
                this.isInvalid = true;
              }
            }
          },
        });
    }
  }

  public touchForm() {
    this.isInvalid = false;
  }

  get emailFormControl(): AbstractControl {
    return this._formService.getFormControl(
      this.signInForm,
      this.formFields.email
    );
  }

  get passwordFormControl(): AbstractControl {
    return this._formService.getFormControl(
      this.signInForm,
      this.formFields.password
    );
  }

  get emailErrorMessages() {
    return this._formService.getErrorMessage(
      this.signInForm,
      this.formFields.email
    );
  }

  get passwordErrorMessages() {
    return this._formService.getErrorMessage(
      this.signInForm,
      this.formFields.password
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
