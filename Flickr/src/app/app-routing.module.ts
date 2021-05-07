import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatComponent } from './cat/cat.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: 'cat', component: CatComponent },
  { path: '', redirectTo: 'cat', pathMatch: 'full' },
  { path: 'search', component: SearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
