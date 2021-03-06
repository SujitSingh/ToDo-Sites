import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './pages/home/home.component';
import { PostComponent } from './pages/post/post.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { TokenInterceptor } from './services/_helpers/token.interceptor';
import { ErrorInterceptor } from './services/_helpers/error.interceptor';
import { UserNamePipe } from './pipe/user-name.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    PostComponent,
    LoginComponent,
    SignupComponent,
    UserNamePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
