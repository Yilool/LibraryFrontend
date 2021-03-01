import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookshelfComponent } from './components/bookshelf/bookshelf.component';
import { BookshelvesComponent } from './components/bookshelves/bookshelves.component';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'bookshelves', component: BookshelvesComponent },
  { path: 'bookshelf/new', component: BookshelfComponent },
  { path: 'books', loadChildren: () => import('./module/book/book.module').then(m => m.BookModule) },
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
