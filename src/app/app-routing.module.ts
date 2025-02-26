import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NamesComponent } from './pokemon/names/names.component';
import { CreateComponent } from './pokemon/create/create.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
    { path: '', redirectTo: 'pokemons', pathMatch: 'full' },
    { path: 'pokemons', component: NamesComponent},
    { path: 'pokemons/create', component: CreateComponent},

    {
        path: '',
        component: AdminComponent,
        children: [
          {
            path: 'pokemons',
            loadChildren: () => import('./pokemon/names/names.module').then(m => m.NamesModule)
          },
          {
            path: 'pokemons/create',
            loadChildren: () => import('./pokemon/create/create.module').then(m=>m.CreateModule)
          },
          {
            path: 'abilities',
            loadChildren: () => import('./pokemon/abilities/abilities.module').then(m=>m.AbilitiesModule)
          }
        ]
      }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }