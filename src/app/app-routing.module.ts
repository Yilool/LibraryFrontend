import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookshelfComponent } from './components/bookshelf/bookshelf.component';
import { BookshelvesComponent } from './components/bookshelves/bookshelves.component';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';
import { WeComponent } from './components/we/we.component';
import { IsLoggedGuard } from './guards/is-logged.guard';

const routes: Routes = [
  { path: '', redirectTo: '/we', pathMatch: 'full' },
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
    path: 'we',
    component: WeComponent,
  },
  // lazyloading para las rutas de libros
  {
    path: 'books',
    loadChildren: () =>
      import('./module/book/book.module').then((m) => m.BookModule),
  },
  { path: '**', pathMatch: 'full', redirectTo: 'we' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
