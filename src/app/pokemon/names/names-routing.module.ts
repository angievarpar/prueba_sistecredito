import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NamesComponent } from './names.component';

const routes: Routes = [
  {
    path: '',
    component: NamesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NamesRoutingModule { }
