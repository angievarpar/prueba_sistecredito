import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NamesComponent } from './pokemon/names/names.component';

export const routes: Routes = [
    { path: '', redirectTo: 'pokemons', pathMatch: 'full' },
    { path: 'pokemons', component: NamesComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }