import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NamesComponent } from './pokemon/names/names.component';
import { CreateComponent } from './pokemon/create/create.component';

export const routes: Routes = [
    { path: '', redirectTo: 'pokemons', pathMatch: 'full' },
    { path: 'pokemons', component: NamesComponent},
    { path: 'pokemons/create', component: CreateComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }