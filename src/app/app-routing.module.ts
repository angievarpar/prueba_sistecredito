import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
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