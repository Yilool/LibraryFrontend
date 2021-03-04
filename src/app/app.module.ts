import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';
import { BookshelfComponent } from './components/bookshelf/bookshelf.component';
import { BookshelvesComponent } from './components/bookshelves/bookshelves.component';
import { LibraryComponent } from './components/library/library.component';
import { BookComponent } from './components/book/book.component';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { IsLoggedGuard } from './guards/is-logged.guard';
import { WeComponent } from './components/we/we.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SigninComponent,
    BookshelfComponent,
    BookshelvesComponent,
    LibraryComponent,
    BookComponent,
    WeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    IsLoggedGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
