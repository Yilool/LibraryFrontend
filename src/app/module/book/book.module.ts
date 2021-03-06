import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryComponent } from 'src/app/components/library/library.component';
import { BookComponent } from 'src/app/components/book/book.component';
import { IsLoggedGuard } from 'src/app/guards/is-logged.guard';

// rutas de books para lazy loading
const routes: Routes = [
  { path: '', component: LibraryComponent, canActivate: [IsLoggedGuard] },
  { path: 'book/:id', component: BookComponent, canActivate: [IsLoggedGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookModule {}
