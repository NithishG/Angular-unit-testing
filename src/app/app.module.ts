import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './src/auth/login/login.component';
import { HoverFocusDirective } from './src/hover-focus.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HoverFocusDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
