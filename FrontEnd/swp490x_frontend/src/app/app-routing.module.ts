import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryManagementComponent } from './components/admin/category-management/category-management.component';
import { ProductManagementComponent } from './components/admin/product-management/product-management.component';
import { UserManagementComponent } from './components/admin/user-management/user-management.component';
import { PageNotFoundComponent } from './components/share/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'admin/user-management', component: UserManagementComponent },
  { path: 'admin/category-management', component: CategoryManagementComponent },
  { path: 'admin/product-management', component: ProductManagementComponent },
  // { path: 'home', component: HomeComponent },
  // { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}