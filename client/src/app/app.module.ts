import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { FormsModule } from '@angular/forms';
import {PasswordModule} from 'primeng/password';
import {ToastModule} from 'primeng/toast';
import { HttpClientModule } from '@angular/common/http';
import {TabViewModule} from 'primeng/tabview';
import {CardModule} from 'primeng/card';
import {DialogModule} from 'primeng/dialog';
import {DataViewModule} from 'primeng/dataview';



import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AlbumsComponent } from './albums/albums.component';
   


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    AlbumsComponent
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      AppRoutingModule,
      InputTextModule,
      ButtonModule,
      FormsModule,
      PasswordModule,
      ToastModule,
      HttpClientModule,
      TabViewModule,
      CardModule,
      DialogModule,
      DataViewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
