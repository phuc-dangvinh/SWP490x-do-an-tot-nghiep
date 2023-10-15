import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductManagementComponent } from './components/admin/product-management/product-management.component';
import { UserManagementComponent } from './components/admin/user-management/user-management.component';
import { PageNotFoundComponent } from './components/share/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home/home.component';
import { SignUpComponent } from './components/account/sign-up/sign-up.component';
import { SignInComponent } from './components/account/sign-in/sign-in.component';
import { ForgotPasswordComponent } from './components/account/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/account/change-password/change-password.component';
import { ProductDetailComponent } from './components/home/components/product-detail/product-detail.component';
import { CartManagementComponent } from './components/cart/cart-management/cart-management.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'admin/user-management', component: UserManagementComponent },
  { path: 'admin/product-management', component: ProductManagementComponent },
  { path: 'account/sign-up', component: SignUpComponent },
  { path: 'account/sign-in', component: SignInComponent },
  { path: 'account/forgot-password', component: ForgotPasswordComponent },
  { path: 'account/change-password', component: ChangePasswordComponent },
  { path: 'product/detail/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartManagementComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
