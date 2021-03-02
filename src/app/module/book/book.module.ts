import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryComponent } from 'src/app/components/library/library.component';
import { BookComponent } from 'src/app/components/book/book.component';

const routes: Routes = [
  {
    path: '',
    component: LibraryComponent,
  },
  { path: 'book/:id',
    component: BookComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookModule { }
