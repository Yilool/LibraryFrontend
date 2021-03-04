import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookshelfComponent } from './components/bookshelf/bookshelf.component';
import { BookshelvesComponent } from './components/bookshelves/bookshelves.component';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';
import { IsLoggedGuard } from './guards/is-logged.guard';
import { LogService } from './services/log.service';

const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SigninComponent },
  {
    path: 'bookshelves',
    component: BookshelvesComponent,
    canActivate: [IsLoggedGuard],
  },
  {
    path: 'bookshelf/new',
    component: BookshelfComponent,
    canActivate: [IsLoggedGuard],
  },
  {
    path: 'books',
    loadChildren: () =>
      import('./module/book/book.module').then((m) => m.BookModule),
  },
  { path: '**', pathMatch: 'full', redirectTo: 'books' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
