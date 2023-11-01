import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountModule } from './components/account/account.module';
import { CartModule } from './components/cart/cart.module';
import { HomeModule } from './components/home/home.module';
import { MenuBarComponent } from './components/share/menu-bar/menu-bar.component';
import { PageNotFoundComponent } from './components/share/page-not-found/page-not-found.component';
import { AdminModule } from './components/admin/admin.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ToastComponent } from './components/share/toast-global/toast.component';
import { AboutComponent } from './components/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    PageNotFoundComponent,
    ToastComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AdminModule,
    CartModule,
    AccountModule,
    HomeModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
