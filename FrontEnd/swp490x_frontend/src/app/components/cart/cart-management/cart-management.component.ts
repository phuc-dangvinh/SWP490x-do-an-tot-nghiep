import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { EToastClass } from 'src/app/const/EToastClass';
import { EToastMessage } from 'src/app/const/EToastMessage';
import { Gender, MethodShipment } from 'src/app/const/shipment-const';
import { rootApi } from 'src/app/enviroments/environment';
import { CartItem, QuantityAction } from 'src/app/interface/cart';
import { ItemMenuName } from 'src/app/interface/menu-item.interface';
import { User } from 'src/app/interface/user';
import { CartService } from 'src/app/service/cart.service';
import { FormService } from 'src/app/service/form.service';
import { HttpService } from 'src/app/service/http.service';
import { MenuService } from 'src/app/service/menu.service';
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
  public listCartItems: CartItem[] = [];
  public itemChecked: CartItem[] = [];
  private user!: User;
  public checkedAll: boolean = false;
  public rootApiRequest = rootApi;

  constructor(
    private _formService: FormService,
    private _httpService: HttpService,
    private _userService: UserService,
    private _toastService: ToastService,
    private _menuService: MenuService,
    private _cartService: CartService
  ) {}

  ngOnInit(): void {
    this._menuService.setActiveMenu(ItemMenuName.CART);
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
        } else {
          this.getItemsBuyNow();
        }
      });
  }

  private refreshCart() {
    this._cartService.getListItems(this.user.id).subscribe((res) => {
      if (res) {
        this.listCartItems = res;
        this.listCartItems.forEach((item) => (item.product.checked = true));
        this._cartService.setTotalItems(
          this._cartService.calTotalItems(this.listCartItems)
        );
      }
    });
  }

  private getItemsBuyNow() {
    this._cartService
      .getItemBuyNow()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this.listCartItems = res.map((item) => ({ ...item, id: '' }));
          this.listCartItems.forEach((item) => (item.product.checked = true));
        }
      });
  }

  get totalAmount(): number {
    let amount = 0;
    this.listCartItems
      .filter((item) => item.product.checked)
      .forEach((item) => {
        amount += item.product.price * item.quantity;
      });
    return amount;
  }

  public changeQuantity(productId: string, action: QuantityAction) {
    if (this.user) {
      this._httpService
        .post<number>('/cart/change-quantity', {
          userId: this.user.id,
          productId: productId,
          action: action,
        })
        .subscribe((res) => {
          if (res) {
            let item = this.listCartItems.find(
              (item) => item.product.id == productId
            );
            if (item) {
              item.quantity = res;
              this._cartService.setTotalItems(
                this._cartService.calTotalItems(this.listCartItems)
              );
            }
          }
        });
    } else {
      let foundItem = this.listCartItems.find(
        (item) => item.product.id == productId
      );
      if (foundItem) {
        foundItem.quantity = Math.max(
          1,
          foundItem.quantity + (action == QuantityAction.INCREASE ? 1 : -1)
        );
      }
    }
  }

  public deleteCartItems(id: string) {
    this._httpService.post('/cart/delete', [id]).subscribe((res) => {
      if (res) {
        this.refreshCart();
      }
    });
  }

  public collectChecked() {
    this.itemChecked = this.listCartItems.filter(
      (item) => item.product.checked
    );
  }

  public get isCheckedAll(): boolean {
    return (
      !this.listCartItems.some((item) => !item.product.checked) &&
      this.listCartItems.length > 0
    );
  }

  public changeCheckedAll() {
    this.listCartItems.forEach((item) => {
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
