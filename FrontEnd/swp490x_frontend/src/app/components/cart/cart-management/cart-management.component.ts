import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { EToastClass } from 'src/app/const/EToastClass';
import { EToastMessage } from 'src/app/const/EToastMessage';
import { Gender, MethodShipment } from 'src/app/const/shipment-const';
import { CartItem, QuantityAction } from 'src/app/interface/cart';
import { User } from 'src/app/interface/user';
import { FormService } from 'src/app/service/form.service';
import { HttpService } from 'src/app/service/http.service';
import { ToastService } from 'src/app/service/toast.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-cart-management',
  templateUrl: './cart-management.component.html',
  styleUrls: ['./cart-management.component.scss'],
})
export class CartManagementComponent implements OnInit, OnDestroy {
  public readonly gender = Gender;
  public readonly methodShipment = MethodShipment;
  public readonly quantityAction = QuantityAction;
  private destroy$: Subject<void> = new Subject<void>();
  public formShipment!: FormGroup;
  public formFields = {
    gender: 'gender',
    fullname: 'fullname',
    phone: 'phone',
    email: 'email',
    methodShipment: 'methodShipment',
    address: 'address',
    otherRequire: 'otherRequire',
  };
  public cart: CartItem[] = [];
  public itemChecked: CartItem[] = [];
  private user!: User;
  public checkedAll: boolean = false;

  constructor(
    private _formService: FormService,
    private _httpService: HttpService,
    private _userService: UserService,
    private _toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.formShipment = this._formService.buildFormShipment();
    this.getUserAndCart();
    this.fillForm();
  }

  private getUserAndCart() {
    this._userService
      .getCurrentUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this.user = res;
          this.refreshCart();
        }
      });
  }

  private refreshCart() {
    this._httpService
      .get<CartItem[]>(`/cart/${this.user.id}`)
      .subscribe((res) => {
        if (res) {
          this.cart = res;
        }
      });
  }

  get totalAmount(): number {
    let amount = 0;
    this.cart
      .filter((item) => item.product.checked)
      .forEach((item) => {
        amount += item.product.price * item.quantity;
      });
    return amount;
  }

  public changeQuantity(productId: string, action: QuantityAction) {
    this._httpService
      .post<number>('/cart/change-quantity', {
        userId: this.user.id,
        productId: productId,
        action: action,
      })
      .subscribe((res) => {
        if (res) {
          let item = this.cart.find((item) => item.product.id == productId);
          if (item) {
            item.quantity = res;
          }
        }
      });
  }

  public deleteCartItems(id: string) {
    this._httpService.post('/cart/delete', [id]).subscribe((res) => {
      if (res) {
        this.refreshCart();
      }
    });
  }

  public collectChecked() {
    this.itemChecked = this.cart.filter((item) => item.product.checked);
  }

  public get isCheckedAll(): boolean {
    return (
      !this.cart.some((item) => !item.product.checked) && this.cart.length > 0
    );
  }

  public changeCheckedAll() {
    this.cart.forEach((item) => {
      item.product.checked = this.checkedAll;
    });
  }

  public processOrder() {
    let idChecked = this.itemChecked.map((item) => item.id);
    this._httpService.post('/cart/delete', idChecked).subscribe((res) => {
      if (res) {
        this.refreshCart();
        this._toastService.showMessage(
          EToastClass.SUCCESS,
          EToastMessage.ORDER_SUCCESS
        );
      }
    });
  }

  private fillForm() {
    if (this.user) {
      this.genderFormControl.setValue(this.user.gender);
      this.fullnameFormControl.setValue(this.user.fullname);
      this.phoneFormControl.setValue(this.user.phone);
      this.emailFormControl.setValue(this.user.email);
      this.addressFormControl.setValue(this.user.address);
    }
  }

  get genderFormControl(): AbstractControl {
    return this._formService.getFormControl(
      this.formShipment,
      this.formFields.gender
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
