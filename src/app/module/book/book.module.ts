import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryComponent } from 'src/app/components/library/library.component';
import { BookComponent } from 'src/app/components/book/book.component';
import { LogService } from 'src/app/services/log.service';

const routes: Routes = [
  { path: '', component: LibraryComponent, canActivate: [LogService] },
  { path: 'book/:id', component: BookComponent, canActivate: [LogService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookModule {}
